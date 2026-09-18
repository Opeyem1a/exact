#!/usr/bin/env python3
"""Build the Exact store promo frames from the real AMO captures.

Layout: type holds a column on the left; on the right, the media tiles are
cut straight out of a capture and laid out on a grey ground, with a
cursor resting on the one in colour. The tile pixels are untouched -- real
sites, real photographs, the extension actually running. Only the site chrome
around them is dropped, because the claim is about the media, and a sliced
browser window mostly shows clutter.

Usage:  python3 gen_promo.py <out-dir> <captures-dir>
"""
import base64, os, sys

OUT = sys.argv[1]
SRC = os.path.abspath(sys.argv[2])
# Inlined rather than fetched, from Google Fonts or even from disk: headless
# Chrome can take the screenshot before the font arrives, and falls back to
# Georgia silently on some frames but not others
with open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "fonts",
                       "InstrumentSerif-Regular.woff2"), "rb") as f:
    FONT = "data:font/woff2;base64," + base64.b64encode(f.read()).decode()
os.makedirs(OUT, exist_ok=True)

W, H = 1280, 800
CAPTURE_W = 2400

# Tiles start just right of the type column and run off the right edge, so the
# row reads as part of a feed that carries on.
TILES_X = 500
GAP = 20

FRAMES = [
    # name, capture, scale, top (None centres vertically), cursor tile index,
    # cursor position within that tile (fractions), tile rects in capture
    # pixels as (x, y, w, h), headline, tail, sub
    ("01-youtube", "327033.png", 1.15, None, 1, (0.74, 0.3),
     [(605, 704, 276, 417), (908, 704, 276, 417), (1209, 704, 276, 417),
      (1511, 704, 276, 417)],
     "Grey until", "you choose to look",
     "Every image and video arrives grey. Point at one and the colour comes back."),
    # One post column, bleeding off the top: the locked post above, the open
    # one below
    ("02-linkedin", "327034.png", 0.75, -40, 0, (0.62, 0.8),
     [(830, 543, 656, 1066)],
     "Point at it.", "Colour comes back.",
     "Media opens when you stop on it — not when you scroll past it."),
    # Cut above Instagram's own "Boost reel" button, which is clutter here
    ("03-instagram", "327036.png", 0.95, None, 1, (0.66, 0.42),
     [(791, 1089, 360, 391), (1162, 1089, 363, 391), (1535, 1089, 360, 391)],
     "Nothing blocked.", "Just quieter.",
     "Your feed still holds everything. It just stops deciding what catches your eye."),
]

TPL = """<!doctype html><html><head><meta charset="utf-8">
<style>
@font-face{{
  font-family:"Instrument Serif"; font-weight:400; font-display:block;
  src:url("{FONT}") format("woff2");
}}
*{{box-sizing:border-box}}
html,body{{margin:0;padding:0;width:{W}px;height:{H}px;overflow:hidden;position:relative}}
body{{background:#D4D4D4}}

.ground{{
  position:absolute; inset:0;
  background:radial-gradient(120% 90% at 0% 0%, #F4F4F4 0%, #D6D6D6 45%, #9C9C9C 100%);
}}

.col{{
  position:absolute; left:0; top:0; bottom:0; width:{TILES_X}px; z-index:2;
  padding:76px 44px 76px 64px;
  display:flex; flex-direction:column; justify-content:center; gap:22px;
}}
.head{{
  font-family:"Instrument Serif",Georgia,serif; font-weight:400;
  font-size:58px; line-height:1.02; color:#111111; letter-spacing:.004em;
  /* Instrument Serif ships in one weight; a hairline stroke in the text's own
     colour thickens it enough to hold up on the grey ground */
  -webkit-text-stroke:1.1px currentColor;
}}
.head .tail{{ color:#4F4F4F; display:block; }}
.sub{{
  font-family:Georgia,"Times New Roman",serif; font-size:18px; line-height:1.5;
  color:#262626; max-width:27ch;
}}

.tile{{
  position:absolute; overflow:hidden; border-radius:14px; z-index:1;
  box-shadow:0 24px 60px rgba(0,0,0,.3);
}}
.tile img{{ position:absolute; display:block; }}
.tile::after{{
  content:""; position:absolute; inset:0; border-radius:14px;
  box-shadow:0 0 0 1px rgba(255,255,255,.08) inset; pointer-events:none;
}}
/* The ring marks where the pointer rests; the arrow alone gets lost in a
   busy photo */
.ring{{
  position:absolute; z-index:3; width:72px; height:72px; margin:-36px 0 0 -36px;
  border-radius:50%; background:rgba(255,255,255,.12);
  border:2px solid rgba(255,255,255,.9);
  box-shadow:0 0 0 1px rgba(0,0,0,.18), 0 6px 20px rgba(0,0,0,.3);
}}
.cursor{{
  position:absolute; z-index:4; width:34px; height:49px; margin:-3px 0 0 -3px;
  filter:drop-shadow(0 4px 8px rgba(0,0,0,.5));
}}
</style></head><body>
<div class="ground"></div>
<div class="col">
  <div class="head">{HEAD} <span class="tail">{TAIL}</span></div>
  <div class="sub">{SUB}</div>
</div>
{TILES}
</body></html>"""

TILE = """<div class="tile" style="left:{x}px;top:{y}px;width:{w}px;height:{h}px">\
<img src="{src}" alt="" style="width:{iw}px;left:{ix}px;top:{iy}px"></div>"""

CURSOR = """<div class="ring" style="left:{x}px;top:{y}px"></div>\
<svg class="cursor" style="left:{x}px;top:{y}px" viewBox="0 0 18 26">\
<path d="M1 1v20l5-4.8 3.6 8 3.4-1.5-3.5-7.7H16z" fill="#000" stroke="#fff" \
stroke-width="1.6" stroke-linejoin="round"/></svg>"""

for name, src, scale, top, cursor_at, (cx, cy), rects, head, tail, sub in FRAMES:
    img = os.path.join(SRC, src)
    height = max(h for _, _, _, h in rects) * scale
    y = (H - height) / 2 if top is None else top
    x = TILES_X
    parts = []
    for i, (rx, ry, rw, rh) in enumerate(rects):
        w, h = rw * scale, rh * scale
        parts.append(TILE.format(
            x=round(x), y=round(y), w=round(w), h=round(h), src=img,
            iw=round(CAPTURE_W * scale), ix=round(-rx * scale),
            iy=round(-ry * scale),
        ))
        if i == cursor_at:
            parts.append(CURSOR.format(x=round(x + w * cx), y=round(y + h * cy)))
        x += w + GAP

    html = TPL.format(
        W=W, H=H, TILES_X=TILES_X, FONT=FONT, HEAD=head, TAIL=tail, SUB=sub,
        TILES="\n".join(parts),
    )
    path = os.path.join(OUT, name + ".html")
    open(path, "w").write(html)
    print(path)
