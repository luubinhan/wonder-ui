# Wonder UI

A playful, kid-friendly React design system built with **TypeScript** and **CSS only** — no Tailwind, no CSS-in-JS.

Soft pastel colors, chunky 3D buttons, large friendly typography, and big tap targets make Wonder UI perfect for apps aimed at young users.

## Install

```bash
npm install @wonder-ui/react
```

## Quick Start

```tsx
import { Button, Card, Heading } from '@wonder-ui/react';
import '@wonder-ui/react/styles.css';

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

## GitHub Pages

The docs site deploys automatically on push to `main`.

**One-time setup:**

1. Go to **Settings → Pages** in your GitHub repo
2. Set **Source** to **GitHub Actions**
3. Push to `main` — the workflow builds and deploys to `https://<user>.github.io/wonder-ui/`

## Publishing to npm

```bash
npm run build
npm publish --access public
```

## License

MIT
