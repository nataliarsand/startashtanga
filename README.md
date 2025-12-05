# Start Ashtanga

A free, community-driven guide to Ashtanga Yoga for beginners.

**[Visit the website →](https://www.startashtanga.org)**

## What is this?

Start Ashtanga is an open-source resource for anyone curious about Ashtanga Yoga (Mysore style). Whether you're considering your first class or want to deepen your practice, we aim to make traditional yoga accessible to everyone, everywhere.

## How to contribute

You don't need to be a developer to help! Here's how you can contribute:

### Share your knowledge
- **Improve content** - Fix typos, clarify explanations, or suggest better wording
- **Add translations** - Help make the site available in your language
- **Share your shala** - Know a great Mysore program? [Submit it here](https://forms.gle/c6iprH8YBpktKkYD7)

### Spread the word
Share Start Ashtanga with fellow practitioners, yoga studios, or anyone curious about Ashtanga.

### Help wanted
We're looking for volunteers to help with:
- Logo design
- Social media presence
- Resources library (books, articles, learning materials)
- Shala directory development

Interested? [Get in touch](https://tally.so/r/waGkrN) or open a GitHub issue.

---

## For developers

### Tech stack
- React + TypeScript + Vite
- Tailwind CSS
- React Router
- i18next (internationalization)

### Quick start

```bash
git clone https://github.com/nataliarsand/startashtanga.git
cd startashtanga
npm install
npm run dev
```

The site runs at `http://localhost:5173`.

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |
| `npm run format` | Format with Prettier |
| `npm run test` | Run tests |

### Project structure

```
src/
├── components/       # UI components
├── routes/           # Page components
├── i18n/locales/     # Translation files (JSON)
└── styles/           # Global styles & design tokens
```

### Adding content

All text content lives in `src/i18n/locales/en/*.json`. Edit these files to update content.

### Adding a new language

1. Copy `src/i18n/locales/en/` to `src/i18n/locales/[your-language]/`
2. Translate all JSON files
3. Register the language in `src/i18n/i18n.ts`

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed developer guidelines.

---

## License

MIT License - see [LICENSE](LICENSE)

## Links

- **Website**: [startashtanga.org](https://www.startashtanga.org)
- **GitHub**: [github.com/nataliarsand/startashtanga](https://github.com/nataliarsand/startashtanga)
- **Contact**: [Get in touch](https://tally.so/r/waGkrN)
