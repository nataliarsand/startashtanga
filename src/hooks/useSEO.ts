import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface SEOProps {
  page: 'home' | 'gettingStarted' | 'primarySeries' | 'glossary' | 'about' | 'contributing';
  canonical?: string;
  ogType?: 'website' | 'article';
}

const SITE_NAME = 'Start Ashtanga';
const BASE_URL = 'https://startashtanga.com';

export default function useSEO({ page, canonical, ogType = 'website' }: SEOProps) {
  const { t } = useTranslation('seo');
  const title = t(`${page}.title`);
  const description = t(`${page}.description`);

  useEffect(() => {
    // Title (max ~60 chars for Google)
    const fullTitle = title === 'Home' ? SITE_NAME : `${title} | ${SITE_NAME}`;
    document.title = fullTitle;

    // Meta description (max ~155 chars for Google)
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonical || `${BASE_URL}${window.location.pathname}`;

    // Open Graph tags
    const setMetaProperty = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    setMetaProperty('og:title', fullTitle);
    setMetaProperty('og:description', description);
    setMetaProperty('og:type', ogType);
    setMetaProperty('og:url', canonical || `${BASE_URL}${window.location.pathname}`);
    setMetaProperty('og:site_name', SITE_NAME);

    // Twitter Card tags
    const setMetaName = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    setMetaName('twitter:card', 'summary');
    setMetaName('twitter:title', fullTitle);
    setMetaName('twitter:description', description);
  }, [title, description, canonical, ogType]);
}
