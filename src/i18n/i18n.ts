import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import commonEn from './locales/en/common.json';
import navEn from './locales/en/nav.json';
import homeEn from './locales/en/home.json';
import aboutEn from './locales/en/about.json';
import contributingEn from './locales/en/contributing.json';
import gettingStartedEn from './locales/en/gettingStarted.json';
import glossaryEn from './locales/en/glossary.json';
import primarySeriesEn from './locales/en/primarySeries.json';
import seoEn from './locales/en/seo.json';

// Define available languages
export const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  // Add new languages here, e.g.:
  // { code: 'pt-BR', name: 'Portuguese (Brazil)', nativeName: 'Português (Brasil)' },
] as const;

export type LanguageCode = (typeof languages)[number]['code'];

// Resources object containing all translations
const resources = {
  en: {
    common: commonEn,
    nav: navEn,
    home: homeEn,
    about: aboutEn,
    contributing: contributingEn,
    gettingStarted: gettingStartedEn,
    glossary: glossaryEn,
    primarySeries: primarySeriesEn,
    seo: seoEn,
  },
  // Add new language resources here, e.g.:
  // 'pt-BR': {
  //   common: commonPtBR,
  //   nav: navPtBR,
  //   ...
  // },
};

i18n
  // Detect user language from browser
  .use(LanguageDetector)
  // Pass i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    resources,
    fallbackLng: 'en',
    defaultNS: 'common',
    ns: ['common', 'nav', 'home', 'about', 'contributing', 'gettingStarted', 'glossary', 'primarySeries', 'seo'],

    // Language detection options
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'startashtanga-lang',
    },

    interpolation: {
      escapeValue: false, // React already escapes values
    },

    // Debug mode - set to true during development if needed
    debug: false,
  });

export default i18n;
