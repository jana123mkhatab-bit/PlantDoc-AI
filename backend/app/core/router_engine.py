import math
from PIL import Image
from typing import Dict, Any, Optional, Tuple
from ..services.inference import inference_engine
from ..api.schemas import RoutingMetadata

class RouterEngine:
    @staticmethod
    def route_and_predict(image: Image.Image, requested_domain: Optional[str] = None) -> Tuple[Dict[str, Any], RoutingMetadata]:
        # Normalize requested domain
        norm_domain = (requested_domain or "auto").strip().lower()
        if norm_domain in ("farm", "crop", "agricultural"):
            norm_domain = "crop"
        elif norm_domain in ("indoor", "houseplant", "home", "flower"):
            norm_domain = "indoor"
        else:
            norm_domain = "auto"

        # Case 1: Manual Override explicitly chosen by user
        if norm_domain in ("crop", "indoor"):
            result = inference_engine.run_inference(image, domain=norm_domain)
            metadata = RoutingMetadata(
                mode="manual",
                selected_domain=norm_domain,
                reason=f"User manually specified the '{'Agricultural Crop' if norm_domain == 'crop' else 'Indoor Houseplant'}' specialist model."
            )
            return result, metadata

        # Case 2: Auto-routing via Calibrated Dual-Inference Confidence & Entropy
        # Run both specialist models
        crop_res = inference_engine.run_inference(image, domain="crop")
        indoor_res = inference_engine.run_inference(image, domain="indoor")

        crop_conf = crop_res["confidence"]
        indoor_conf = indoor_res["confidence"]
        crop_ent = crop_res["entropy"]
        indoor_ent = indoor_res["entropy"]

        # Theoretical max entropy for each distribution: log(num_classes)
        max_crop_ent = math.log(len(inference_engine.crop_classes) or 38)
        max_indoor_ent = math.log(len(inference_engine.indoor_classes) or 16)

        # Normalized certainty (1.0 = sharp single peak, 0.0 = completely uniform noise)
        crop_certainty = max(0.0, 1.0 - (crop_ent / max_crop_ent))
        indoor_certainty = max(0.0, 1.0 - (indoor_ent / max_indoor_ent))

        # Composite specialist scores combining peak confidence and certainty
        crop_score = (crop_conf * 0.7) + (crop_certainty * 0.3)
        indoor_score = (indoor_conf * 0.7) + (indoor_certainty * 0.3)

        margin = abs(crop_conf - indoor_conf)

        if crop_score >= indoor_score:
            selected_domain = "crop"
            selected_res = crop_res
            delta = crop_score - indoor_score
            reason = (
                f"Auto-routed to Crop Model: Higher specialist confidence ({crop_conf * 100:.1f}% vs {indoor_conf * 100:.1f}%) "
                f"and lower distribution entropy ({crop_ent:.2f} vs {indoor_ent:.2f})."
            )
        else:
            selected_domain = "indoor"
            selected_res = indoor_res
            delta = indoor_score - crop_score
            reason = (
                f"Auto-routed to Indoor Model: Higher houseplant confidence ({indoor_conf * 100:.1f}% vs {crop_conf * 100:.1f}%) "
                f"and lower distribution entropy ({indoor_ent:.2f} vs {crop_ent:.2f})."
            )

        # Total combined inference time
        selected_res["inference_time_ms"] = crop_res["inference_time_ms"] + indoor_res["inference_time_ms"]

        metadata = RoutingMetadata(
            mode="auto",
            selected_domain=selected_domain,
            crop_top_confidence=crop_conf,
            indoor_top_confidence=indoor_conf,
            confidence_margin=margin,
            crop_entropy=crop_ent,
            indoor_entropy=indoor_ent,
            reason=reason
        )

        return selected_res, metadata

router_engine = RouterEngine()
