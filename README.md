# Pretext

**Pretext** is a modern template for building browser extensions (currently
optimized for Firefox) using TypeScript, Vite, and Tailwind CSS. It provides a
clean, minimal setup for developing content scripts, popup UIs, and background
workers with fast build times and modular structure.

### Features

- Vite for fast development and builds
- TypeScript for type-safe development
- Tailwind CSS for utility-first styling
- Clean project structure for content scripts, popups, and more
- ESLint and Prettier configured out of the box

## Getting Started

### Prerequisites

- Node.js (v20+) (see `.nvmrc` for the recommended version)
- Yarn

### Installation

```bash
git clone https://github.com/Opeyem1a/pretext.git
cd pretext
yarn install
```

### Production Build

To build the extension for distribution:

```bash
yarn build
```

Output is placed in the `dist/` directory with subdirectories for Chrome vs
Firefox. You can then load it as a temporary extension in Firefox or Chrome.
