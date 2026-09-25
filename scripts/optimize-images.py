#!/usr/bin/env python3
"""Create web-sized copies of the original images.

Reads assets/<project>/*.jpg and writes resized, compressed copies to
assets/web/<project>/. Originals are left untouched. Re-run after adding
new images; existing up-to-date outputs are skipped.

Requires Pillow: pip install pillow
"""
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent / "assets"
OUT = ROOT / "web"
MAX_EDGE = 2000  # longest side in pixels
QUALITY = 82


def main():
    for src in sorted(ROOT.glob("*/*.jpg")):
        if OUT in src.parents:
            continue
        dst = OUT / src.parent.name / src.name
        if dst.exists() and dst.stat().st_mtime >= src.stat().st_mtime:
            continue
        dst.parent.mkdir(parents=True, exist_ok=True)
        with Image.open(src) as im:
            icc = im.info.get("icc_profile")
            im = ImageOps.exif_transpose(im).convert("RGB")
            im.thumbnail((MAX_EDGE, MAX_EDGE), Image.LANCZOS)
            im.save(dst, "JPEG", quality=QUALITY, optimize=True,
                    progressive=True, icc_profile=icc)
        print(f"{src.relative_to(ROOT)} -> {dst.relative_to(ROOT)} "
              f"({dst.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
