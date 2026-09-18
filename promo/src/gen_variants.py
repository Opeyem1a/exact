#!/usr/bin/env python3
"""Three compositional directions on the same real capture.

The screen pixels are untouched in all three. What changes is how much of the
frame they get, and where the type lives. The device-on-a-sweep template is
deliberately absent from all of them.
"""
import os, sys

OUT = sys.argv[1]
SRC = os.path.abspath(sys.argv[2])
os.makedirs(OUT, exist_ok=True)
W, H = 1280, 800
CAP = os.path.join(SRC, "327033.png")      # YouTube: one Short in colour

HEAD = """<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=IBM+Plex+Mono:wght@400;500&display=swap">
<style>
*{box-sizing:border-box}
html,body{margin:0;padding:0;width:%dpx;height:%dpx;overflow:hidden;position:relative}
body{background:#100C18;font-family:"Instrument Serif",Georgia,serif}
.serif{font-family:"Instrument Serif",Georgia,serif;font-style:italic;font-weight:400}
.mono{font-family:"IBM Plex Mono",monospace;text-transform:uppercase;letter-spacing:.16em}
</style></head><body>
""" % (W, H)
FOOT = "</body></html>"


# ── A ──────────────────────────────────────────────────────────────────
# Full bleed, 1:1 pixel crop straight onto the Shorts row so the locked
# thumbnails and the one in colour fill the whole frame. Type sits in the
# image on a scrim, not above it on a background.
A = HEAD + """
<div style="position:absolute;inset:0;overflow:hidden">
  <img src="%s" style="position:absolute;left:-600px;top:-560px;width:2560px;display:block">
</div>
<div style="position:absolute;left:0;right:0;bottom:0;height:392px;
  background:linear-gradient(180deg,rgba(11,8,16,0) 0%%,rgba(11,8,16,.72) 34%%,rgba(11,8,16,.97) 72%%,#0B0810 100%%)"></div>
<div style="position:absolute;left:64px;bottom:52px;right:64px">
  <div class="mono" style="font-size:12px;color:#C9A3F0;margin-bottom:14px">Exact &middot; browse with intention</div>
  <div class="serif" style="font-size:62px;line-height:1.02;color:#FBF9FE;max-width:15ch">
    Only what you&rsquo;re <span style="color:#C9A3F0">looking at</span>
  </div>
</div>
""" % CAP + FOOT


# ── B ──────────────────────────────────────────────────────────────────
# Asymmetric. Type holds a narrow violet column on the left; the capture is
# a large card bleeding off the right and bottom edges.
B = HEAD + """
<div style="position:absolute;inset:0;background:
  radial-gradient(110%% 80%% at 8%% 4%%, #2A1C3F 0%%, #1A1228 48%%, #100B18 100%%)"></div>
<div style="position:absolute;left:0;top:0;bottom:0;width:452px;padding:76px 44px 76px 64px;
  display:flex;flex-direction:column;justify-content:center;gap:22px;z-index:2">
  <div class="mono" style="font-size:11px;color:#B98DE8">Exact</div>
  <div class="serif" style="font-size:58px;line-height:1.02;color:#FBF9FE">
    Only what you&rsquo;re <span style="color:#B98DE8">looking&nbsp;at</span>
  </div>
  <div style="font-family:Georgia,serif;font-size:16px;line-height:1.5;color:#B3A9C4;max-width:26ch">
    Every image and video arrives grey. Rest your cursor on one and it develops.
  </div>
</div>
<div style="position:absolute;left:452px;top:96px;width:1100px;height:760px;overflow:hidden;
  border-radius:12px 0 0 0;box-shadow:-30px 30px 90px rgba(0,0,0,.6);z-index:1">
  <img src="%s" style="position:absolute;left:-560px;top:-470px;width:2320px;display:block">
</div>
""" % CAP + FOOT


# ── C ──────────────────────────────────────────────────────────────────
# No headline at all. A tight crop carries it, with one small mono mark.
# AMO gives every screenshot its own caption field anyway.
C = HEAD + """
<div style="position:absolute;inset:0;overflow:hidden">
  <img src="%s" style="position:absolute;left:-560px;top:-600px;width:2760px;display:block">
</div>
<div style="position:absolute;left:0;right:0;bottom:0;height:130px;
  background:linear-gradient(180deg,rgba(11,8,16,0),rgba(11,8,16,.9))"></div>
<div style="position:absolute;left:40px;bottom:34px;display:flex;align-items:center;gap:12px">
  <span style="width:9px;height:9px;border-radius:50%%;background:#C9A3F0;display:block"></span>
  <span class="mono" style="font-size:12px;color:#EDE6F7">Exact &mdash; only what you&rsquo;re looking at</span>
</div>
""" % CAP + FOOT


for name, html in [("A-fullbleed", A), ("B-asymmetric", B), ("C-notype", C)]:
    open(os.path.join(OUT, name + ".html"), "w").write(html)
    print(name)
