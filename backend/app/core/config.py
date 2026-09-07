import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent.parent

class Settings:
    PROJECT_NAME: str = "PlantDoc AI"
    VERSION: str = "1.0.0"
    API_PREFIX: str = "/api"
    
    # Paths
    DATA_DIR: Path = BASE_DIR / "app" / "data"
    MODELS_DIR: Path = BASE_DIR / "app" / "models"
    
    CROP_CLASSES_PATH: Path = DATA_DIR / "crop_classes.json"
    INDOOR_CLASSES_PATH: Path = DATA_DIR / "indoor_classes.json"
    DISEASE_DB_PATH: Path = DATA_DIR / "disease_db.json"
    
    CROP_MODEL_PATH: Path = MODELS_DIR / "crop_model.onnx"
    INDOOR_MODEL_PATH: Path = MODELS_DIR / "indoor_model.onnx"
    
    # Image constraints
    MAX_IMAGE_SIZE_MB: int = 15
    ALLOWED_IMAGE_TYPES: set = {"image/jpeg", "image/png", "image/webp", "image/jpg"}
    TARGET_IMAGE_SIZE: tuple = (224, 224)
    
    # Routing thresholds
    CONFIDENCE_DELTA_MARGIN: float = 0.08
    LOW_CONFIDENCE_THRESHOLD: float = 0.28
    
    # CORS
    ALLOWED_ORIGINS: list = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "*"
    ]

settings = Settings()
