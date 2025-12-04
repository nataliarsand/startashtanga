import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPen,
  faMapLocationDot,
  faLightbulb,
  faShareNodes,
  faCodeBranch,
  faHandshake,
  faCheck,
  faCode,
} from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { Button, PageHero, ContentCard, ChecklistItem, SectionNav } from '../components/common';
import { siteConfig } from '../config/site';

export default function Contributing() {
  const { t } = useTranslation('contributing');

  const ways = t('ways.items', { returnObjects: true }) as Array<{
    title: string;
    description: string;
    icon: string;
  }>;

  const wanted = t('wanted.items', { returnObjects: true }) as Array<{
    title: string;
    description: string;
    icon: string;
  }>;

  const features = t('technical.features', { returnObjects: true }) as string[];

  const waysIconMap: Record<string, typeof faPen> = {
    pen: faPen,
    map: faMapLocationDot,
    lightbulb: faLightbulb,
    share: faShareNodes,
    code: faCode,
  };

  const navItems = [
    { id: 'intro', label: t('nav.intro') },
    { id: 'ways', label: t('nav.ways') },
    { id: 'shala', label: t('nav.shala') },
    { id: 'wanted', label: t('nav.wanted') },
    { id: 'technical', label: t('nav.technical') },
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
          {/* Intro */}
          <section id="intro">
            <h2 className="text-heading text-2xl font-bold sm:text-3xl">
              {t('intro.title')}
            </h2>
            <p className="text-body mt-4 text-lg leading-relaxed">
              {t('intro.text')}
            </p>
          </section>

          {/* Divider */}
          <hr className="border-default my-12" />

          {/* Ways to contribute */}
          <section id="ways">
            <h2 className="text-heading text-2xl font-bold sm:text-3xl">
              {t('ways.title')}
            </h2>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {ways.map((way, index) => (
                <ContentCard key={index}>
                  <div className="flex items-start gap-4">
                    <div className="bg-accent flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full">
                      <FontAwesomeIcon
                        icon={waysIconMap[way.icon] || faPen}
                        className="h-5 w-5 text-white"
                      />
                    </div>
                    <div>
                      <h3 className="text-heading text-lg font-semibold">
                        {way.title}
                      </h3>
                      <p className="text-body mt-1 text-sm">
                        {way.description}
                      </p>
                    </div>
                  </div>
                </ContentCard>
              ))}
            </div>
          </section>

          {/* Divider */}
          <hr className="border-default my-12" />

          {/* Share your shala */}
          <section id="shala">
            <h2 className="text-heading text-2xl font-bold sm:text-3xl">
              {t('shala.title')}
            </h2>
            <p className="text-body mt-4 leading-relaxed">
              {t('shala.text')}
            </p>

            <ContentCard variant="featured" className="mt-6">
              <div className="flex items-start gap-4">
                <div className="bg-accent flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full">
                  <FontAwesomeIcon
                    icon={faMapLocationDot}
                    className="h-5 w-5 text-white"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-body">
                    {t('shala.note')}
                  </p>
                  <p className="text-subtle mt-3 text-sm italic">
                    {t('shala.coming')}
                  </p>
                  <div className="mt-4">
                    <Button
                      as="a"
                      href="https://forms.gle/c6iprH8YBpktKkYD7"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon icon={faMapLocationDot} className="mr-2 h-4 w-4" />
                      {t('shala.button')}
                    </Button>
                  </div>
                </div>
              </div>
            </ContentCard>
          </section>

          {/* Divider */}
          <hr className="border-default my-12" />

          {/* Help wanted */}
          <section id="wanted">
            <h2 className="text-heading text-2xl font-bold sm:text-3xl">
              {t('wanted.title')}
            </h2>
            <p className="text-body mt-4 leading-relaxed">
              {t('wanted.text')}
            </p>

            <div className="mt-6 space-y-1">
              {wanted.map((item, index) => (
                <ChecklistItem
                  key={index}
                  title={item.title}
                  description={item.description}
                />
              ))}
            </div>
          </section>

          {/* Divider */}
          <hr className="border-default my-12" />

          {/* Technical / For developers */}
          <section id="technical">
            <h2 className="text-heading text-2xl font-bold sm:text-3xl">
              {t('technical.title')}
            </h2>
            <p className="text-body mt-4 leading-relaxed">
              {t('technical.text')}
            </p>

            <ContentCard variant="highlight" className="mt-6">
              <div className="flex items-start gap-4">
                <div className="bg-emphasis flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full">
                  <FontAwesomeIcon icon={faCodeBranch} className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <ul className="text-body space-y-2 text-sm">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faCheck} className="text-accent h-4 w-4" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Button
                      as="a"
                      href={siteConfig.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="sm"
                    >
                      <FontAwesomeIcon icon={faGithub} className="mr-2 h-4 w-4" />
                      {t('technical.githubButton')}
                    </Button>
                    <Button
                      as="a"
                      href={`${siteConfig.links.github}/blob/main/CONTRIBUTING.md`}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="outline"
                      size="sm"
                    >
                      {t('technical.guideButton')}
                    </Button>
                  </div>
                </div>
              </div>
            </ContentCard>
          </section>
        </div>
      </div>

      {/* CTA */}
      <section className="gradient-cta py-16">
        <div className="container-main text-center">
          <FontAwesomeIcon icon={faHandshake} className="h-10 w-10 text-white/80" />
          <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
            {t('cta.title')}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-white/80">{t('cta.text')}</p>
          <div className="mt-8">
            <Button
              as="a"
              href={siteConfig.contact.formUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              size="lg"
            >
              {t('cta.button')}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
