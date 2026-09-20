# Exact

**Every photo and video on Instagram, X, LinkedIn and YouTube shows up grey and
blurred. Point at one and the colour comes back.**

Move away and it fades again. That's the whole thing.

You end up looking at something because you decided to, not because it moved.
Nothing is blocked and nothing is hidden — the feed still holds everything it
held before.

How it behaves:

- It opens after your cursor sits still on something for a moment, so sweeping
  past a post doesn't set it off.
- Scrolling doesn't count. Posts sliding under a parked cursor stay grey.
- Something new appearing under a resting cursor, like the next story, opens
  after the same short pause. You don't have to move the cursor again.
- Tab to a post with the keyboard and it opens straight away.
- On YouTube, a video you start watching stays in colour until it pauses, ends,
  or scrolls off screen.
- Opening a post in a lightbox doesn't light up the feed behind it.
- Pause it on any page from the toolbar button. It stays off in that tab until
  you switch it back on or reload.

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
