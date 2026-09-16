import sys
from PIL import Image

def crop_and_glow(img_path, out_path):
    img = Image.open(img_path).convert("RGBA")
    
    # Get bounding box of non-transparent pixels
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)
        
    img.save(out_path, "PNG")

crop_and_glow(sys.argv[1], sys.argv[2])
