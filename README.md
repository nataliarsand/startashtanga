# Start Ashtanga

A free, community-driven guide to Ashtanga Yoga for beginners.

**<a href="https://www.startashtanga.org" target="_blank">Visit the website →</a>**

## What is this?

An open-source resource for anyone curious about Ashtanga Yoga (Mysore style). We aim to make traditional yoga accessible to everyone, everywhere.

## Contributing

You don't need to be a developer to help!

- **Improve content** - Fix typos, clarify explanations, suggest better wording
- **Add translations** - Help make the site available in your language
- **Share your shala** - Know a great Mysore program? <a href="https://forms.gle/c6iprH8YBpktKkYD7" target="_blank">Submit it here</a>
- **Spread the word** - Share with fellow practitioners and yoga studios

We're also looking for help with logo design, social media, and building a resources library.

<a href="https://forms.gle/a7FjzNYMpbRF8YyFA" target="_blank">Get in touch</a> or open a GitHub issue.

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

---

## Development

**Tech:** React 19, TypeScript, Vite, Tailwind CSS v4, i18next, React Leaflet. Static site deployed to Cloudflare Pages.

Requires Node 20.19+ (see `.nvmrc`).

```bash
git clone https://github.com/nataliarsand/startashtanga.git
cd startashtanga
npm install
npm run dev
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run check` | Lint, format check, typecheck and tests (what CI runs) |
| `npm run build` | Production build into `dist/` |
| `npm run format` | Format with Prettier |

```
src/
  components/   Reusable UI (common/) and page chrome (layout/)
  routes/       One file per page
  data/         Shala directory (shalas.json) and its validation test
  i18n/         i18next setup and locales/<lang>/*.json
  styles/       globals.css: design tokens and base styles
  config/       Site name, URL and external links
  hooks/ lib/ types/
```

---

## License

[MIT](LICENSE)
