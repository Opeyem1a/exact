# Exact

**Instagram, X, LinkedIn and YouTube arrive in grey. Rest your cursor on a photo
or video and it develops into full colour.**

You don't choose most of what you look at. Something bright moves at the edge of
the screen and your eye is already there. Exact removes that pull without
removing anything you came for: every image and video loads grey, soft and dim,
and develops only when you rest your cursor on it or reach it with the keyboard.

Nothing is blocked, nothing is hidden, and no timer runs out. The feed still
holds everything it held before — it just no longer decides which part of it you
look at.

How it behaves:

- Media opens after your cursor rests on it for a moment, so passing over a post
  doesn't set it off.
- Scrolling doesn't count. Content sliding underneath a parked cursor stays
  closed — that isn't a choice you made.
- New media that appears under a resting cursor, like the next Instagram story,
  opens after the same short rest. You don't need to move the cursor again.
- Keyboard focus opens media immediately. Tabbing to something is already
  deliberate.
- On YouTube, a video you start watching stays in full colour until it pauses,
  ends, or scrolls away.
- An open post in a modal doesn't light up the feed behind it.

You can disable Exact on the current page from the toolbar popup. It stays off
in that tab until you enable it again or reload.

### Support

Exact currently supports the following websites:

- Instagram
- LinkedIn
- Twitter / X
- YouTube

Please reach out to me to support other websites.

### Goals

- Inspire a more intentional desktop browsing experience for social media sites
- Test [pretext](https://github.com/Opeyem1a/pretext) as a boilerplate for
  browser extensions (it went badly but I learned a lot)
- Practice creating a browser extension with more modern tooling
- Decrease my time to launch for browser extension projects
- Practice building a project intended to dual release to Chrome and Firefox

> [Available on Firefox](https://addons.mozilla.org/en-CA/firefox/addon/exact-browse-with-intention/)

> Available on Chrome soon

## Getting Started

### Prerequisites

- Node.js (v20+) (see `.nvmrc` for the recommended version)
- Yarn

### Installation

```bash
git clone https://github.com/Opeyem1a/exact.git
cd exact
yarn install
```

### Production Build

To build the extension for distribution:

```bash
yarn build
```

Output is placed in the `dist/` directory with subdirectories for Chrome vs
Firefox (there will be an extension.zip inside the folder). You can then load it
as a temporary extension in Firefox or Chrome.
