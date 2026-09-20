# Promo

Source of truth for the store listings. The manifest `description` is capped at
132 characters by the Chrome Web Store, so the longer summary and the full
description live here and are pasted into each store's own fields.

## Copy

### Name

```
Exact - Browse with intention
```

### Summary

This is live on AMO. At 128 characters it also fits Chrome's 132-character cap
on `manifest.description`, so both manifests carry it verbatim and the two
stores cannot drift apart.

```
Make social media sites less distracting by default. Only see what you hover over with your cursor. Stay intentional on the web.
```

### Description

```
Every photo and video on Instagram, X, LinkedIn and YouTube shows up grey and blurred. Point at one and the colour comes back. Move away and it fades again.

You only interact with content intentionally. Only on purpose.

HOW IT BEHAVES

• It opens after your cursor sits still on something for a moment, so sweeping past a post doesn't set it off.
• Scrolling doesn't count. Posts sliding under a parked cursor stay grey.
• Tab to a post with the keyboard and it opens straight away.
• On YouTube, a video you start watching stays in colour until it pauses, ends, or scrolls off screen.

Because things only open when you point at them, a screen running Exact is also a quiet one. In an open-plan office or on a train, what's visible from three feet away is a grid of grey rectangles.

WHERE IT WORKS

Instagram, X, LinkedIn and YouTube. It does nothing on any other site.

PRIVACY

No accounts, no analytics, no network requests, nothing stored. Exact asks for no permissions beyond those four sites. It's one stylesheet and one script that watches where your pointer is.
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

### The fourth screenshot needs reshooting, not deleting

The popup capture on the live listing shows an older Enable/Disable dialog. The
toggle itself is back as of #55, so the feature it advertises does ship again —
but the popup now has a live preview, a status line and a single button, so the
published image no longer matches what installs. Reshoot it rather than drop it:
"can I turn it off" is the first question a listing like this has to answer.

## Remaking these

There is no build step here and nothing to run. The PNGs are the deliverable;
remake them by hand, or ask for them to be rebuilt, when the listing changes.

For reference: 1280x800 on a grey studio gradient. The media tiles are cut out
of the capture and laid in a row that runs off the right edge, all of them grey
except one, with a cursor and a highlight ring resting on the one in colour.
Type sits in a column on the left, Instrument Serif at 58px over a 16px serif
sub, near-black. No browser chrome anywhere.

The source captures are the screenshots already on the listing:

```bash
curl -s "https://addons.mozilla.org/api/v5/addons/addon/exact-browse-with-intention/" \
  | python3 -c "import json,sys;[print(p['image_url']) for p in json.load(sys.stdin)['previews']]"
```
