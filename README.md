# Exact

Only see exactly the colours you need. Exact automatically removes the colour
and resolution from all images and videos on target websites, but returns the
colour and resolution on mouse hover or element focus.

The hypothesis is to create an experience where you only see the details and
colours of content you are intentionally interacting with, reducing the number
of times an algorithm's suggestions can steal your focus.

Make the decision to interact with content intentionally. Exact removes a major
psychological tool content uses farm your attention.

### Support

Exact currently supports the following websites:

- Instagram
- LinkedIn
- Twitter / X
- YouTube

Please reach out to me to support other websites.

### Goals

- Inspire a more intentional desktop browsing experience for scial media sites
- Test [pretext](https://github.com/Opeyem1a/pretext) as a boilerplate for
  browser extensions (it went badly but I learned a lot)
- Practice creating a browser extension with more modern tooling
- Decrease my time to launch for browser extension projects
- Practice building a project intended to dual release to Chrome and Firefox

> Available on Firefox soon

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
Firefox. You can then load it as a temporary extension in Firefox or Chrome.
