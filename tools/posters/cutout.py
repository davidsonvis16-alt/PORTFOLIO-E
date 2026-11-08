"""Cuts the subject out of a photo (ISNet, same model rembg uses) and saves a trimmed PNG.

    PYTHONPATH=tools/reels/.pylib python3 tools/posters/cutout.py <model.onnx> <photo.jpg> <out.png> [threshold]

The model is isnet-general-use.onnx from github.com/danielgatis/rembg releases.
"""
import sys

import numpy as np
import onnxruntime as ort
from PIL import Image, ImageFilter

model, src, out = sys.argv[1:4]
cut = float(sys.argv[4]) if len(sys.argv) > 4 else 0.0

im = Image.open(src).convert("RGB")
x = np.asarray(im.resize((1024, 1024), Image.LANCZOS), dtype=np.float32) / 255.0
x = (x - 0.5) / 1.0
x = x.transpose(2, 0, 1)[None]
sess = ort.InferenceSession(model, providers=["CPUExecutionProvider"])
pred = sess.run(None, {sess.get_inputs()[0].name: x})[0][0, 0]
pred = (pred - pred.min()) / (pred.max() - pred.min() + 1e-8)
if cut:
    pred = np.clip((pred - cut) / (1 - cut), 0, 1)
mask = Image.fromarray((pred * 255).astype(np.uint8)).resize(im.size, Image.LANCZOS)
mask = mask.filter(ImageFilter.GaussianBlur(0.6))
rgba = im.copy()
rgba.putalpha(mask)
box = mask.point(lambda v: 255 if v > 24 else 0).getbbox()
if box:
    pad = 6
    box = (max(box[0] - pad, 0), max(box[1] - pad, 0), min(box[2] + pad, im.width), min(box[3] + pad, im.height))
    rgba = rgba.crop(box)
rgba.save(out)
print(out, rgba.size)
