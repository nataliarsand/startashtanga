import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck,
  faLightbulb,
  faTriangleExclamation,
  faChevronRight,
  faLocationDot,
  faMapLocationDot,
  faUsers,
  faUser,
  faClock,
  faOm,
} from '@fortawesome/free-solid-svg-icons';
import {
  Button,
  GlossaryTooltip,
  PageHero,
  ContentCard,
  CalloutBox,
  SectionNav,
} from '../components/common';
import { useSEO } from '../hooks';

export default function GettingStarted() {
  const { t } = useTranslation('gettingStarted');

  useSEO({ page: 'gettingStarted' });

  const navItems = [
    { id: 'ashtanga', label: t('nav.whatIsAshtanga') },
    { id: 'led-vs-mysore', label: t('nav.ledVsMysore') },
    { id: 'first-class', label: t('nav.firstClass') },
    { id: 'what-to-bring', label: t('nav.whatToBring') },
    { id: 'find-shala', label: t('nav.findShala') },
    { id: 'faq', label: t('nav.faq') },
  ];

  const sequenceItems = t('ashtanga.sequences.items', {
    returnObjects: true,
  }) as Array<{
    hasTerm?: boolean;
    before?: string;
    term?: string;
    after?: string;
    text?: string;
  }>;

  const tristhanaItems = t('ashtanga.tristhana.items', {
    returnObjects: true,
  }) as Array<{
    label: string;
    term: string;
    suffix?: string;
    description: string;
  }>;

  const ledPoints = t('ledVsMysore.led.points', {
    returnObjects: true,
  }) as string[];

  const mysorePoints = t('ledVsMysore.mysore.points', {
    returnObjects: true,
  }) as string[];

  const firstClassSteps = t('firstClass.steps', {
    returnObjects: true,
  }) as Array<{
    id?: string;
    title?: string;
    titleParts?: { before: string; after: string };
    text?: string;
    textParts?: { before: string; after: string };
  }>;

  const whatToBringItems = t('whatToBring.items', {
    returnObjects: true,
  }) as Array<{ item: string; note: string }>;

  const importantItems = t('whatToBring.important.items', {
    returnObjects: true,
  }) as string[];

  const faqItems = t('faq.items', {
    returnObjects: true,
  }) as Array<{ q: string; a?: string; id?: string; aParts?: { before: string; after: string } }>;

  return (
    <>
      <PageHero title={t('hero.title')} subtitle={t('hero.subtitle')}>
        <SectionNav items={navItems} />
      </PageHero>

      {/* Content */}
      <div className="bg-white py-16 sm:py-20">
        <div className="container-main max-w-3xl">
          {/* What is Ashtanga */}
          <section id="ashtanga">
            <h2 className="text-heading text-2xl font-bold sm:text-3xl">
              {t('ashtanga.title')}
            </h2>
            <p className="text-body mt-4 text-lg leading-relaxed">
              {t('ashtanga.introParts.before')}{' '}
              <GlossaryTooltip term="Mysore" />{t('ashtanga.introParts.after')}
            </p>

            {/* Eight Limbs */}
            <div className="mt-8">
              <CalloutBox icon={faLightbulb} title={t('ashtanga.eightLimbs.title')} variant="info">
                <p>
                  {t('ashtanga.eightLimbs.textParts.before')}{' '}
                  <GlossaryTooltip term="Sanskrit" />
                  {t('ashtanga.eightLimbs.textParts.mid1')}{' '}
                  <GlossaryTooltip term="Sutra">Sutras</GlossaryTooltip>
                  {t('ashtanga.eightLimbs.textParts.mid2')}
                  <GlossaryTooltip term="Asana">asana</GlossaryTooltip>
                  {t('ashtanga.eightLimbs.textParts.mid3')}
                </p>
              </CalloutBox>
            </div>

            {/* Sequences */}
            <ContentCard className="mt-6">
              <h3 className="text-heading font-semibold">
                {t('ashtanga.sequences.title')}
              </h3>
              <ul className="mt-4 space-y-3">
                {sequenceItems.map((item, index) => (
                  <li key={index} className="text-body flex gap-3">
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      className="text-accent mt-1 h-4 w-4 flex-shrink-0"
                    />
                    {item.hasTerm ? (
                      <>
                        {item.before}
                        <GlossaryTooltip term={item.term!} />
                        {item.after}
                      </>
                    ) : (
                      item.text
                    )}
                  </li>
                ))}
              </ul>
              <p className="text-subtle mt-4 text-sm italic">
                {t('ashtanga.sequences.noteParts.before')}{' '}
                <GlossaryTooltip term="Primary Series" />
                {t('ashtanga.sequences.noteParts.after')}
              </p>
            </ContentCard>

            {/* Tristhana */}
            <ContentCard className="mt-6">
              <h3 className="text-heading font-semibold">
                {t('ashtanga.tristhana.title')}
              </h3>
              <ul className="mt-4 space-y-3">
                {tristhanaItems.map((item, index) => (
                  <li key={index} className="text-body flex gap-3">
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      className="text-accent mt-1 h-4 w-4 flex-shrink-0"
                    />
                    <span>
                      {item.label} (<GlossaryTooltip term={item.term} />
                      {item.suffix && ` ${item.suffix}`}) — {item.description}
                    </span>
                  </li>
                ))}
              </ul>
            </ContentCard>
          </section>

          {/* Divider */}
          <hr className="border-default my-12" />

          {/* Led vs Mysore */}
          <section id="led-vs-mysore">
            <h2 className="text-heading text-2xl font-bold sm:text-3xl">
              {t('ledVsMysore.title')}
            </h2>
            <p className="text-body mt-4 text-lg leading-relaxed">
              {t('ledVsMysore.intro')}
            </p>

            {/* Comparison cards */}
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {/* Led Class */}
              <ContentCard>
                <div className="flex items-center gap-3">
                  <div className="bg-accent flex h-10 w-10 items-center justify-center rounded-full">
                    <FontAwesomeIcon icon={faUsers} className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-heading text-lg font-semibold">
                    {t('ledVsMysore.led.title')}
                  </h3>
                </div>
                <p className="text-body mt-3 text-sm">
                  {t('ledVsMysore.led.description')}
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="text-body flex items-start gap-2 text-sm">
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      className="text-accent mt-1.5 h-2 w-2 flex-shrink-0"
                    />
                    {ledPoints[0]}
                  </li>
                  <li className="text-body flex items-start gap-2 text-sm">
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      className="text-accent mt-1.5 h-2 w-2 flex-shrink-0"
                    />
                    <span>
                      {t('ledVsMysore.led.vinyasaCountPoint.before')}{' '}
                      <GlossaryTooltip term="Vinyasa Count">vinyasa count</GlossaryTooltip>
                    </span>
                  </li>
                  {ledPoints.slice(1).map((point, index) => (
                    <li
                      key={index}
                      className="text-body flex items-start gap-2 text-sm"
                    >
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className="text-accent mt-1.5 h-2 w-2 flex-shrink-0"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </ContentCard>

              {/* Mysore Style */}
              <ContentCard variant="featured">
                <div className="flex items-center gap-3">
                  <div className="bg-accent flex h-10 w-10 items-center justify-center rounded-full">
                    <FontAwesomeIcon icon={faUser} className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-heading text-lg font-semibold">
                    {t('ledVsMysore.mysore.title')}
                  </h3>
                </div>
                <p className="text-body mt-3 text-sm">
                  {t('ledVsMysore.mysore.description')}
                </p>
                <ul className="mt-4 space-y-2">
                  {mysorePoints.map((point, index) => (
                    <li
                      key={index}
                      className="text-body flex items-start gap-2 text-sm"
                    >
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className="text-accent mt-1.5 h-2 w-2 flex-shrink-0"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </ContentCard>
            </div>

            {/* Recommendation */}
            <div className="mt-6">
              <CalloutBox icon={faLightbulb} title={t('ledVsMysore.recommendation.title')} variant="tip">
                <p>{t('ledVsMysore.recommendation.text')}</p>
              </CalloutBox>
            </div>
          </section>

          {/* Divider */}
          <hr className="border-default my-12" />

          {/* First Class */}
          <section id="first-class">
            <h2 className="text-heading text-2xl font-bold sm:text-3xl">
              {t('firstClass.title')}
            </h2>
            <p className="text-body mt-4">
              {t('firstClass.intro')}
            </p>

            {/* Class Schedule */}
            <div className="bg-surface mt-8 rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <FontAwesomeIcon
                  icon={faClock}
                  className="text-accent mt-1 h-5 w-5 flex-shrink-0"
                />
                <div>
                  <h3 className="text-heading font-semibold">
                    {t('firstClass.classSchedule.title')}
                  </h3>
                  <p className="text-body mt-2">
                    {t('firstClass.classSchedule.textParts.before')}{' '}
                    <GlossaryTooltip term="Shala">shala</GlossaryTooltip>
                    {t('firstClass.classSchedule.textParts.after')}
                  </p>
                  <p className="text-subtle mt-2 text-sm">
                    {t('firstClass.classSchedule.arrivalNote')}
                  </p>
                </div>
              </div>
            </div>

            {/* Steps */}
            <div className="mt-8 space-y-6">
              {firstClassSteps.map((step, index) => (
                <div key={step.id || index} className="flex gap-4">
                  <div className="bg-accent flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold text-white">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="text-heading font-semibold">
                      {step.titleParts ? (
                        <>
                          {step.titleParts.before}{' '}
                          <GlossaryTooltip term="Vinyasa">vinyasas</GlossaryTooltip>
                          {step.titleParts.after}
                        </>
                      ) : (
                        step.title
                      )}
                    </h4>
                    <p className="text-body mt-1">
                      {step.textParts ? (
                        <>
                          {step.textParts.before}{' '}
                          <GlossaryTooltip term="Surya Namaskara">Sun Salutations</GlossaryTooltip>{' '}
                          {step.textParts.after}
                        </>
                      ) : (
                        step.text
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Opening Mantra */}
            <div className="bg-info-subtle border-info mt-8 flex gap-4 rounded-2xl border-l-4 p-5">
              <FontAwesomeIcon
                icon={faOm}
                className="text-info mt-0.5 h-5 w-5 flex-shrink-0"
              />
              <div>
                <h4 className="text-heading font-semibold">
                  {t('firstClass.mantra.title')}
                </h4>
                <p className="text-body mt-1">
                  {t('firstClass.mantra.textParts.before')}{' '}
                  <GlossaryTooltip term="Samasthitih" />{' '}
                  {t('firstClass.mantra.textParts.after')}
                </p>
              </div>
            </div>

            {/* Duration note */}
            <div className="bg-surface mt-8 rounded-2xl p-5">
              <h4 className="text-heading font-semibold">
                {t('firstClass.duration.title')}
              </h4>
              <p className="text-body mt-1">
                {t('firstClass.duration.text')}
              </p>
            </div>
          </section>

          {/* Divider */}
          <hr className="border-default my-12" />

          {/* What to Bring */}
          <section id="what-to-bring">
            <h2 className="text-heading text-2xl font-bold sm:text-3xl">
              {t('whatToBring.title')}
            </h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {whatToBringItems.map((item, index) => (
                <div
                  key={index}
                  className="bg-surface rounded-xl p-4"
                >
                  <p className="text-heading font-semibold">
                    {item.item}
                  </p>
                  <p className="text-body mt-1 text-sm">
                    {item.note}
                  </p>
                </div>
              ))}
            </div>

            {/* Important */}
            <div className="bg-warning-subtle border-accent mt-6 rounded-2xl border-l-4 p-5">
              <div className="flex gap-3">
                <FontAwesomeIcon
                  icon={faTriangleExclamation}
                  className="text-accent mt-0.5 h-5 w-5 flex-shrink-0"
                />
                <div>
                  <h4 className="text-heading font-semibold">
                    {t('whatToBring.important.title')}
                  </h4>
                  <ul className="mt-2 space-y-1">
                    {importantItems.map((item, index) => (
                      <li
                        key={index}
                        className="text-body flex items-start gap-2"
                      >
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          className="text-accent mt-1.5 h-2 w-2"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Divider */}
          <hr className="border-default my-12" />

          {/* Find a Shala */}
          <section id="find-shala">
            <h2 className="text-heading text-2xl font-bold sm:text-3xl">
              {t('findShala.title')}
            </h2>
            <p className="text-body mt-4">
              {t('findShala.text')}
            </p>

            <ContentCard variant="placeholder" className="mt-6 text-center">
              <FontAwesomeIcon
                icon={faLocationDot}
                className="text-accent h-8 w-8"
              />
              <p className="text-body mt-3 font-medium">
                {t('findShala.comingSoon')}
              </p>
              <Button
                as="a"
                href="https://forms.gle/c6iprH8YBpktKkYD7"
                target="_blank"
                rel="noopener noreferrer"
                size="sm"
                className="mt-4"
                trackingName="getting_started_submit_shala"
              >
                <FontAwesomeIcon icon={faMapLocationDot} className="mr-2 h-3 w-3" />
                Submit a shala
              </Button>
            </ContentCard>

            <ContentCard variant="tip" className="mt-6 p-5">
              <h4 className="text-heading font-semibold">
                {t('findShala.tip.title')}
              </h4>
              <p className="text-body mt-1">
                {t('findShala.tip.textParts.before')}{' '}
                <GlossaryTooltip term="KPJAYI" />/<GlossaryTooltip term="SYC" />{' '}
                <GlossaryTooltip term="Authorised">authorised</GlossaryTooltip> or{' '}
                <GlossaryTooltip term="Certified">certified</GlossaryTooltip>{' '}
                {t('findShala.tip.textParts.after')}
              </p>
            </ContentCard>
          </section>

          {/* Divider */}
          <hr className="border-default my-12" />

          {/* FAQ */}
          <section id="faq">
            <h2 className="text-heading text-2xl font-bold sm:text-3xl">
              {t('faq.title')}
            </h2>

            <div className="mt-6 space-y-4">
              {faqItems.map((item, index) => (
                <details
                  key={index}
                  className="bg-surface group rounded-xl"
                >
                  <summary className="text-heading flex cursor-pointer items-center justify-between p-4 font-semibold">
                    {item.q}
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      className="text-accent h-3 w-3 transition-transform group-open:rotate-90"
                    />
                  </summary>
                  <p className="text-body px-4 pb-4">
                    {item.aParts ? (
                      <>
                        {item.aParts.before}{' '}
                        {item.id === 'practice-frequency' && (
                          <GlossaryTooltip term="Moon Days">moon day</GlossaryTooltip>
                        )}
                        {item.id === 'skip-ahead' && (
                          <GlossaryTooltip term="Gatekeeper Pose">gatekeeper poses</GlossaryTooltip>
                        )}{' '}
                        {item.aParts.after}
                      </>
                    ) : (
                      item.a
                    )}
                  </p>
                </details>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* CTA */}
      <section className="gradient-cta py-16">
        <div className="container-main text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            {t('cta.title')}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-white/80">{t('cta.text')}</p>
          <div className="mt-8">
            <Button as="link" to="/about" variant="secondary" size="lg" trackingName="getting_started_cta_about">
              Learn about this project
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
