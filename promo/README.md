# Promo

Source of truth for the store listings. The manifest `description` is capped at
132 characters by the Chrome Web Store, so the longer summary and the full
description live here and are pasted into each store's own fields.

## Copy

### Name

```
Exact — Browse with intention
```

### Summary

AMO's summary field allows 250 characters. Chrome takes its short description
from `manifest.description`, which is capped at 132 — that shorter form is
already in `public/*/manifest.json`.

```
Instagram, X, LinkedIn and YouTube arrive in grey. Rest your cursor on a photo or video and it develops into full colour. Nothing is blocked, nothing is hidden — the feed just stops deciding what catches your eye. You do.
```

### Description

```
You don't choose most of what you look at. Something bright moves at the edge of the screen and your eye is already there.

Exact removes that pull without removing anything you came for. On Instagram, X, LinkedIn and YouTube, every image and video loads grey, soft and dim. Rest your cursor on one and it develops — the blur lifts first, then the colour comes back. Move away and it settles down again.

Nothing is blocked. Nothing is deleted. No timer runs out, no site is locked at 9pm, and there is no streak to keep. The feed still holds everything it held before. It just no longer decides which part of it you look at.

HOW IT BEHAVES

• Media opens after your cursor rests on it for a moment, so passing over a post doesn't set it off.
• Scrolling doesn't count. Content sliding underneath a parked cursor stays closed — that isn't a choice you made.
• Keyboard focus opens media immediately. Tabbing to something is already deliberate.
• On YouTube, a video you start watching stays in full colour until it pauses, ends, or scrolls away.
• An open post in a modal doesn't light up the feed behind it.

Because media only opens when you point at it, a page with Exact on it is also a quiet page. In an open-plan office, on a train, in a coffee shop, what's on your screen from three feet away is a grid of grey rectangles. Nobody's reading your feed over your shoulder — not because it's hidden, but because there's nothing there to catch their eye either.

WHERE IT WORKS

Instagram, X (Twitter), LinkedIn and YouTube. Exact runs only on those four sites and does nothing anywhere else.

YOUR DATA

No accounts, no analytics, no network requests, no data leaves your machine. Exact is a stylesheet and one content script that watches where your pointer is. It asks for no permissions beyond running on those four sites, and the source is open.

Made for people who don't want to quit these sites — only to stop being handed things to look at.
```

### Tags

Free search surface — it costs the listing copy nothing, so spend it on the
intents the summary can't reach:

```
privacy, focus, productivity, distraction, social media, minimalism, grayscale
```

The over-the-shoulder angle stays a tag and one description paragraph, never the
summary or the name. Pitched as a feature it invites comparison to tools that
actually protect something, and it loses that comparison the moment you hover.
Avoid the words _privacy screen_, _protect_, _secure_ and _hide_; use the
situational language instead. The honest threat model is ambient glancing, not
someone deliberately reading over your shoulder.

## Screenshots

Upload in this order. AMO uses the first as the listing thumbnail, and each
image proves exactly one claim.

| File           | Claim                       | Caption                         |
| -------------- | --------------------------- | ------------------------------- |
| `01-youtube`   | One thing in colour, chosen | Grey until you choose to look.  |
| `02-linkedin`  | Resting on a post opens it  | Point at it. Colour comes back. |
| `03-instagram` | Nothing is blocked          | Nothing blocked. Just quieter.  |

Upload `screenshots/1280x800`: the Chrome Web Store accepts only 1280×800 or
640×400. `screenshots/2560x1600` is the same set at 2× for AMO, which has no
fixed size and renders sharper on high-density displays. Put `01-youtube` first
— AMO uses the first image as the listing thumbnail, and it is the clearest of
the three because one Short sits in full colour surrounded by locked ones.

### These are real captures

The media tiles are cut straight out of the original AMO captures — real sites,
real photographs, the extension actually running. Only the layer around them is
generated: the grey ground, the headline, the tile layout and the cursor. The
site chrome is dropped because the claim is about the media, and a browser
window cropped to fit mostly showed clutter. The ground is black, white and grey
so the tile under the cursor is the only colour in the frame. Synthetic mockups
were tried and abandoned; gradient stand-ins for photographs read as obviously
fake, which is fatal for a product whose whole promise is what happens to
photographs.

### Still missing

Two claims have no image because no existing capture shows them, and both need a
fresh capture session:

- **Scrolling doesn't unlock.** Shoot mid-scroll with the pointer parked over a
  post that stays grey. This is the most defensible behaviour in the extension
  and it appears nowhere on the listing.
- **Keyboard focus opens immediately.** Shoot a focus ring on a post that has
  opened, with no cursor in frame.

### Do not reuse the old fourth screenshot

The popup capture still on the live listing (`src/captures/327035.png`) shows
Enable and Disable buttons. That toggle was added in `46752cb` and removed in
`4ade545` when unlocking moved to JS, so the current popup has no controls at
all. The image advertises a feature that does not ship — replace it or ship the
toggle again.

## Regenerating

```bash
python3 promo/src/gen_promo.py /tmp/exact-promo promo/src/captures

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
for f in /tmp/exact-promo/*.html; do
  n=$(basename "$f" .html)
  "$CHROME" --headless --disable-gpu --hide-scrollbars --force-color-profile=srgb \
    --allow-file-access-from-files --virtual-time-budget=6000 --window-size=1280,800 \
    --screenshot="promo/screenshots/1280x800/$n.png" "file://$f"
done
```

Add `--force-device-scale-factor=2` for the 2× set. The headline font,
Instrument Serif, is bundled in `src/fonts` (SIL Open Font License) and inlined
into each page, so renders need no network and never fall back to Georgia.

Each frame in `gen_promo.py` lists its tiles as rectangles in capture pixels,
plus which tile the cursor rests on. New captures at a different window size
will need those rectangles rechecked.
