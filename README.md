# FHL-shared-UI Sandbox

Repository:

- `https://github.com/franxis12/FHL-shared-UI`

Small React component library sandbox built with:

- React
- Vite library mode
- Tailwind CSS
- vite-plugin-svgr
- Storybook

Available components:

- `Button`
- `Card`

## Dependencies Required in the Consumer Project

This library expects these dependencies in the project that will use it:

```bash
npm install react react-dom
```

These are peer dependencies of `FHL-shared-UI`.

You do not need to install these just to consume the library:

- Tailwind CSS
- Vite
- Storybook
- vite-plugin-svgr

The library already ships its built CSS file, so importing the stylesheet is enough.

## Install from GitHub

If your project already has `react` and `react-dom`, install the library directly from GitHub:

```bash
npm install github:franxis12/FHL-shared-UI#main
```

You can also install from a specific branch:

```bash
npm install github:franxis12/FHL-shared-UI#your-branch-name
```

If you want to install everything in one step in a new React project:

```bash
npm install react react-dom github:franxis12/FHL-shared-UI#main
```

The project uses `prepare`, so the library is built during installation from GitHub.

## Use in Another React Project

Import the components:

```jsx
import { Button, Card } from "FHL-shared-UI";
import "FHL-shared-UI/FHL-shared-UI.css";
```

Example:

```jsx
import { Button, Card } from "FHL-shared-UI";
import "FHL-shared-UI/FHL-shared-UI.css";

function App() {
  return (
    <div>
      <Button variant="primary">Save</Button>

      <Card title="Shared UI example">
        This card is coming from the FHL-shared-UI library.
      </Card>
    </div>
  );
}

export default App;
```

## Local Development

Commands:

- `npm run dev` starts the small local Vite playground
- `npm run storybook` starts Storybook
- `npm run build` builds the library into `dist/`
- `npm run build-storybook` builds the Storybook site
