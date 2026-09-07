import os
import sys
import io
import unittest
from PIL import Image

# Ensure backend directory is in python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from fastapi.testclient import TestClient
from app.main import app

def create_synthetic_leaf_image(color=(34, 139, 34), size=(224, 224)):
    """Generate a clean RGB image buffer."""
    img = Image.new("RGB", size, color=color)
    buf = io.BytesIO()
    img.save(buf, format="JPEG")
    buf.seek(0)
    return buf

class TestPlantDocBackend(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.client = TestClient(app)

    def test_01_root_endpoint(self):
        resp = self.client.get("/")
        self.assertEqual(resp.status_code, 200)
        data = resp.json()
        self.assertEqual(data["status"], "online")
        self.assertIn("PlantDoc", data["app"])

    def test_02_health_endpoint(self):
        resp = self.client.get("/api/health")
        self.assertEqual(resp.status_code, 200)
        data = resp.json()
        self.assertEqual(data["status"], "healthy")
        self.assertTrue(data["crop_model_loaded"])
        self.assertTrue(data["indoor_model_loaded"])
        self.assertEqual(data["crop_class_count"], 38)
        self.assertEqual(data["indoor_class_count"], 16)
        self.assertEqual(data["total_classes"], 54)

    def test_03_classes_endpoint(self):
        resp = self.client.get("/api/classes")
        self.assertEqual(resp.status_code, 200)
        data = resp.json()
        self.assertEqual(len(data["crop_classes"]), 38)
        self.assertEqual(len(data["indoor_classes"]), 16)
        self.assertIn("Tomato___Early_blight", data["crop_classes"])
        self.assertIn("SnakePlant_Rot", data["indoor_classes"])

    def test_04_stats_endpoint(self):
        resp = self.client.get("/api/stats")
        self.assertEqual(resp.status_code, 200)
        data = resp.json()
        self.assertIn("crop_model", data)
        self.assertIn("indoor_model", data)
        self.assertIn("router", data)

    def test_05_predict_crop_manual(self):
        buf = create_synthetic_leaf_image()
        files = {"image": ("leaf.jpg", buf, "image/jpeg")}
        data = {"domain": "crop"}
        resp = self.client.post("/api/predict", files=files, data=data)
        self.assertEqual(resp.status_code, 200)
        res = resp.json()
        self.assertTrue(res["success"])
        self.assertEqual(res["domain"], "crop")
        self.assertEqual(res["routing"]["mode"], "manual")
        self.assertIn("treatment", res)
        self.assertIn("immediate_actions", res["treatment"])
        self.assertIn("organic_treatments", res["treatment"])
        self.assertIn("prevention_tips", res["treatment"])
        self.assertGreater(len(res["top_predictions"]), 0)
        self.assertGreater(len(res["distribution"]), 0)

    def test_06_predict_indoor_manual(self):
        buf = create_synthetic_leaf_image(color=(46, 117, 89))
        files = {"image": ("snake_plant.jpg", buf, "image/jpeg")}
        data = {"domain": "indoor"}
        resp = self.client.post("/api/predict", files=files, data=data)
        self.assertEqual(resp.status_code, 200)
        res = resp.json()
        self.assertTrue(res["success"])
        self.assertEqual(res["domain"], "indoor")
        self.assertEqual(res["routing"]["mode"], "manual")
        self.assertIn("treatment", res)

    def test_07_predict_auto_routing(self):
        buf = create_synthetic_leaf_image(color=(85, 107, 47))
        files = {"image": ("sample.png", buf, "image/png")}
        data = {"domain": "auto"}
        resp = self.client.post("/api/predict", files=files, data=data)
        self.assertEqual(resp.status_code, 200)
        res = resp.json()
        self.assertTrue(res["success"])
        self.assertEqual(res["routing"]["mode"], "auto")
        self.assertIn(res["routing"]["selected_domain"], ["crop", "indoor"])
        self.assertIsNotNone(res["routing"]["crop_top_confidence"])
        self.assertIsNotNone(res["routing"]["indoor_top_confidence"])
        self.assertIsNotNone(res["routing"]["confidence_margin"])

    def test_08_invalid_file_type(self):
        txt_buf = io.BytesIO(b"Hello world this is not an image")
        files = {"image": ("test.txt", txt_buf, "text/plain")}
        resp = self.client.post("/api/predict", files=files)
        self.assertEqual(resp.status_code, 400)
        data = resp.json()
        self.assertFalse(data["success"])
        self.assertIn("Unsupported file format", data["message"])

    def test_09_corrupt_image(self):
        corrupt_buf = io.BytesIO(b"\xFF\xD8\xFF\xE0\x00\x10JFIF" + b"randomcorruptbytes")
        files = {"image": ("corrupted.jpg", corrupt_buf, "image/jpeg")}
        resp = self.client.post("/api/predict", files=files)
        self.assertEqual(resp.status_code, 400)
        data = resp.json()
        self.assertFalse(data["success"])

if __name__ == "__main__":
    unittest.main(verbosity=2)
