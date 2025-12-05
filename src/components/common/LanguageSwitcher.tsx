import { useTranslation } from 'react-i18next';
import { languages, type LanguageCode } from '../../i18n/i18n';

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation('common');

  const handleLanguageChange = (langCode: LanguageCode) => {
    i18n.changeLanguage(langCode);
  };

  // If there's only one language, show it as a static badge
  if (languages.length === 1) {
    return (
      <span className="text-primary-500 text-xs font-medium uppercase">
        {languages[0].code}
      </span>
    );
  }

  // When multiple languages are available, show a dropdown
  return (
    <div className="relative">
      <label htmlFor="language-select" className="sr-only">
        {t('language')}
      </label>
      <select
        id="language-select"
        value={i18n.language}
        onChange={(e) => handleLanguageChange(e.target.value as LanguageCode)}
        className="border-primary-200 text-primary-700 hover:border-primary-300 focus:border-primary-500 focus:ring-primary-500 appearance-none rounded-md border bg-white py-2.5 pr-8 pl-3 text-sm focus:ring-1 focus:outline-none"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.nativeName}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
        <svg
          className="text-primary-400 h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </div>
    </div>
  );
}
