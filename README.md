# FHL Shared UI

A private React component library used to share UI components across FHL projects.

Built with:

- React 19
- Vite (Library Mode)
- Tailwind CSS v4
- vite-plugin-svgr
- Storybook

---

## Features

- Shared React components
- Shared styles
- SVG support through `vite-plugin-svgr`
- Storybook for component development
- Distributed directly from GitHub

---

## Current Components

- `Button`
- `Card`

More shared components will be added over time.

---

# Requirements

The consuming project must already include:

```bash
npm install react react-dom
```

These packages are defined as **peerDependencies** and are intentionally not bundled with the library.

The consumer project does **not** need to install:

- Tailwind CSS
- Storybook
- vite-plugin-svgr
- Vite

The compiled CSS is already included in the package.

---

# Installation

Install directly from GitHub:

```bash
npm install git+https://github.com/franxis12/FHL-shared-UI.git#main
```

Or install from another branch:

```bash
npm install git+https://github.com/franxis12/FHL-shared-UI.git#branch-name
```

For a brand-new React project:

```bash
npm install react react-dom
npm install git+https://github.com/franxis12/FHL-shared-UI.git#main
```

The package includes a `prepare` script, so it is automatically built when installed directly from GitHub.

---

# Usage

Import the components:

```jsx
import { Button, Card } from "FHL-shared-UI";
import "FHL-shared-UI/FHL-shared-UI.css";
```

Example:

```jsx
import { Button, Card } from "FHL-shared-UI";
import "FHL-shared-UI/FHL-shared-UI.css";

export default function App() {
  return (
    <Card title="Shared UI">
      <Button variant="primary">Save</Button>
    </Card>
  );
}
```

---

# Development

Start the local development playground:

```bash
npm run dev
```

Run Storybook:

```bash
npm run storybook
```

Build the library:

```bash
npm run build
```

Build the Storybook static site:

```bash
npm run build-storybook
```

## .

Consume projects
rm -rf node_modules/@franxis12/fhl-shared-ui
rm -rf package-lock.json node_modules
npm install
npm run dev

---

###### install

npm install github:franxis12/FHL-shared-UI#main
npm install 'github:franxis12/FHL-shared-UI#main'

###### check

grep -n "@franxis12/fhl-shared-ui" package.json package-lock.json

# Project Structure

```
src/
 ├── components/
 ├── assets/
 ├── index.js
 └── styles/

dist/
```

The `dist/` folder is generated automatically during the build process and is the only part consumed by external projects.

---

# Versioning

This library is intended to be versioned using Git tags.

Example:

```
v1.0.0
v1.1.0
v1.2.0
```

Consumer projects can install a specific version:

```bash
npm install git+https://github.com/franxis12/FHL-shared-UI.git#v1.0.0
```

or follow the latest changes from the main branch:

```bash
npm install git+https://github.com/franxis12/FHL-shared-UI.git#main
```

## ...

# License

Private repository.

This library is intended exclusively for FHL projects and is not published to npm.
