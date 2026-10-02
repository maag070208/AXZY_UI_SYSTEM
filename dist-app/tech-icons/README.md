# Tech icons

Local SVG assets used by the portfolio home page (`src/showcases/HomeShowcase.tsx`)
through `src/showcases/techIcons.ts`.

They are self-hosted on purpose: the page previously pointed `<img src>` at
`icongr.am` / `devicons.railway.app`, so every icon broke whenever those CDNs
were unreachable.

- Source: [Devicon](https://github.com/devicons/devicon) (MIT licensed).
- The brand logos themselves remain property of their respective owners and are
  used here only to identify the technologies.
- These files are dev sandbox assets: `public/` is not part of the published npm
  package (`package.json#files` ships `dist`, `src` and `snippets`).

To add a technology: drop `<slug>.svg` here and add the entry to
`src/showcases/techIcons.ts`.
