import uvicorn
import os
import sys

# Ensure backend directory is on sys.path
current_dir = os.path.dirname(os.path.abspath(__file__))
if current_dir not in sys.path:
    sys.path.insert(0, current_dir)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    print(f"Starting PlantDoc AI backend on http://127.0.0.1:{port}")
    uvicorn.run("app.main:app", host="127.0.0.1", port=port, reload=True)
