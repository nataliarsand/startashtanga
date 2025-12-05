import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart,
  faBookOpen,
  faUsers,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { Button, PageHero, ContentCard, SectionNav, DonateButton } from '../components/common';
import { siteConfig } from '../config/site';
import { useSEO } from '../hooks';

export default function About() {
  const { t } = useTranslation('about');

  useSEO({ page: 'about' });

  const values = t('values.items', { returnObjects: true }) as Array<{
    title: string;
    description: string;
    icon: string;
  }>;

  const iconMap: Record<string, typeof faHeart> = {
    heart: faHeart,
    book: faBookOpen,
    users: faUsers,
  };

  const navItems = [
    { id: 'mission', label: t('nav.mission') },
    { id: 'approach', label: t('nav.approach') },
    { id: 'values', label: t('nav.values') },
    { id: 'support', label: t('nav.support') },
    { id: 'contact', label: t('nav.contact') },
  ];

  return (
    <>
      <PageHero
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
      >
        <SectionNav items={navItems} />
      </PageHero>

      {/* Content */}
      <div className="bg-white py-16 sm:py-20">
        <div className="container-main max-w-3xl">
          {/* Mission */}
          <section id="mission">
            <h2 className="text-heading text-2xl font-bold sm:text-3xl">
              {t('mission.title')}
            </h2>
            <p className="text-body mt-4 text-lg leading-relaxed">
              {t('mission.text')}
            </p>
          </section>

          {/* Divider */}
          <hr className="border-default my-12" />

          {/* Approach */}
          <section id="approach">
            <h2 className="text-heading text-2xl font-bold sm:text-3xl">
              {t('approach.title')}
            </h2>
            <p className="text-body mt-4 leading-relaxed">
              {t('approach.text')}
            </p>
          </section>

          {/* Divider */}
          <hr className="border-default my-12" />

          {/* Values */}
          <section id="values">
            <h2 className="text-heading text-2xl font-bold sm:text-3xl">
              {t('values.title')}
            </h2>

            <div className="mt-8 space-y-4">
              {values.map((value, index) => (
                <ContentCard key={index}>
                  <div className="flex items-start gap-4">
                    <div className="bg-accent flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full">
                      <FontAwesomeIcon
                        icon={iconMap[value.icon] || faHeart}
                        className="h-5 w-5 text-white"
                      />
                    </div>
                    <div>
                      <h3 className="text-heading text-lg font-semibold">
                        {value.title}
                      </h3>
                      <p className="text-body mt-1">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </ContentCard>
              ))}
            </div>
          </section>

          {/* Divider */}
          <hr className="border-default my-12" />

          {/* Support */}
          <section id="support">
            <h2 className="text-heading text-2xl font-bold sm:text-3xl">
              {t('support.title')}
            </h2>
            <p className="text-body mt-4 leading-relaxed">
              {t('support.text')}
            </p>

            <div className="mt-6">
              <DonateButton size="lg" />
            </div>
          </section>

          {/* Divider */}
          <hr className="border-default my-12" />

          {/* Contact */}
          <section id="contact">
            <h2 className="text-heading text-2xl font-bold sm:text-3xl">
              {t('contact.title')}
            </h2>
            <p className="text-body mt-4">
              {t('contact.text')}
            </p>

            <div className="mt-6">
              <Button
                as="a"
                href={siteConfig.contact.formUrl}
                target="_blank"
                rel="noopener noreferrer"
                trackingName="about_contact_form"
              >
                {t('contact.formButton')}
              </Button>
            </div>
          </section>
        </div>
      </div>

      {/* CTA - Contributing */}
      <section className="gradient-cta py-16">
        <div className="container-main text-center">
          <FontAwesomeIcon icon={faUsers} className="h-10 w-10 text-white/80" />
          <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
            {t('cta.title')}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-white/80">{t('cta.text')}</p>
          <div className="mt-8">
            <Button as="link" to="/contribute" variant="secondary" size="lg" trackingName="about_cta_contribute">
              {t('cta.button')}
              <FontAwesomeIcon icon={faArrowRight} className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
