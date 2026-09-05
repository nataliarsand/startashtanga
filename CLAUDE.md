# Start Ashtanga

Static React site (Vite, TypeScript, Tailwind v4, i18next). Deployed to Cloudflare Pages from `dist/`.

Read `CONTRIBUTING.md` first; it holds the workflow and style rules. The points below are the ones most often missed.

- `npm run check` must pass before a commit is done (lint, Prettier, `tsc -b`, tests).
- Design tokens live only in `src/styles/globals.css` (`@theme`). Components use the semantic names (`bg-surface`, `text-heading`, `border-line`). No hex values or palette names in components.
- Base styles in `globals.css` use plain CSS properties, not `@apply`: utilities like `leading-*` set inherited `--tw-*` variables that leak into every child.
- All user-facing text goes through i18next keys in `src/i18n/locales/<lang>/`. `src/i18n/locales.test.ts` enforces key parity across locales.
- Shala entries are data, not copy: `src/data/shalas.json`, validated by `src/data/shalas.test.ts`.
- `src/config/site.ts` is the only place for the site name, URL and external links.
- Anything that imports Leaflet must be reached only from the lazy `Shalas` route (see `App.tsx`), never from the `components/common` barrel.
- No em dashes in copy.
