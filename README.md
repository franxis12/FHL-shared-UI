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

- `Badge`
- `Button`
- `Card`

More shared components will be added over time.

## Badge

Use `Badge` for non-interactive status or metadata labels. Business-state mapping remains in the consumer.

```jsx
import {
  Badge,
  BADGE_SIZE,
  BADGE_TONE,
} from "@franxis12/fhl-shared-ui";

<Badge tone={BADGE_TONE.WARNING}>Pending review</Badge>
<Badge tone={BADGE_TONE.SUCCESS} size={BADGE_SIZE.MD}>
  Approved
</Badge>
```

The public tones are `neutral`, `info`, `success`, `warning` and `error`; the public sizes are `sm` and `md`. The component is a semantic-neutral `span`, does not map domain states and is not an interactive control or live region.

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

Install an immutable commit that already exists in `main`:

```bash
npm install @franxis12/fhl-shared-ui@git+https://github.com/franxis12/FHL-shared-UI.git#<full-main-sha>
```

Current baseline:

```bash
npm install @franxis12/fhl-shared-ui@git+https://github.com/franxis12/FHL-shared-UI.git#e639e302b973be20b68bd8a92db4a4dade4b7cf4
```

For a brand-new React project:

```bash
npm install react react-dom
npm install @franxis12/fhl-shared-ui@git+https://github.com/franxis12/FHL-shared-UI.git#<full-main-sha>
```

The package includes a `prepare` script, so it is automatically built when installed directly from GitHub.

Do not install from `#main`, another branch name, or a GitHub branch tarball. Those references can move while a consumer or Vercel still has an older `node_modules` cache. Every FHL consumer must declare the same `git+https` URL, full commit SHA, and Shared UI version.

---

# Usage

Import the components:

```jsx
import { Button, Card } from "@franxis12/fhl-shared-ui";
import "@franxis12/fhl-shared-ui/FHL-shared-UI.css";
```

Example:

```jsx
import { Button, Card } from "@franxis12/fhl-shared-ui";
import "@franxis12/fhl-shared-ui/FHL-shared-UI.css";

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

## Publishing and updating consumers

Use this sequence whenever Shared UI changes.

`main` is the only development and publication branch for this repository. Create Shared UI changes, commits, and pushes directly on `main`; do not recreate a long-lived `Dev` branch.

### 1. Version and validate Shared UI

Update the semantic version in both `package.json` and `package-lock.json`:

```bash
npm version patch --no-git-tag-version
npm run build
```

Commit the validated library change directly on `main` and push `main` to GitHub. Consumers must not be updated before that commit exists in `origin/main`.

### 2. Obtain the immutable `main` SHA

There are two supported methods. A local clone is not required.

#### Option A: the repository is available locally

Run these commands from the directory that contains `FHL-shared-UI`:

```bash
cd FHL-shared-UI
git fetch origin
git rev-parse origin/main
```

Use the complete 40-character SHA returned by `git rev-parse`. Do not use the abbreviated SHA in a dependency declaration.

#### Option B: the repository is only available on GitHub

Use the GitHub website when the project is not cloned locally and terminal commands cannot be run:

1. Open [FHL-shared-UI on GitHub](https://github.com/franxis12/FHL-shared-UI).
2. Confirm that the selected branch is `main`.
3. Open the [commit history for `main`](https://github.com/franxis12/FHL-shared-UI/commits/main).
4. Open the newest commit at the top of the list.
5. Use GitHub's copy button to copy the full 40-character commit SHA.

The SHA must come from the newest published commit in `main`. Do not copy the SHA from an open pull request or another branch.

As a direct browser-only alternative, open the [GitHub API response for the latest `main` commit](https://api.github.com/repos/franxis12/FHL-shared-UI/commits/main) and copy the complete value of the first `sha` field. No local repository or Git command is required.

Example:

```text
e639e302b973be20b68bd8a92db4a4dade4b7cf4
```

After obtaining the SHA with either option, use that exact value in the consumer installation command below.

### 3. Update every consumer with npm

Run the following command from each consumer, replacing the placeholder with the new SHA:

```bash
npm install @franxis12/fhl-shared-ui@git+https://github.com/franxis12/FHL-shared-UI.git#<full-main-sha>
```

Required consumers:

- `web-FHL`
- `auth-FHL`
- `tenant-FHL`
- `owner-FHL`
- `admin-FHL`
- `handyman-FHL`
- `store-FHL`

`npm install` must update both `package.json` and `package-lock.json`. Do not edit only one file, copy a lock from another repository, or manually delete the lock.

### 4. Verify the exact dependency

In every consumer, confirm that:

- `package.json` contains the `git+https` URL and full SHA;
- `package-lock.json` resolves the same SHA;
- the locked and installed package versions match the new Shared UI version.

Then run:

```bash
npm ci
npm run build
```

Use `npm ci` in CI and Vercel so deployment validation starts from the committed lock instead of a locally reused dependency tree. If Vercel reports a missing Shared UI export after a dependency update, redeploy once without the previous build cache and confirm the committed SHA before changing application code.

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

The version in `package.json` communicates compatibility; the full `main` commit SHA makes the installed source immutable.

- Patch: backward-compatible fixes and additions.
- Minor: backward-compatible feature releases.
- Major: breaking component or package-contract changes.

Current starting point: version `0.1.0` at commit `e639e302b973be20b68bd8a92db4a4dade4b7cf4`.

Never reuse a version for different Shared UI content. Never point production consumers at a moving branch.

# License

Private repository.

This library is intended exclusively for FHL projects and is not published to npm.
