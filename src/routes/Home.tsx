import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faBookOpen,
  faLocationDot,
  faUsers,
  faHandsPraying,
  faSeedling,
  faOm,
} from '@fortawesome/free-solid-svg-icons';
import { Button, GlossaryTooltip } from '../components/common';
import { useSEO } from '../hooks';

export default function Home() {
  const { t } = useTranslation('home');

  useSEO({ page: 'home' });

  const quickActions = [
    {
      to: '/getting-started',
      icon: faBookOpen,
      label: t('quickActions.start.label'),
      description: t('quickActions.start.description'),
    },
    {
      to: '/shala-directory',
      icon: faLocationDot,
      label: t('quickActions.findClass.label'),
      description: t('quickActions.findClass.description'),
      comingSoon: true,
    },
    {
      to: '/about',
      icon: faUsers,
      label: t('quickActions.explore.label'),
      description: t('quickActions.explore.description'),
    },
  ];

  const features = [
    {
      icon: faHandsPraying,
      title: t('features.mysoreStyle.title'),
      description: t('features.mysoreStyle.description'),
    },
    {
      icon: faSeedling,
      title: t('features.forBeginners.title'),
      description: t('features.forBeginners.description'),
    },
    {
      icon: faOm,
      title: t('features.beyondPoses.title'),
      description: t('features.beyondPoses.description'),
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="gradient-hero relative overflow-hidden py-24 sm:py-32">
        {/* Mandala decoration */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 opacity-10 sm:translate-x-1/3">
          <img
            src="/om-mandala.png"
            alt=""
            className="h-[500px] w-[500px] object-contain sm:h-[600px] sm:w-[600px]"
          />
        </div>

        <div className="container-main relative text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium text-white">
            {t('hero.tagline')}
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-6xl">
            {t('hero.title')}
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-lg text-white/80 sm:text-xl">
            {t('hero.subtitleParts.before')}{' '}
            <GlossaryTooltip term="Mysore">Mysore-style</GlossaryTooltip>{' '}
            {t('hero.subtitleParts.after')}
          </p>

          {/* Quick Actions */}
          <div className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-3">
            {quickActions.map((action) => (
              <Link
                key={action.to}
                to={action.to}
                className={`group relative rounded-2xl bg-white/10 p-6 text-left backdrop-blur-sm transition-all hover:bg-white/20 ${
                  action.comingSoon ? 'pointer-events-none opacity-50' : ''
                }`}
              >
                {action.comingSoon && (
                  <span className="absolute right-3 top-3 rounded-full bg-white/20 px-2 py-0.5 text-xs font-medium text-white">
                    Soon
                  </span>
                )}
                <FontAwesomeIcon
                  icon={action.icon}
                  className="h-6 w-6 text-white"
                />
                <h3 className="mt-4 flex items-center gap-2 font-semibold text-white">
                  {action.label}
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="h-3 w-3 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100"
                  />
                </h3>
                <p className="mt-1 text-sm text-white/70">
                  {action.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-20 sm:py-24">
        <div className="container-main">
          <div className="grid gap-12 sm:grid-cols-3 sm:gap-8">
            {features.map((feature, index) => (
              <div key={index} className="relative pl-14">
                <div className="bg-accent absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-xl text-white">
                  <FontAwesomeIcon icon={feature.icon} className="h-5 w-5" />
                </div>
                <h3 className="text-heading text-lg font-semibold">
                  {feature.title}
                </h3>
                <p className="text-body mt-2 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface py-16 sm:py-20">
        <div className="container-main text-center">
          <h2 className="text-heading text-2xl font-bold sm:text-3xl">
            {t('cta.title')}
          </h2>
          <p className="text-body mx-auto mt-3 max-w-md">
            {t('cta.description')}
          </p>
          <div className="mt-8">
            <Button as="link" to="/getting-started" size="lg" trackingName="home_cta_getting_started">
              {t('cta.buttonText')}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
