# Exact
Only see exactly the colours you need.

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
