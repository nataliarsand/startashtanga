# Contributing to Start Ashtanga

Thank you for your interest in contributing to Start Ashtanga! This project is built by and for the global Ashtanga yoga community. We welcome contributions of all kinds, from code to content to translations.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Ways to Contribute](#ways-to-contribute)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Pull Request Process](#pull-request-process)
- [Style Guidelines](#style-guidelines)
- [Adding Translations](#adding-translations)
- [Questions?](#questions)

## Code of Conduct

This project follows our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to uphold a welcoming and inclusive environment for everyone.

## Ways to Contribute

### Content Contributions
- Fix typos or improve existing content
- Add information about Ashtanga yoga concepts
- Improve explanations for beginners
- Suggest new topics or sections

### Code Contributions
- Fix bugs or issues
- Improve accessibility
- Enhance performance
- Add new features

### Translation Contributions
- Translate content to your language
- Review existing translations
- Improve translation quality

### Community Contributions
- Report bugs via GitHub Issues
- Suggest features or improvements
- Help answer questions from other contributors
- Add your local shala to the directory (coming soon)

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+
- Git

### Setup

1. **Fork the repository** on GitHub

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/startashtanga.git
   cd startashtanga
   ```

3. **Add the upstream remote**
   ```bash
   git remote add upstream https://github.com/nataliarsand/startashtanga.git
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

The site will be available at `http://localhost:5173`.

## Development Workflow

### Creating a Branch

Always create a new branch for your work:

```bash
# Update your local main branch
git checkout main
git pull upstream main

# Create a new branch
git checkout -b feature/your-feature-name
```

Use descriptive branch names:
- `feature/add-glossary-term` - for new features
- `fix/typo-in-about-page` - for bug fixes
- `docs/improve-readme` - for documentation
- `i18n/add-spanish-translation` - for translations

### Making Changes

1. Make your changes in small, focused commits
2. Write clear commit messages
3. Test your changes locally

### Running Quality Checks

Before submitting, run these commands:

```bash
# Check for lint errors
npm run lint

# Auto-fix lint issues
npm run lint:fix

# Format code
npm run format

# Type check
npm run typecheck

# Build to check for errors
npm run build
```

## Pull Request Process

1. **Update your branch** with the latest changes from upstream:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Push your branch** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

3. **Open a Pull Request** on GitHub:
   - Use a clear, descriptive title
   - Fill out the PR template
   - Link any related issues
   - Add screenshots for UI changes

4. **Address review feedback** promptly

5. **Celebrate** when your PR is merged! 🎉

### PR Requirements

- All quality checks must pass
- At least one approval from a maintainer
- No merge conflicts with main
- Commits should be clean and focused

## Style Guidelines

### Code Style

- **TypeScript**: Follow existing patterns in the codebase
- **React**: Use functional components with hooks
- **Formatting**: Prettier handles this automatically
- **Linting**: ESLint enforces code quality

### CSS/Styling

- Use **Tailwind CSS** utility classes
- Use design tokens from `src/styles/globals.css`
- Avoid inline `style={{}}` props - use Tailwind classes instead
- Follow mobile-first responsive design

### Content Style

- Write in clear, accessible language
- Avoid jargon unless it's a defined term in the glossary
- Be inclusive and welcoming to beginners
- Use gender-neutral language
- Use translation keys for all user-facing text

## Adding Translations

We'd love help translating Start Ashtanga to more languages!

### Steps to Add a New Language

1. Create a new folder: `src/i18n/locales/[language-code]/`

2. Copy all JSON files from `src/i18n/locales/en/`

3. Translate the content in each JSON file

4. Update `src/i18n/i18n.ts`:
   ```typescript
   // Import new language files
   import commonEs from './locales/es/common.json';
   // ... other imports

   // Add to languages array
   export const languages = [
     { code: 'en', name: 'English', nativeName: 'English' },
     { code: 'es', name: 'Spanish', nativeName: 'Español' },
   ] as const;

   // Add to resources
   const resources = {
     en: { /* ... */ },
     es: {
       common: commonEs,
       // ... other namespaces
     },
   };
   ```

5. Test the language switcher works correctly

### Translation Guidelines

- Keep the same JSON structure as English
- Preserve any HTML tags or variables (e.g., `{{count}}`)
- Sanskrit terms should generally remain in Sanskrit
- Add the native name of the language in `nativeName`

## Questions?

- **General questions**: Open a GitHub Discussion
- **Bug reports**: Open a GitHub Issue
- **Security issues**: Email namaste@startashtanga.com directly

---

Thank you for helping make Ashtanga yoga accessible to everyone! 🙏
