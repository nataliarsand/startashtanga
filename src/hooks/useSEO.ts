import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { siteConfig } from '../config/site';
import type seoEn from '../i18n/locales/en/seo.json';

type SEOPage = keyof typeof seoEn;

interface SEOProps {
  page: SEOPage;
  canonical?: string;
  ogType?: 'website' | 'article';
  /** Ask search engines to skip this page (e.g. 404). */
  noindex?: boolean;
}

function upsertMeta(selector: string, create: () => HTMLMetaElement) {
  let meta = document.head.querySelector<HTMLMetaElement>(selector);
  if (!meta) {
    meta = create();
    document.head.appendChild(meta);
  }
  return meta;
}

function setMetaProperty(property: string, content: string) {
  const meta = upsertMeta(`meta[property="${property}"]`, () => {
    const el = document.createElement('meta');
    el.setAttribute('property', property);
    return el;
  });
  meta.content = content;
}

function setMetaName(name: string, content: string) {
  const meta = upsertMeta(`meta[name="${name}"]`, () => {
    const el = document.createElement('meta');
    el.name = name;
    return el;
  });
  meta.content = content;
}

export default function useSEO({
  page,
  canonical,
  ogType = 'website',
  noindex = false,
}: SEOProps) {
  const { t } = useTranslation('seo');
  const title = t(`${page}.title`);
  const description = t(`${page}.description`);

  useEffect(() => {
    const fullTitle =
      page === 'home' ? siteConfig.name : `${title} | ${siteConfig.name}`;
    const url = canonical || `${siteConfig.url}${window.location.pathname}`;

    document.title = fullTitle;
    setMetaName('description', description);

    let canonicalLink = document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]'
    );
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = url;

    setMetaProperty('og:title', fullTitle);
    setMetaProperty('og:description', description);
    setMetaProperty('og:type', ogType);
    setMetaProperty('og:url', url);
    setMetaProperty('og:site_name', siteConfig.name);

    setMetaName('twitter:card', 'summary');
    setMetaName('twitter:title', fullTitle);
    setMetaName('twitter:description', description);

    if (noindex) {
      setMetaName('robots', 'noindex, nofollow');
      return () => setMetaName('robots', 'index, follow');
    }
  }, [page, title, description, canonical, ogType, noindex]);
}
