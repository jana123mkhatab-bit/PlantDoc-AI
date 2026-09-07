import io
from PIL import Image
from fastapi import UploadFile, HTTPException, status
from ..core.config import settings

class ImageValidator:
    @staticmethod
    async def validate_image(file: UploadFile) -> Image.Image:
        # Check Content-Type header
        content_type = file.content_type
        if content_type and content_type.lower() not in settings.ALLOWED_IMAGE_TYPES:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Unsupported file format '{content_type}'. Please upload a valid JPG, PNG, or WebP image."
            )
        
        # Read content and check size
        contents = await file.read()
        max_bytes = settings.MAX_IMAGE_SIZE_MB * 1024 * 1024
        if len(contents) > max_bytes:
            raise HTTPException(
                status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
                detail=f"Image file exceeds maximum allowable size of {settings.MAX_IMAGE_SIZE_MB}MB."
            )
        
        if len(contents) < 100:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Uploaded file is empty or corrupted."
            )
        
        # Verify image integrity with PIL
        try:
            image = Image.open(io.BytesIO(contents))
            image.verify()  # Fast verification of headers
            # Reopen because verify() closes the stream
            image = Image.open(io.BytesIO(contents))
            image.load()    # Force loading pixel data to detect truncation
        except Exception:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Could not decode image file. Please provide an undamaged leaf photograph."
            )
        
        # Check minimum dimensions
        width, height = image.size
        if width < 32 or height < 32:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Image dimensions ({width}x{height}) are too small for accurate diagnostic analysis. Minimum size is 32x32 pixels."
            )
            
        # Convert to RGB (handles RGBA, grayscale, CMYK)
        if image.mode != "RGB":
            image = image.convert("RGB")
            
        return image

    @staticmethod
    def check_leaf_heuristics(image: Image.Image) -> bool:
        """
        Lightweight color spectrum heuristic to check if the image has reasonable leaf/organic tones.
        Returns True if image passes plausible leaf spectrum check.
        """
        # Downsample for rapid histogram analysis
        thumb = image.resize((64, 64))
        import numpy as np
        pixels = np.array(thumb).reshape(-1, 3)
        
        # Count pixels with botanical coloration (green, yellow, red-brown, copper)
        botanical_pixels = 0
        total_pixels = len(pixels)
        
        for r, g, b in pixels:
            # Green dominant (healthy foliage)
            if g > r and g > b and g > 30:
                botanical_pixels += 1
            # Yellow/chlorotic tones (r and g high, b low)
            elif r > 80 and g > 80 and b < min(r, g) - 20:
                botanical_pixels += 1
            # Necrotic/brown/rust tones (r > g > b, earthy)
            elif r > 60 and g > 40 and r > b + 15:
                botanical_pixels += 1
                
        ratio = botanical_pixels / total_pixels
        # If at least 12% of the pixels contain leaf/plant spectrum tones, accept
        return ratio >= 0.12
