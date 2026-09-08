# General Relativity, From the Inside Out

**[Read the HTML book](https://neovand.github.io/general-relativity/)** ·
[Visual atlas](https://neovand.github.io/general-relativity/figure-atlas.html) ·
[Editorial comparison](docs/reference-comparison.md)

A complete illustrated book that starts with basic calculus and linear algebra.
Chapter 0 supplies the mechanics and multivariable-calculus bridge. The main
sequence develops special relativity, tensors, geometry, Einstein's equation,
the action, and observable predictions. Four optional deeper trails cover
initial data, tetrads, focusing and thermodynamics, and effective field theory.

The HTML edition contains 25 chapters (0–24), five appendices, 40 original SVG
figures, 30 original solved exercises plus three new calculations, chapter
checkpoints, three interactive experiments, and four documented public-domain
historical images. Equations are rendered at build time as HTML and MathML;
math fonts and all required assets are hosted with the book.

## Edit and build

Requirements: Node.js 24 and Python 3.12 or later. No TeX installation is needed.

```sh
npm ci
npm run build
npm test
npm run serve
```

Open [the local reading edition](http://localhost:4173/). The output is `site/`,
which is ignored by Git. All URL paths are relative so the site works under
the repository's GitHub Pages subpath.

| File | Purpose |
| --- | --- |
| `book.md` | Canonical complete manuscript, including all new sections. |
| `content/guides.json` | Chapter questions, prerequisite guidance, takeaways, and checkpoints. |
| `content/credits.md` | Published edition notes and image credits. |
| `scripts/build-site.mjs` | Static HTML generation, equation rendering, navigation, and search index. |
| `scripts/figures.py` | Reproducible SVG diagrams and placement manifest. |
| `web/styles.css`, `web/app.js` | Reading layout, accessibility, and experiments. |
| `assets/history/manifest.json` | Historical-image provenance, rights rationale, and hashes. |
| `docs/reference-comparison.md` | Coverage comparison and editorial decisions. |
| `docs/visual-review.md` | Diagram inventory, inspection process, and corrections. |
| `.github/workflows/pages.yml` | Build, checks, and GitHub Pages deployment. |

## Browser and figure checks

Keep the local server running, then run:

```sh
npx playwright install chromium
npm run test:browser
npm run test:figures
```

On macOS the checks use installed Google Chrome when available; elsewhere they
use Playwright's Chromium. Reports and screenshots are written to ignored `qa/`.
Checks cover every HTML page at desktop and mobile widths, equation errors,
local links, image loading, search, chapter anchors, reading controls,
interactive numerical examples, and all SVG label bounds and intersections.
They support—but do not replace—human visual and mathematical review.

## Publishing

The repository uses **GitHub Actions** as its Pages source. A push to `main`
builds the HTML, runs the checks, uploads the static artifact, and deploys it
with the official GitHub Pages actions. Pull requests run the same build and
checks without publishing. Visual inspection evidence is retained as a workflow
artifact. The publish job has only Pages and OIDC permissions; build jobs have
read-only repository access.

## Earlier print edition

`book.tex`, `typesetting/`, `scripts/build.py`, `scripts/prepare.py`, and the
PDF under `dist/` are retained as historical files. **They are not the current
edition and have not been regenerated with these revisions.** The requested
publication format and canonical reading experience are HTML.

## Listen and study with a tutor

The Svelte reader supports ElevenLabs chapter narration, GPT Realtime 2.1 voice conversations, and a GPT-5.6 Terra/Sol text tutor using your own API keys. Equations and figures receive separate spoken explanations, and the tutor can navigate to and highlight passages across chapters. Open Listen or Ask, then Connections. See [the companion guide](docs/study-companion.md) for setup, storage behavior, architecture, and verification.
