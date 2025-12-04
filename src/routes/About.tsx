import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart,
  faBookOpen,
  faUsers,
  faCodeBranch,
  faHandshake,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { Button, PageHero, ContentCard, CalloutBox } from '../components/common';

export default function About() {
  const { t } = useTranslation('about');

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

  return (
    <>
      <PageHero
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
      />

      {/* Content */}
      <div className="bg-white py-16 sm:py-20">
        <div className="container-main max-w-3xl">
          {/* Mission */}
          <section>
            <h2
              className="text-2xl font-bold sm:text-3xl"
              style={{ color: '#4F3130' }}
            >
              {t('mission.title')}
            </h2>
            <p className="mt-4 text-lg leading-relaxed" style={{ color: '#753742' }}>
              {t('mission.text')}
            </p>
          </section>

          {/* Divider */}
          <hr className="my-12" style={{ borderColor: '#DCC8AF' }} />

          {/* Values */}
          <section>
            <h2
              className="text-2xl font-bold sm:text-3xl"
              style={{ color: '#4F3130' }}
            >
              {t('values.title')}
            </h2>

            <div className="mt-8 space-y-4">
              {values.map((value, index) => (
                <ContentCard key={index}>
                  <div className="flex items-start gap-4">
                    <div
                      className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: '#AA5042' }}
                    >
                      <FontAwesomeIcon
                        icon={iconMap[value.icon] || faHeart}
                        className="h-5 w-5 text-white"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold" style={{ color: '#4F3130' }}>
                        {value.title}
                      </h3>
                      <p className="mt-1" style={{ color: '#753742' }}>
                        {value.description}
                      </p>
                    </div>
                  </div>
                </ContentCard>
              ))}
            </div>
          </section>

          {/* Divider */}
          <hr className="my-12" style={{ borderColor: '#DCC8AF' }} />

          {/* Open Source */}
          <section>
            <h2
              className="text-2xl font-bold sm:text-3xl"
              style={{ color: '#4F3130' }}
            >
              {t('openSource.title')}
            </h2>
            <p className="mt-4 leading-relaxed" style={{ color: '#753742' }}>
              {t('openSource.text')}
            </p>

            <div className="mt-6">
              <CalloutBox icon={faHandshake} title={t('openSource.contribute.title')} variant="info">
                <p>{t('openSource.contribute.text')}</p>
              </CalloutBox>
            </div>

            <ContentCard className="mt-6">
              <div className="flex items-start gap-4">
                <div
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: '#4F3130' }}
                >
                  <FontAwesomeIcon icon={faCodeBranch} className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold" style={{ color: '#4F3130' }}>
                    {t('openSource.technical.title')}
                  </h3>
                  <p className="mt-1 text-sm" style={{ color: '#753742' }}>
                    {t('openSource.technical.text')}
                  </p>
                  <div className="mt-3">
                    <Button
                      as="a"
                      href="https://github.com/natalifernandez/startashtanga"
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="outline"
                      size="sm"
                    >
                      <FontAwesomeIcon icon={faGithub} className="mr-2 h-4 w-4" />
                      {t('openSource.githubButton')}
                    </Button>
                  </div>
                </div>
              </div>
            </ContentCard>
          </section>

          {/* Divider */}
          <hr className="my-12" style={{ borderColor: '#DCC8AF' }} />

          {/* Contact */}
          <section>
            <h2
              className="text-2xl font-bold sm:text-3xl"
              style={{ color: '#4F3130' }}
            >
              {t('contact.title')}
            </h2>
            <p className="mt-4" style={{ color: '#753742' }}>
              {t('contact.text')}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                as="a"
                href="mailto:hello@startashtanga.com"
              >
                <FontAwesomeIcon icon={faEnvelope} className="mr-2 h-4 w-4" />
                {t('contact.emailButton')}
              </Button>
              <Button
                as="a"
                href="https://forms.gle/YOUR_FORM_ID"
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
              >
                {t('contact.formButton')}
              </Button>
            </div>
          </section>
        </div>
      </div>

      {/* CTA */}
      <section
        className="py-16"
        style={{
          background: 'linear-gradient(135deg, #AA5042 0%, #753742 100%)',
        }}
      >
        <div className="container-main text-center">
          <FontAwesomeIcon icon={faHandshake} className="h-10 w-10 text-white/80" />
          <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
            {t('cta.title')}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-white/80">{t('cta.text')}</p>
          <div className="mt-8">
            <Button as="link" to="/getting-started" variant="secondary" size="lg">
              {t('cta.button')}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
