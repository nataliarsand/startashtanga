# Start Ashtanga

A community-driven, beginner-friendly resource about Ashtanga Yoga (Mysore style) and traditional yoga studies.

Whether you're curious about your first Mysore class or want to deepen your understanding of traditional yoga, this open-source project aims to make Ashtanga accessible to everyone, everywhere.

## Tech Stack

- **[Vite](https://vitejs.dev/)** - Fast build tool and dev server
- **[React](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[React Router](https://reactrouter.com/)** - Client-side routing
- **[i18next](https://www.i18next.com/)** + **[react-i18next](https://react.i18next.com/)** - Internationalization

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/USERNAME/startashtanga.git
cd startashtanga

# Install dependencies
npm install

# Start the development server
npm run dev
```

The site will be available at `http://localhost:5173`.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Run ESLint and fix issues |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check code formatting |
| `npm run typecheck` | Run TypeScript type checking |

## Project Structure

```
src/
├── main.tsx              # App entry point
├── App.tsx               # Root component with routing
├── components/
│   ├── layout/           # Layout components (Header, Footer, Layout)
│   └── common/           # Reusable UI components (Button, LanguageSwitcher)
├── routes/               # Page components
│   ├── Home.tsx
│   ├── About.tsx
│   └── GettingStarted.tsx
├── i18n/
│   ├── i18n.ts           # i18next configuration
│   └── locales/
│       └── en/           # English translations
│           ├── common.json
│           ├── nav.json
│           ├── home.json
│           ├── about.json
│           └── gettingStarted.json
└── styles/
    └── globals.css       # Global styles and CSS variables (design tokens)
```

## Styling with CSS Variables

All design tokens are defined as CSS custom properties in `src/styles/globals.css`. This makes it easy to maintain consistent styling and change the look of the entire site by updating values in one place.

### Available Design Tokens

- **Colors**: Primary palette, accent colors, semantic colors (success, warning, error)
- **Typography**: Font families, sizes, weights, line heights, letter spacing
- **Spacing**: Based on 4px grid system
- **Borders & Radius**: Border widths and corner radii
- **Shadows**: Elevation system from sm to xl
- **Transitions**: Duration and timing functions for animations
- **Z-index**: Layering scale for UI elements

### Example: Changing the Primary Color

To change the primary color palette, update the CSS variables in `src/styles/globals.css`:

```css
:root {
  --color-primary-500: 99 102 241;  /* Change to your brand color (RGB values) */
  --color-primary-600: 79 70 229;
  /* ... other shades */
}
```

## Localization (i18n)

The project uses i18next for internationalization, with English as the default language.

### Translation File Structure

Translations are organized by namespace:
- `common.json` - Shared strings (site title, buttons, footer)
- `nav.json` - Navigation labels
- `home.json` - Homepage content
- `about.json` - About page content
- `gettingStarted.json` - Getting started page content

### Using Translations in Components

```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation('home'); // Use 'home' namespace

  return <h1>{t('hero.title')}</h1>;
}
```

### Adding a New Language

1. Create a new folder under `src/i18n/locales/` (e.g., `pt-BR/`)

2. Copy all JSON files from `en/` to your new folder and translate them

3. Import the new translations in `src/i18n/i18n.ts`:

```ts
// Import new language files
import commonPtBR from './locales/pt-BR/common.json';
import navPtBR from './locales/pt-BR/nav.json';
// ... other files

// Add to languages array
export const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'pt-BR', name: 'Portuguese (Brazil)', nativeName: 'Português (Brasil)' },
] as const;

// Add to resources
const resources = {
  en: { /* ... */ },
  'pt-BR': {
    common: commonPtBR,
    nav: navPtBR,
    // ... other namespaces
  },
};
```

The language switcher will automatically show the new language.

## Adding a New Page/Route

1. Create a new component in `src/routes/`:

```tsx
// src/routes/NewPage.tsx
import { useTranslation } from 'react-i18next';

export default function NewPage() {
  const { t } = useTranslation('newPage');

  return (
    <div className="container-main py-12">
      <h1>{t('title')}</h1>
    </div>
  );
}
```

2. Export it from `src/routes/index.ts`:

```ts
export { default as NewPage } from './NewPage';
```

3. Add the route in `src/App.tsx`:

```tsx
import { NewPage } from './routes';

// Inside the Routes component:
<Route path="new-page" element={<NewPage />} />
```

4. Create translation files (e.g., `src/i18n/locales/en/newPage.json`)

5. Import and add the namespace in `src/i18n/i18n.ts`

## Contributing

We welcome contributions! This project is meant to be built by the global Ashtanga community.

### How to Contribute

1. **Fork** the repository
2. **Create a branch** for your feature (`git checkout -b feature/amazing-feature`)
3. **Make your changes** and commit them (`git commit -m 'Add amazing feature'`)
4. **Push** to your branch (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Contribution Ideas

- Translate content to your language
- Fix typos or improve existing content
- Add information about Ashtanga concepts
- Improve accessibility
- Add your local shala to the directory (coming soon)
- Report bugs or suggest features via Issues

### Code Style

- Run `npm run lint` before committing
- Run `npm run format` to auto-format code
- Follow existing patterns in the codebase
- Use translation keys for all user-facing text

## License

This project is open source and available under the [MIT License](LICENSE).

## Links

- Website: [startashtanga.com](https://startashtanga.com)
- GitHub: [github.com/USERNAME/startashtanga](https://github.com/USERNAME/startashtanga)
