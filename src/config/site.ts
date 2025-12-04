/**
 * Site configuration
 * Values are loaded from environment variables with sensible defaults.
 */
export const siteConfig = {
  contact: {
    email: import.meta.env.VITE_CONTACT_EMAIL || 'hello@startashtanga.com',
    formUrl: import.meta.env.VITE_CONTACT_FORM_URL || 'https://forms.gle/a7FjzNYMpbRF8YyFA',
  },
  links: {
    github: import.meta.env.VITE_GITHUB_URL || 'https://github.com/nataliarsand/startashtanga',
  },
  url: import.meta.env.VITE_SITE_URL || 'https://startashtanga.com',
} as const;
