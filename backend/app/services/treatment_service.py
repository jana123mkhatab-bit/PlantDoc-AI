import json
import os
from typing import Dict, Any, Optional
from ..core.config import settings
from ..api.schemas import TreatmentInfo

class TreatmentService:
    def __init__(self):
        self._db: Dict[str, Dict[str, Any]] = {}
        self.load_database()

    def load_database(self):
        if os.path.exists(settings.DISEASE_DB_PATH):
            with open(settings.DISEASE_DB_PATH, "r", encoding="utf-8") as f:
                self._db = json.load(f)
        else:
            self._db = {}

    def get_treatment(self, class_id: str) -> TreatmentInfo:
        if class_id in self._db:
            data = self._db[class_id]
            return TreatmentInfo(
                plant_name=data.get("plant_name", "Unknown Plant"),
                condition=data.get("condition", "Undetermined Condition"),
                scientific_name=data.get("scientific_name", "Botanical specimen"),
                pathogen=data.get("pathogen", "Not identified"),
                severity=data.get("severity", "Moderate"),
                description=data.get("description", "No diagnostic description recorded."),
                immediate_actions=data.get("immediate_actions", ["Isolate plant to prevent cross-contamination."]),
                organic_treatments=data.get("organic_treatments", ["Monitor closely and ensure proper cultural conditions."]),
                prevention_tips=data.get("prevention_tips", ["Provide balanced nutrition and optimal airflow."])
            )
        
        # Fallback parsing from class_id if not in database
        parts = class_id.replace("___", "_").split("_")
        plant = parts[0] if parts else "Plant"
        cond = " ".join(parts[1:]) if len(parts) > 1 else "Unknown Condition"
        
        return TreatmentInfo(
            plant_name=plant,
            condition=cond.title(),
            scientific_name="Botanical specimen",
            pathogen="Unknown etiology",
            severity="Moderate",
            description=f"Automated clinical entry for {plant} displaying symptoms of {cond}.",
            immediate_actions=[
                "Inspect plant canopy for pest or fungal development.",
                "Isolate specimen from adjacent crops or houseplants.",
                "Ensure clean water source and sanitize tools."
            ],
            organic_treatments=[
                "Apply gentle horticultural soap or neem oil spray if insect vectors are observed.",
                "Ensure appropriate soil aeration and drainage."
            ],
            prevention_tips=[
                "Maintain proper plant spacing for unobstructed air movement.",
                "Avoid late evening overhead watering to limit leaf moisture duration."
            ]
        )

    def get_plant_and_condition(self, class_id: str) -> tuple[str, str]:
        if class_id in self._db:
            data = self._db[class_id]
            return data.get("plant_name", "Unknown Plant"), data.get("condition", class_id)
        
        # Fallback parse
        parts = class_id.replace("___", "_").split("_")
        plant = parts[0] if parts else "Plant"
        cond = " ".join(parts[1:]) if len(parts) > 1 else "Condition"
        return plant, cond.title()

treatment_service = TreatmentService()
