import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../common/LanguageSwitcher';

export default function Header() {
  const { t } = useTranslation('nav');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: t('home') },
    { to: '/getting-started', label: t('gettingStarted') },
    { to: '/glossary', label: t('glossary') },
    { to: '/about', label: t('about') },
  ];

  return (
    <header className="border-b bg-white" style={{ borderColor: '#DCC8AF' }}>
      <nav
        className="container-main flex items-center justify-between py-4"
        aria-label="Main navigation"
      >
        {/* Logo / Site name */}
        <Link
          to="/"
          className="text-xl font-semibold transition-colors"
          style={{ color: '#4F3130' }}
        >
          Start Ashtanga
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors ${
                      isActive ? 'font-semibold' : 'hover:opacity-80'
                    }`
                  }
                  style={({ isActive }) => ({
                    color: isActive ? '#4F3130' : '#753742',
                  })}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <LanguageSwitcher />
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 md:hidden"
          style={{ color: '#753742' }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileMenuOpen ? (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="border-t md:hidden"
          style={{ borderColor: '#DCC8AF' }}
        >
          <ul className="container-main space-y-1 py-4">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `block rounded-md px-3 py-2 text-base font-medium ${
                      isActive ? 'font-semibold' : ''
                    }`
                  }
                  style={({ isActive }) => ({
                    color: isActive ? '#4F3130' : '#753742',
                    backgroundColor: isActive ? '#F5EDDF' : 'transparent',
                  })}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li className="px-3 pt-2">
              <LanguageSwitcher />
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
