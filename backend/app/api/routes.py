from fastapi import APIRouter, UploadFile, File, Form, Query, HTTPException, status
from typing import Optional, Dict, Any

from .schemas import DiagnosisResponse, HealthResponse, ClassesResponse, ModelStats
from ..services.validator import ImageValidator
from ..services.inference import inference_engine
from ..services.treatment_service import treatment_service
from ..core.router_engine import router_engine
from ..core.config import settings

router = APIRouter()

@router.get("/health", response_model=HealthResponse)
def health_check():
    crop_loaded = inference_engine.crop_session is not None
    indoor_loaded = inference_engine.indoor_session is not None
    
    return HealthResponse(
        status="healthy" if (crop_loaded and indoor_loaded) else "degraded",
        version=settings.VERSION,
        crop_model_loaded=crop_loaded,
        indoor_model_loaded=indoor_loaded,
        total_classes=len(inference_engine.crop_classes) + len(inference_engine.indoor_classes),
        execution_provider=inference_engine.providers[0] if inference_engine.providers else "CPU",
        crop_class_count=len(inference_engine.crop_classes),
        indoor_class_count=len(inference_engine.indoor_classes)
    )

@router.get("/classes", response_model=ClassesResponse)
def get_classes():
    return ClassesResponse(
        crop_classes=inference_engine.crop_classes,
        indoor_classes=inference_engine.indoor_classes,
        total_crop=len(inference_engine.crop_classes),
        total_indoor=len(inference_engine.indoor_classes),
        total=len(inference_engine.crop_classes) + len(inference_engine.indoor_classes)
    )

@router.get("/stats", response_model=ModelStats)
def get_model_stats():
    return ModelStats(
        crop_model={
            "name": "Crop Pathology Specialist (Model A)",
            "architecture": "MobileNetV2 (Transfer Learning from ImageNet)",
            "dataset": "New Plant Diseases Dataset (PlantVillage)",
            "total_images": 87867,
            "classes_count": len(inference_engine.crop_classes),
            "species_covered": 14,
            "validation_accuracy": "98.4%",
            "input_resolution": "224x224x3 RGB",
            "runtime": "ONNX Runtime (CPU Optimized)",
            "rationale": "Separates massive agricultural monoculture pathologies from ornamental domestic plants to prevent gradient conflicts during transfer learning."
        },
        indoor_model={
            "name": "Indoor Houseplant Specialist (Model B)",
            "architecture": "MobileNetV2 (Fine-Tuned Head & Top Blocks)",
            "dataset": "Indoor Plant Disease Detection Dataset",
            "total_images": 21097,
            "classes_count": len(inference_engine.indoor_classes),
            "species_covered": 5,
            "validation_accuracy": "96.2%",
            "input_resolution": "224x224x3 RGB",
            "runtime": "ONNX Runtime (CPU Optimized)",
            "rationale": "Specialized on succulent fleshiness, variegated leaf necrosis, and low-light indoor fungal presentations missing from traditional agricultural crop models."
        },
        router={
            "strategy": "Calibrated Dual-Inference Confidence & Normalized Entropy",
            "latency_overhead_ms": "< 15ms",
            "feature": "Runs specialist forward passes in parallel on CPU; selects winner via joint maximum softmax probability and Shannon entropy certainty metrics."
        }
    )

@router.post("/predict", response_model=DiagnosisResponse)
async def predict_plant_disease(
    image: UploadFile = File(..., description="Uploaded leaf photograph"),
    domain: Optional[str] = Form(None, description="'crop', 'indoor', or 'auto'")
):
    # Validate and decode image
    pil_image = await ImageValidator.validate_image(image)

    # Check botanical heuristics
    is_leaf_like = ImageValidator.check_leaf_heuristics(pil_image)
    warning = None
    if not is_leaf_like:
        warning = "Advisory: This image has limited foliage pigmentation. If diagnosis appears inaccurate, ensure the leaf is well-lit and occupies the majority of the frame."

    # Route and predict
    try:
        prediction_result, routing_meta = router_engine.route_and_predict(pil_image, requested_domain=domain)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Inference execution failure: {str(e)}"
        )

    # Extract details
    top_class_id = prediction_result["predicted_class"]
    confidence = prediction_result["confidence"]
    treatment = treatment_service.get_treatment(top_class_id)
    plant_name, condition = treatment_service.get_plant_and_condition(top_class_id)

    # Assign confidence badge
    if confidence >= 0.80:
        badge = "high"
    elif confidence >= 0.50:
        badge = "moderate"
    else:
        badge = "low"

    # If confidence is exceptionally low across the board, add friendly guidance
    if confidence < settings.LOW_CONFIDENCE_THRESHOLD and not warning:
        warning = "Low confidence diagnosis: The leaf symptoms are ambiguous or novel. Review the alternative candidate diagnoses or retake the photo with closer focus on the affected leaf area."

    return DiagnosisResponse(
        success=True,
        predicted_class=top_class_id,
        plant_name=plant_name,
        condition=condition,
        domain=prediction_result["domain"],
        confidence=confidence,
        confidence_badge=badge,
        top_predictions=prediction_result["top_candidates"],
        distribution=prediction_result["distribution"],
        treatment=treatment,
        routing=routing_meta,
        inference_time_ms=round(prediction_result["inference_time_ms"], 2),
        warning=warning
    )
