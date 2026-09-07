import os
import math
import random
from PIL import Image, ImageDraw, ImageFilter

samples_dir = r"d:\PlantDoc\frontend\public\samples"
os.makedirs(samples_dir, exist_ok=True)

def generate_leaf(bg_color, leaf_base_color, lesions, filename, title):
    W, H = 400, 400
    img = Image.new("RGB", (W, H), bg_color)
    draw = ImageDraw.Draw(img)
    
    # Draw soft background texture/gradient
    for y in range(H):
        ratio = y / H
        r = int(bg_color[0] * (1 - ratio*0.1))
        g = int(bg_color[1] * (1 - ratio*0.1))
        b = int(bg_color[2] * (1 - ratio*0.1))
        draw.line([(0, y), (W, y)], fill=(r, g, b))

    # Leaf shape (oval / lanceolate)
    leaf_mask = Image.new("L", (W, H), 0)
    l_draw = ImageDraw.Draw(leaf_mask)
    
    # Points for a natural curved leaf
    points = [
        (200, 40),   # tip
        (280, 120),  # right upper
        (310, 220),  # right wide
        (260, 320),  # right base
        (200, 360),  # petiole base
        (140, 320),  # left base
        (90, 220),   # left wide
        (120, 120),  # left upper
    ]
    l_draw.polygon(points, fill=255)
    
    # Smooth the leaf mask
    leaf_mask = leaf_mask.filter(ImageFilter.GaussianBlur(radius=3))
    
    # Base leaf layer
    leaf_layer = Image.new("RGB", (W, H), leaf_base_color)
    ll_draw = ImageDraw.Draw(leaf_layer)
    
    # Add vein structure
    ll_draw.line([(200, 50), (200, 350)], fill=(leaf_base_color[0]-25, leaf_base_color[1]+20, leaf_base_color[2]-15), width=4)
    for i in range(7):
        y = 90 + i * 35
        # Side veins
        ll_draw.line([(200, y), (200 + 70 - i*5, y - 25)], fill=(leaf_base_color[0]-15, leaf_base_color[1]+15, leaf_base_color[2]-10), width=2)
        ll_draw.line([(200, y), (200 - 70 + i*5, y - 25)], fill=(leaf_base_color[0]-15, leaf_base_color[1]+15, leaf_base_color[2]-10), width=2)

    # Add disease lesions if specified
    for lesion in lesions:
        lx, ly = lesion["pos"]
        rad = lesion["radius"]
        color = lesion["color"]
        halo = lesion.get("halo", None)
        
        if halo:
            ll_draw.ellipse([lx - rad - 8, ly - rad - 8, lx + rad + 8, ly + rad + 8], fill=halo)
        
        # Concentric rings or spots
        ll_draw.ellipse([lx - rad, ly - rad, lx + rad, ly + rad], fill=color)
        if lesion.get("bullseye"):
            ll_draw.ellipse([lx - rad + 4, ly - rad + 4, lx + rad - 4, ly + rad - 4], outline=(40, 20, 10), width=2)
            ll_draw.ellipse([lx - 3, ly - 3, lx + 3, ly + 3], fill=(30, 15, 5))

    # Composite leaf onto background
    img.paste(leaf_layer, (0, 0), leaf_mask)
    
    # Save
    out_path = os.path.join(samples_dir, filename)
    img.save(out_path, quality=92)
    print(f"Generated sample: {filename}")

# 1. Tomato Early Blight (Concentric rings, yellow halo)
generate_leaf(
    bg_color=(235, 238, 235),
    leaf_base_color=(55, 125, 60),
    lesions=[
        {"pos": (180, 160), "radius": 24, "color": (90, 55, 25), "halo": (195, 180, 50), "bullseye": True},
        {"pos": (240, 230), "radius": 18, "color": (85, 50, 20), "halo": (190, 175, 45), "bullseye": True},
        {"pos": (150, 270), "radius": 14, "color": (75, 45, 15), "halo": (185, 170, 40), "bullseye": True},
    ],
    filename="tomato_early_blight.jpg",
    title="Tomato Early Blight"
)

# 2. Corn Common Rust (Reddish-brown pustules)
generate_leaf(
    bg_color=(236, 239, 235),
    leaf_base_color=(70, 135, 65),
    lesions=[
        {"pos": (190, 130), "radius": 8, "color": (160, 60, 20)},
        {"pos": (210, 145), "radius": 9, "color": (170, 65, 25)},
        {"pos": (185, 180), "radius": 7, "color": (155, 55, 18)},
        {"pos": (220, 210), "radius": 10, "color": (165, 60, 22)},
        {"pos": (175, 240), "radius": 8, "color": (160, 58, 20)},
        {"pos": (205, 280), "radius": 9, "color": (170, 65, 25)},
    ],
    filename="corn_common_rust.jpg",
    title="Corn Common Rust"
)

# 3. Snake Plant Rot (Translucent yellow-brown base collapse)
generate_leaf(
    bg_color=(238, 237, 233),
    leaf_base_color=(45, 105, 70),
    lesions=[
        {"pos": (200, 310), "radius": 45, "color": (105, 80, 35), "halo": (165, 140, 50)},
        {"pos": (190, 270), "radius": 30, "color": (95, 70, 30), "halo": (155, 130, 45)},
    ],
    filename="snake_plant_rot.jpg",
    title="Snake Plant Rot"
)

# 4. Aloe Vera Leaf Spot (Dark brown spots with red borders)
generate_leaf(
    bg_color=(235, 238, 236),
    leaf_base_color=(75, 140, 105),
    lesions=[
        {"pos": (190, 150), "radius": 12, "color": (65, 35, 20), "halo": (145, 45, 30)},
        {"pos": (225, 200), "radius": 15, "color": (60, 30, 18), "halo": (140, 40, 25)},
        {"pos": (175, 250), "radius": 10, "color": (70, 38, 22), "halo": (150, 50, 35)},
    ],
    filename="aloe_vera_leaf_spot.jpg",
    title="Aloe Vera Leaf Spot"
)

# 5. Peach Healthy (Crisp vibrant green, zero lesions)
generate_leaf(
    bg_color=(236, 239, 236),
    leaf_base_color=(60, 140, 65),
    lesions=[],
    filename="peach_healthy.jpg",
    title="Peach Healthy"
)

print("All sample leaf images generated successfully in public/samples/")
