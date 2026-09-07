import os
import json
import time
import numpy as np
from PIL import Image
import onnxruntime as ort
from typing import Dict, List, Tuple, Any, Optional

from ..core.config import settings
from ..api.schemas import PredictionCandidate
from .treatment_service import treatment_service

class InferenceEngine:
    def __init__(self):
        self.crop_session: Optional[ort.InferenceSession] = None
        self.indoor_session: Optional[ort.InferenceSession] = None
        self.crop_classes: List[str] = []
        self.indoor_classes: List[str] = []
        self.providers: List[str] = ["CPUExecutionProvider"]
        self.initialize()

    def initialize(self):
        # Load class lists
        if os.path.exists(settings.CROP_CLASSES_PATH):
            with open(settings.CROP_CLASSES_PATH, "r", encoding="utf-8") as f:
                self.crop_classes = json.load(f)
                
        if os.path.exists(settings.INDOOR_CLASSES_PATH):
            with open(settings.INDOOR_CLASSES_PATH, "r", encoding="utf-8") as f:
                self.indoor_classes = json.load(f)

        # Load Crop Model
        if os.path.exists(settings.CROP_MODEL_PATH):
            sess_opts = ort.SessionOptions()
            sess_opts.graph_optimization_level = ort.GraphOptimizationLevel.ORT_ENABLE_ALL
            self.crop_session = ort.InferenceSession(
                str(settings.CROP_MODEL_PATH),
                sess_options=sess_opts,
                providers=self.providers
            )
            print(f"[InferenceEngine] Loaded Crop Model from {settings.CROP_MODEL_PATH}")

        # Load Indoor Model
        if os.path.exists(settings.INDOOR_MODEL_PATH):
            sess_opts = ort.SessionOptions()
            sess_opts.graph_optimization_level = ort.GraphOptimizationLevel.ORT_ENABLE_ALL
            self.indoor_session = ort.InferenceSession(
                str(settings.INDOOR_MODEL_PATH),
                sess_options=sess_opts,
                providers=self.providers
            )
            print(f"[InferenceEngine] Loaded Indoor Model from {settings.INDOOR_MODEL_PATH}")

    def preprocess_image(self, image: Image.Image, session: ort.InferenceSession) -> np.ndarray:
        """
        Preprocesses PIL image to match MobileNetV2 requirements:
        - Resize to (224, 224)
        - Scale to [-1.0, 1.0]: (img / 127.5) - 1.0
        - Introspect session input shape to provide either NCHW (1, 3, 224, 224) or NHWC (1, 224, 224, 3)
        """
        # Resize to 224x224
        img = image.resize(settings.TARGET_IMAGE_SIZE, Image.Resampling.BILINEAR)
        img_array = np.array(img, dtype=np.float32)

        # MobileNetV2 preprocessing: [-1, 1] scaling
        img_array = (img_array / 127.5) - 1.0

        # Introspect expected input shape from session
        input_meta = session.get_inputs()[0]
        expected_shape = input_meta.shape  # e.g. [batch, 3, 224, 224] or [batch, 224, 224, 3]
        
        if len(expected_shape) == 4 and expected_shape[1] == 3:
            # Model expects NCHW format: (1, 3, 224, 224)
            img_tensor = np.transpose(img_array, (2, 0, 1))  # HWC to CHW
            img_tensor = np.expand_dims(img_tensor, axis=0)   # Add batch dimension
        else:
            # Model expects NHWC format: (1, 224, 224, 3)
            img_tensor = np.expand_dims(img_array, axis=0)

        return img_tensor.astype(np.float32)

    def _softmax(self, logits: np.ndarray) -> np.ndarray:
        """Compute stable softmax."""
        exp_logits = np.exp(logits - np.max(logits))
        return exp_logits / np.sum(exp_logits)

    def _calculate_entropy(self, probabilities: np.ndarray) -> float:
        """Calculate Shannon entropy in nats."""
        p = np.clip(probabilities, 1e-12, 1.0)
        return float(-np.sum(p * np.log(p)))

    def run_inference(self, image: Image.Image, domain: str) -> Dict[str, Any]:
        """
        Runs inference on the specified model ('crop' or 'indoor').
        Returns raw predictions, probabilities, top-k candidates, and entropy.
        """
        if domain == "crop":
            session = self.crop_session
            classes = self.crop_classes
            if not session:
                raise RuntimeError("Crop disease ONNX model session is not loaded.")
        elif domain == "indoor":
            session = self.indoor_session
            classes = self.indoor_classes
            if not session:
                raise RuntimeError("Indoor plant ONNX model session is not loaded.")
        else:
            raise ValueError(f"Unknown domain '{domain}'. Expected 'crop' or 'indoor'.")

        t0 = time.perf_counter()
        tensor = self.preprocess_image(image, session)
        input_name = session.get_inputs()[0].name

        outputs = session.run(None, {input_name: tensor})
        raw_output = outputs[0][0]  # shape: (num_classes,)

        # Check if already softmax or logits
        if np.isclose(np.sum(raw_output), 1.0, atol=1e-2) and np.all(raw_output >= 0.0):
            probs = raw_output
        else:
            probs = self._softmax(raw_output)

        inference_time_ms = (time.perf_counter() - t0) * 1000.0

        # Sort indices by probability descending
        sorted_indices = np.argsort(probs)[::-1]
        top_idx = int(sorted_indices[0])
        top_class_id = classes[top_idx] if top_idx < len(classes) else f"Class_{top_idx}"
        top_confidence = float(probs[top_idx])

        # Top 3 alternative predictions (excluding the top 1 or including next candidates)
        top_candidates = []
        for rank, idx in enumerate(sorted_indices[1:4]):
            cls_id = classes[idx] if idx < len(classes) else f"Class_{idx}"
            p_name, c_name = treatment_service.get_plant_and_condition(cls_id)
            conf = float(probs[idx])
            top_candidates.append(PredictionCandidate(
                class_id=cls_id,
                plant_name=p_name,
                condition=c_name,
                confidence=conf,
                formatted_confidence=f"{conf * 100.0:.1f}%"
            ))

        # Top 5 distribution for chart visualization
        distribution = []
        for idx in sorted_indices[:5]:
            cls_id = classes[idx] if idx < len(classes) else f"Class_{idx}"
            p_name, c_name = treatment_service.get_plant_and_condition(cls_id)
            conf = float(probs[idx])
            distribution.append(PredictionCandidate(
                class_id=cls_id,
                plant_name=p_name,
                condition=c_name,
                confidence=conf,
                formatted_confidence=f"{conf * 100.0:.1f}%"
            ))

        entropy = self._calculate_entropy(probs)

        return {
            "domain": domain,
            "predicted_class": top_class_id,
            "confidence": top_confidence,
            "top_candidates": top_candidates,
            "distribution": distribution,
            "entropy": entropy,
            "probabilities": probs,
            "inference_time_ms": inference_time_ms
        }

inference_engine = InferenceEngine()
