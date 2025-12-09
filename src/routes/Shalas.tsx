import { useState, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapLocationDot, faUsers } from '@fortawesome/free-solid-svg-icons';
import {
  Button,
  PageHero,
  ContentCard,
  SearchInput,
  ShalaMap,
  ShalaCard,
} from '../components/common';
import type { ShalaData } from '../components/common';
import { useSEO } from '../hooks';
import { siteConfig } from '../config/site';

// Set to true to show the full directory, false for coming soon page
const SHOW_DIRECTORY = false;

// Calculate distance between two coordinates in km (Haversine formula)
function getDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Coming Soon version of the page
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
        <div className="container-main max-w-2xl text-center">
          <p className="mx-auto max-w-md leading-relaxed text-white/80">
            {t('comingSoon.note')}
          </p>
          <div className="mt-8">
            <Button
              as="a"
              href={siteConfig.forms.shalaSubmission}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              size="lg"
            >
              <FontAwesomeIcon icon={faMapLocationDot} className="mr-2 h-4 w-4" />
              {t('comingSoon.button')}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

// Full directory version of the page
function ShalasDirectory() {
  const { t } = useTranslation('shalas');
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const shalaListRef = useRef<HTMLDivElement>(null);

  useSEO({ page: 'shalas' });

  const shalas = t('shalas', { returnObjects: true }) as ShalaData[];

  const filteredShalas = useMemo(() => {
    let result = shalas;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (shala) =>
          shala.name.toLowerCase().includes(query) ||
          shala.city.toLowerCase().includes(query) ||
          shala.country.toLowerCase().includes(query) ||
          shala.teachers.some((teacher) =>
            teacher.name.toLowerCase().includes(query)
          )
      );
    }

    // Sort by distance if user location is available
    if (userLocation) {
      result = [...result].sort((a, b) => {
        const distA = getDistance(userLocation.lat, userLocation.lng, a.lat, a.lng);
        const distB = getDistance(userLocation.lat, userLocation.lng, b.lat, b.lng);
        return distA - distB;
      });
    }

    return result;
  }, [shalas, searchQuery, userLocation]);

  // Calculate distances for display
  const shalasWithDistance = useMemo(() => {
    if (!userLocation) return filteredShalas.map((s) => ({ ...s, distance: null }));
    return filteredShalas.map((shala) => ({
      ...shala,
      distance: Math.round(getDistance(userLocation.lat, userLocation.lng, shala.lat, shala.lng)),
    }));
  }, [filteredShalas, userLocation]);

  const handleNearMe = (coords: { lat: number; lng: number }) => {
    setUserLocation(coords);
  };

  const handleShalaSelect = (shala: ShalaData) => {
    // Scroll to the shala card
    const element = document.getElementById(`shala-${shala.id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      element.classList.add('shala-highlight');
      setTimeout(() => {
        element.classList.remove('shala-highlight');
      }, 2000);
    }
  };

  return (
    <>
      <PageHero title={t('hero.title')} subtitle={t('hero.subtitle')}>
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder={t('search.placeholder')}
          className="mx-auto mt-8 max-w-md"
        />
      </PageHero>

      {/* Map */}
      <ShalaMap
        shalas={filteredShalas}
        onShalaSelect={handleShalaSelect}
        onNearMe={handleNearMe}
      />

      {/* Shala List */}
      <div ref={shalaListRef} className="bg-white py-8 sm:py-12">
        <div className="container-main max-w-4xl">
          {/* Results count */}
          <p className="text-subtle mb-6 text-sm">
            {t('results.count', { count: filteredShalas.length })}
            {searchQuery && ` for "${searchQuery}"`}
            {userLocation && ' · Sorted by distance'}
          </p>

          {filteredShalas.length === 0 ? (
            <ContentCard>
              <p className="text-body py-8 text-center">
                {t('results.noResults')}
              </p>
            </ContentCard>
          ) : (
            <div className="columns-1 gap-4 sm:columns-2">
              {shalasWithDistance.map((shala) => (
                <div key={shala.id} id={`shala-${shala.id}`} className="mb-4 break-inside-avoid transition-all duration-300">
                  <ShalaCard shala={shala} />
                  {shala.distance !== null && (
                    <p className="text-subtle mt-1 text-right text-xs">
                      ~{shala.distance.toLocaleString()} km away
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CTA */}
      <section className="gradient-cta py-16">
        <div className="container-main text-center">
          <FontAwesomeIcon icon={faUsers} className="h-10 w-10 text-white/80" />
          <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
            {t('cta.title')}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-white/80">{t('cta.text')}</p>
          <div className="mt-8">
            <Button
              as="a"
              href={siteConfig.forms.shalaSubmission}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              size="lg"
            >
              <FontAwesomeIcon icon={faMapLocationDot} className="mr-2 h-4 w-4" />
              {t('cta.button')}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

export default function Shalas() {
  return SHOW_DIRECTORY ? <ShalasDirectory /> : <ShalasComingSoon />;
}
