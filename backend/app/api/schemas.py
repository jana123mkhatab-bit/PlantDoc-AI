from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class PredictionCandidate(BaseModel):
    class_id: str = Field(..., description="Raw model class ID")
    plant_name: str = Field(..., description="Common plant name")
    condition: str = Field(..., description="Diagnosed condition or healthy state")
    confidence: float = Field(..., description="Softmax confidence score (0.0 to 1.0)")
    formatted_confidence: str = Field(..., description="Percentage formatted confidence (e.g. '94.2%')")

class TreatmentInfo(BaseModel):
    plant_name: str
    condition: str
    scientific_name: str
    pathogen: str
    severity: str = Field(..., description="Severity level: Healthy, Low, Moderate, High, Critical")
    description: str
    immediate_actions: List[str] = Field(default_factory=list)
    organic_treatments: List[str] = Field(default_factory=list)
    prevention_tips: List[str] = Field(default_factory=list)

class RoutingMetadata(BaseModel):
    mode: str = Field(..., description="'manual' when specified by user, 'auto' when detected by router")
    selected_domain: str = Field(..., description="'crop' or 'indoor'")
    crop_top_confidence: Optional[float] = None
    indoor_top_confidence: Optional[float] = None
    confidence_margin: Optional[float] = None
    crop_entropy: Optional[float] = None
    indoor_entropy: Optional[float] = None
    reason: str

class DiagnosisResponse(BaseModel):
    success: bool = True
    predicted_class: str
    plant_name: str
    condition: str
    domain: str = Field(..., description="'crop' or 'indoor'")
    confidence: float = Field(..., ge=0.0, le=1.0)
    confidence_badge: str = Field(..., description="'high' (>0.80), 'moderate' (0.50-0.80), 'low' (<0.50)")
    top_predictions: List[PredictionCandidate] = Field(..., description="Top 3 differential predictions")
    distribution: List[PredictionCandidate] = Field(..., description="Top 5 probability distribution for chart visualization")
    treatment: TreatmentInfo
    routing: RoutingMetadata
    inference_time_ms: float
    warning: Optional[str] = None

class HealthResponse(BaseModel):
    status: str = "ok"
    version: str
    crop_model_loaded: bool
    indoor_model_loaded: bool
    total_classes: int
    execution_provider: str
    crop_class_count: int
    indoor_class_count: int

class ClassesResponse(BaseModel):
    crop_classes: List[str]
    indoor_classes: List[str]
    total_crop: int
    total_indoor: int
    total: int

class ModelStats(BaseModel):
    crop_model: Dict[str, Any]
    indoor_model: Dict[str, Any]
    router: Dict[str, Any]
