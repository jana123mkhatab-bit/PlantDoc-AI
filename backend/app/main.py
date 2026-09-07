from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException
from contextlib import asynccontextmanager

from .core.config import settings
from .api.routes import router as api_router
from .services.inference import inference_engine

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Ensure models and databases are initialized
    print(f"[{settings.PROJECT_NAME}] Initializing engine...")
    if not inference_engine.crop_session or not inference_engine.indoor_session:
        inference_engine.initialize()
    print(f"[{settings.PROJECT_NAME}] Ready. Crop classes: {len(inference_engine.crop_classes)}, Indoor classes: {len(inference_engine.indoor_classes)}")
    yield
    print(f"[{settings.PROJECT_NAME}] Shutting down.")

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Dual-Model Agricultural Crop & Indoor Houseplant Disease Diagnosis Platform",
    lifespan=lifespan
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Production and dev permissive CORS
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Custom Error Handlers for Clean Recruiter-Friendly Errors
@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(request: Request, exc: StarletteHTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "success": False,
            "error_code": exc.status_code,
            "message": exc.detail,
            "hint": "Ensure uploaded files are undamaged JPEG, PNG, or WebP leaf photos under 15MB."
        }
    )

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={
            "success": False,
            "error_code": 422,
            "message": "Invalid request payload or form parameters.",
            "details": exc.errors()
        }
    )

@app.exception_handler(Exception)
async def generic_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "success": False,
            "error_code": 500,
            "message": f"Internal diagnostic service error: {str(exc)}",
            "hint": "Please retry or check system health at /api/health."
        }
    )

# Mount routes under /api and directly for convenience
app.include_router(api_router, prefix=settings.API_PREFIX, tags=["PlantDoc Core API"])
app.include_router(api_router, tags=["PlantDoc Top-Level API"])

@app.get("/")
def root():
    return {
        "app": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "status": "online",
        "endpoints": {
            "predict": f"{settings.API_PREFIX}/predict",
            "health": f"{settings.API_PREFIX}/health",
            "classes": f"{settings.API_PREFIX}/classes",
            "stats": f"{settings.API_PREFIX}/stats",
            "docs": "/docs"
        }
    }
