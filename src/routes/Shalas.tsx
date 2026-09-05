import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapLocationDot, faUsers } from '@fortawesome/free-solid-svg-icons';
import {
  Button,
  PageHero,
  ContentCard,
  SearchInput,
} from '../components/common';
// Imported directly (not via the barrel) so Leaflet stays out of the main bundle
import ShalaMap from '../components/common/ShalaMap';
import ShalaCard from '../components/common/ShalaCard';
import { useSEO } from '../hooks';
import { siteConfig } from '../config/site';
import { shalas } from '../data/shalas';
import { distanceKm } from '../lib/geo';
import type { Shala, Coordinates } from '../types/shala';

// Set to true to show the full directory, false for the coming-soon page
const SHOW_DIRECTORY = true;

const HIGHLIGHT_MS = 2000;

function SubmitShalaButton({ label }: { label: string }) {
  return (
    <Button
      as="a"
      href={siteConfig.forms.shalaSubmission}
      target="_blank"
      rel="noopener noreferrer"
      variant="secondary"
      size="lg"
    >
      <FontAwesomeIcon icon={faMapLocationDot} className="mr-2 h-4 w-4" />
      {label}
    </Button>
  );
}

function ShalasComingSoon() {
  const { t } = useTranslation('shalas');

  useSEO({ page: 'shalas' });

  return (
    <>
      <PageHero
        title={t('comingSoon.title')}
        subtitle={t('comingSoon.subtitle')}
      />

      <section className="gradient-cta py-16 sm:py-20">
        <div className="container-main text-center">
          <p className="mx-auto max-w-3xl leading-relaxed text-white/80">
            {t('comingSoon.note')}
          </p>
          <div className="mt-8">
            <SubmitShalaButton label={t('comingSoon.button')} />
          </div>
        </div>
      </section>
    </>
  );
}

function matchesQuery(shala: Shala, query: string) {
  return (
    shala.name.toLowerCase().includes(query) ||
    shala.city.toLowerCase().includes(query) ||
    shala.country.toLowerCase().includes(query) ||
    shala.teachers.some((teacher) => teacher.name.toLowerCase().includes(query))
  );
}

function ShalasDirectory() {
  const { t } = useTranslation('shalas');
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);

  useSEO({ page: 'shalas' });

  const results = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const matched = query
      ? shalas.filter((shala) => matchesQuery(shala, query))
      : shalas;

    const withDistance = matched.map((shala) => ({
      shala,
      distanceKm: userLocation ? distanceKm(userLocation, shala) : null,
    }));

    if (userLocation) {
      withDistance.sort((a, b) => (a.distanceKm ?? 0) - (b.distanceKm ?? 0));
    }
    return withDistance;
  }, [searchQuery, userLocation]);

  const visibleShalas = useMemo(() => results.map((r) => r.shala), [results]);

  const handleShalaSelect = (shala: Shala) => {
    const element = document.getElementById(`shala-${shala.id}`);
    if (!element) return;
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    element.classList.add('shala-highlight');
    setTimeout(() => element.classList.remove('shala-highlight'), HIGHLIGHT_MS);
  };

  return (
    <>
      <PageHero title={t('hero.title')} subtitle={t('hero.subtitle')}>
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder={t('search.placeholder')}
          className="mx-auto mt-8 max-w-3xl"
        />
      </PageHero>

      <ShalaMap
        shalas={visibleShalas}
        onShalaSelect={handleShalaSelect}
        onNearMe={setUserLocation}
      />

      <div className="bg-white py-8 sm:py-12">
        <div className="container-main max-w-4xl">
          <p className="text-subtle mb-6 text-sm">
            {t('results.count', { count: results.length })}
            {searchQuery && ` ${t('results.forQuery', { query: searchQuery })}`}
            {userLocation && ` · ${t('results.sortedByDistance')}`}
          </p>

          {results.length === 0 ? (
            <ContentCard>
              <p className="text-body py-8 text-center">
                {t('results.noResults')}
              </p>
            </ContentCard>
          ) : (
            <div className="columns-1 gap-4 sm:columns-2">
              {results.map(({ shala, distanceKm: km }) => (
                <div
                  key={shala.id}
                  id={`shala-${shala.id}`}
                  className="mb-4 break-inside-avoid transition-all duration-300"
                >
                  <ShalaCard shala={shala} />
                  {km !== null && (
                    <p className="text-subtle mt-1 text-right text-xs">
                      {t('results.distance', {
                        km: Math.round(km).toLocaleString(),
                      })}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <section className="gradient-cta py-16">
        <div className="container-main text-center">
          <FontAwesomeIcon icon={faUsers} className="h-10 w-10 text-white/80" />
          <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
            {t('cta.title')}
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-white/80">
            {t('cta.text')}
          </p>
          <div className="mt-8">
            <SubmitShalaButton label={t('cta.button')} />
          </div>
        </div>
      </section>
    </>
  );
}

export default function Shalas() {
  return SHOW_DIRECTORY ? <ShalasDirectory /> : <ShalasComingSoon />;
}
