# Wonder UI

A playful, kid-friendly React design system built with **TypeScript** and **CSS only** — no Tailwind, no CSS-in-JS.

Soft pastel colors, chunky 3D buttons, large friendly typography, and big tap targets make Wonder UI perfect for apps aimed at young users.

## Install

```bash
npm install @luckyluu/wonder-ui
```

## Quick Start

**Embedded in an existing app** (recommended — avoids CSS conflicts with your global styles):

```tsx
import { WonderUIProvider, Button, Card, Heading } from '@luckyluu/wonder-ui';
import '@luckyluu/wonder-ui/styles.css';

function App() {
  return (
    <WonderUIProvider>
      <Card variant="sky" header="Hello!">
        <Heading level="h2">Welcome to Wonder UI</Heading>
        <Button variant="primary">Let's Go!</Button>
      </Card>
    </WonderUIProvider>
  );
}
```

**Greenfield app** (full-page Wonder UI look, including base resets):

```tsx
import { Button, Card, Heading } from '@luckyluu/wonder-ui';
import '@luckyluu/wonder-ui/reset.css';
import '@luckyluu/wonder-ui/styles.css';

function App() {
  return (
    <Card variant="sky" header="Hello!">
      <Heading level="h2">Welcome to Wonder UI</Heading>
      <Button variant="primary">Let's Go!</Button>
    </Card>
  );
}
```

> **Note:** Load the [Nunito](https://fonts.google.com/specimen/Nunito) font in your app for the intended typography:

```html
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet" />
```

## CSS Imports

| Import | Contents |
|--------|----------|
| `@luckyluu/wonder-ui/styles.css` | Design tokens, component styles, and scoped base (`.wonder-ui`) |
| `@luckyluu/wonder-ui/tokens.css` | Design tokens only — for theme overrides without component CSS |
| `@luckyluu/wonder-ui/reset.css` | Optional full-page reset (`body`, margins, element defaults) |

Import **either** `styles.css` explicitly (recommended for import-order control) **or** rely on the JS entry side-effect — not both.

Load Wonder UI CSS **before** your global CSS if your app styles should win; **after** if Wonder UI should win.

### Migrating to 0.3.0

Global resets are no longer included in `styles.css` by default. If your app relied on Wonder UI zeroing margins or styling `body`, import `reset.css` explicitly or use your own reset.

## Components

| Component | Description |
|-----------|-------------|
| `Button` | 3D press buttons: primary (sky blue), secondary (mint), accent (coral), ghost |
| `Input` | Text field with recessed inset shadow, label, helper text, and error state |
| `Card` | Soft floating surface with pastel variants: sky, butter, blush, mint |
| `Badge` | Raised pill-shaped status labels |
| `Alert` | Info, success, warning, and error banners |
| `Heading` | Semantic headings (h1–h4) |
| `Text` | Body copy with muted variant |
| `Checkbox` | 3D checkbox with large tap area |
| `Spinner` | Animated loading indicator |

## Design Tokens

All visual decisions live in CSS custom properties (`src/styles/tokens.css`):

- **Colors** — sky blue primary, mint secondary, coral accent, warm off-white background
- **Card tints** — sky, butter, blush, mint pastels
- **3D depth** — `box-shadow` bottom edges (3–6px) for chunky button press effect
- **Typography** — Nunito, 1rem–2.5rem scale
- **Shape** — 16px–32px border radii, pill buttons
- **Motion** — bouncy press transitions on transform + box-shadow

## Local Development

```bash
npm install
npm run dev        # docs site at http://localhost:5173
npm run build      # build npm library → dist/
npm run build:docs # build docs → docs-dist/
npm run typecheck  # TypeScript check
```

## Documentation

Live docs: [luubinhan.github.io/wonder-ui](https://luubinhan.github.io/wonder-ui/)

Pushes to `main` automatically build and deploy the docs site to GitHub Pages.

## Publishing

Releases are automated via GitHub Actions.

### Release flow

```bash
# 1. Bump version in package.json
# 2. Commit and push to main (docs auto-deploy)
git tag v0.2.0
git push origin v0.2.0   # triggers npm publish
```

The tag must match the version in `package.json` (e.g. tag `v0.2.0` for version `0.2.0`).

### Manual publish (fallback)

```bash
npm run build
npm publish --access public
```

## License

MIT
