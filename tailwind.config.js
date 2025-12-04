/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // All design tokens are defined as CSS variables in src/styles/globals.css
      // This keeps the config minimal and makes theming easier
    },
  },
  plugins: [],
};
