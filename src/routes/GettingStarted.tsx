import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck,
  faLightbulb,
  faTriangleExclamation,
  faChevronRight,
  faLocationDot,
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
} from '../components/common';

export default function GettingStarted() {
  const { t } = useTranslation('gettingStarted');

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
  }) as Array<{ q: string; a: string }>;

  return (
    <>
      <PageHero title={t('hero.title')} subtitle={t('hero.subtitle')}>
        {/* Quick nav */}
        <nav className="mx-auto mt-8 flex max-w-2xl flex-wrap justify-center gap-2">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="rounded-full px-4 py-2 text-sm font-medium transition-all hover:opacity-80"
              style={{ backgroundColor: '#FFFFFF', color: '#753742' }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </PageHero>

      {/* Content */}
      <div className="bg-white py-16 sm:py-20">
        <div className="container-main max-w-3xl">
          {/* What is Ashtanga */}
          <section id="ashtanga">
            <h2
              className="text-2xl font-bold sm:text-3xl"
              style={{ color: '#4F3130' }}
            >
              {t('ashtanga.title')}
            </h2>
            <p className="mt-4 text-lg leading-relaxed" style={{ color: '#753742' }}>
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
              <h3 className="font-semibold" style={{ color: '#4F3130' }}>
                {t('ashtanga.sequences.title')}
              </h3>
              <ul className="mt-4 space-y-3">
                {sequenceItems.map((item, index) => (
                  <li key={index} className="flex gap-3" style={{ color: '#753742' }}>
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      className="mt-1 h-4 w-4 flex-shrink-0"
                      style={{ color: '#AA5042' }}
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
              <p className="mt-4 text-sm italic" style={{ color: '#967369' }}>
                {t('ashtanga.sequences.noteParts.before')}{' '}
                <GlossaryTooltip term="Primary Series" />
                {t('ashtanga.sequences.noteParts.after')}
              </p>
            </ContentCard>

            {/* Tristhana */}
            <ContentCard className="mt-6">
              <h3 className="font-semibold" style={{ color: '#4F3130' }}>
                {t('ashtanga.tristhana.title')}
              </h3>
              <ul className="mt-4 space-y-3">
                {tristhanaItems.map((item, index) => (
                  <li key={index} className="flex gap-3" style={{ color: '#753742' }}>
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      className="mt-1 h-4 w-4 flex-shrink-0"
                      style={{ color: '#AA5042' }}
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
          <hr className="my-12" style={{ borderColor: '#DCC8AF' }} />

          {/* Led vs Mysore */}
          <section id="led-vs-mysore">
            <h2
              className="text-2xl font-bold sm:text-3xl"
              style={{ color: '#4F3130' }}
            >
              {t('ledVsMysore.title')}
            </h2>
            <p className="mt-4 text-lg leading-relaxed" style={{ color: '#753742' }}>
              {t('ledVsMysore.intro')}
            </p>

            {/* Comparison cards */}
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {/* Led Class */}
              <ContentCard>
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full"
                    style={{ backgroundColor: '#AA5042' }}
                  >
                    <FontAwesomeIcon icon={faUsers} className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold" style={{ color: '#4F3130' }}>
                    {t('ledVsMysore.led.title')}
                  </h3>
                </div>
                <p className="mt-3 text-sm" style={{ color: '#753742' }}>
                  {t('ledVsMysore.led.description')}
                </p>
                <ul className="mt-4 space-y-2">
                  {ledPoints.map((point, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm"
                      style={{ color: '#753742' }}
                    >
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className="mt-1.5 h-2 w-2 flex-shrink-0"
                        style={{ color: '#AA5042' }}
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </ContentCard>

              {/* Mysore Style */}
              <div
                className="rounded-2xl border-2 p-6"
                style={{ backgroundColor: '#FFFFFF', borderColor: '#AA5042' }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full"
                    style={{ backgroundColor: '#AA5042' }}
                  >
                    <FontAwesomeIcon icon={faUser} className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold" style={{ color: '#4F3130' }}>
                    {t('ledVsMysore.mysore.title')}
                  </h3>
                </div>
                <p className="mt-3 text-sm" style={{ color: '#753742' }}>
                  {t('ledVsMysore.mysore.description')}
                </p>
                <ul className="mt-4 space-y-2">
                  {mysorePoints.map((point, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm"
                      style={{ color: '#753742' }}
                    >
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className="mt-1.5 h-2 w-2 flex-shrink-0"
                        style={{ color: '#AA5042' }}
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Recommendation */}
            <div className="mt-6">
              <CalloutBox icon={faLightbulb} title={t('ledVsMysore.recommendation.title')} variant="tip">
                <p>{t('ledVsMysore.recommendation.text')}</p>
              </CalloutBox>
            </div>
          </section>

          {/* Divider */}
          <hr className="my-12" style={{ borderColor: '#DCC8AF' }} />

          {/* First Class */}
          <section id="first-class">
            <h2
              className="text-2xl font-bold sm:text-3xl"
              style={{ color: '#4F3130' }}
            >
              {t('firstClass.title')}
            </h2>
            <p className="mt-4" style={{ color: '#753742' }}>
              {t('firstClass.intro')}
            </p>

            {/* Class Schedule */}
            <div
              className="mt-8 rounded-2xl p-6"
              style={{ backgroundColor: '#F5EDDF' }}
            >
              <div className="flex items-start gap-3">
                <FontAwesomeIcon
                  icon={faClock}
                  className="mt-1 h-5 w-5 flex-shrink-0"
                  style={{ color: '#AA5042' }}
                />
                <div>
                  <h3 className="font-semibold" style={{ color: '#4F3130' }}>
                    {t('firstClass.classSchedule.title')}
                  </h3>
                  <p className="mt-2" style={{ color: '#753742' }}>
                    {t('firstClass.classSchedule.textParts.before')}{' '}
                    <GlossaryTooltip term="Shala">shala</GlossaryTooltip>
                    {t('firstClass.classSchedule.textParts.after')}
                  </p>
                  <p className="mt-2 text-sm" style={{ color: '#967369' }}>
                    {t('firstClass.classSchedule.arrivalNote')}
                  </p>
                </div>
              </div>
            </div>

            {/* Steps */}
            <div className="mt-8 space-y-6">
              {firstClassSteps.map((step, index) => (
                <div key={step.id || index} className="flex gap-4">
                  <div
                    className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                    style={{ backgroundColor: '#AA5042' }}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold" style={{ color: '#4F3130' }}>
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
                    <p className="mt-1" style={{ color: '#753742' }}>
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
            <div
              className="mt-8 flex gap-4 rounded-2xl border-l-4 p-5"
              style={{ borderColor: '#90CBDC', backgroundColor: '#f8fcfd' }}
            >
              <FontAwesomeIcon
                icon={faOm}
                className="mt-0.5 h-5 w-5 flex-shrink-0"
                style={{ color: '#90CBDC' }}
              />
              <div>
                <h4 className="font-semibold" style={{ color: '#4F3130' }}>
                  {t('firstClass.mantra.title')}
                </h4>
                <p className="mt-1" style={{ color: '#753742' }}>
                  {t('firstClass.mantra.textParts.before')}{' '}
                  <GlossaryTooltip term="Samasthitih" />{' '}
                  {t('firstClass.mantra.textParts.after')}
                </p>
              </div>
            </div>

            {/* Duration note */}
            <div
              className="mt-8 rounded-2xl p-5"
              style={{ backgroundColor: '#F5EDDF' }}
            >
              <h4 className="font-semibold" style={{ color: '#4F3130' }}>
                {t('firstClass.duration.title')}
              </h4>
              <p className="mt-1" style={{ color: '#753742' }}>
                {t('firstClass.duration.text')}
              </p>
            </div>
          </section>

          {/* Divider */}
          <hr className="my-12" style={{ borderColor: '#DCC8AF' }} />

          {/* What to Bring */}
          <section id="what-to-bring">
            <h2
              className="text-2xl font-bold sm:text-3xl"
              style={{ color: '#4F3130' }}
            >
              {t('whatToBring.title')}
            </h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {whatToBringItems.map((item, index) => (
                <div
                  key={index}
                  className="rounded-xl p-4"
                  style={{ backgroundColor: '#F5EDDF' }}
                >
                  <p className="font-semibold" style={{ color: '#4F3130' }}>
                    {item.item}
                  </p>
                  <p className="mt-1 text-sm" style={{ color: '#753742' }}>
                    {item.note}
                  </p>
                </div>
              ))}
            </div>

            {/* Important */}
            <div
              className="mt-6 rounded-2xl border-l-4 p-5"
              style={{ borderColor: '#AA5042', backgroundColor: '#fdf8f7' }}
            >
              <div className="flex gap-3">
                <FontAwesomeIcon
                  icon={faTriangleExclamation}
                  className="mt-0.5 h-5 w-5 flex-shrink-0"
                  style={{ color: '#AA5042' }}
                />
                <div>
                  <h4 className="font-semibold" style={{ color: '#4F3130' }}>
                    {t('whatToBring.important.title')}
                  </h4>
                  <ul className="mt-2 space-y-1">
                    {importantItems.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2"
                        style={{ color: '#753742' }}
                      >
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          className="mt-1.5 h-2 w-2"
                          style={{ color: '#AA5042' }}
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
          <hr className="my-12" style={{ borderColor: '#DCC8AF' }} />

          {/* Find a Shala */}
          <section id="find-shala">
            <h2
              className="text-2xl font-bold sm:text-3xl"
              style={{ color: '#4F3130' }}
            >
              {t('findShala.title')}
            </h2>
            <p className="mt-4" style={{ color: '#753742' }}>
              {t('findShala.text')}
            </p>

            <div
              className="mt-6 rounded-2xl border-2 border-dashed p-6 text-center"
              style={{ borderColor: '#DCC8AF', backgroundColor: '#F5EDDF' }}
            >
              <FontAwesomeIcon
                icon={faLocationDot}
                className="h-8 w-8"
                style={{ color: '#AA5042' }}
              />
              <p className="mt-3 font-medium" style={{ color: '#753742' }}>
                {t('findShala.comingSoon')}
              </p>
            </div>

            <div
              className="mt-6 rounded-2xl p-5"
              style={{ backgroundColor: '#f8fcfd' }}
            >
              <h4 className="font-semibold" style={{ color: '#4F3130' }}>
                {t('findShala.tip.title')}
              </h4>
              <p className="mt-1" style={{ color: '#753742' }}>
                {t('findShala.tip.text')}
              </p>
            </div>
          </section>

          {/* Divider */}
          <hr className="my-12" style={{ borderColor: '#DCC8AF' }} />

          {/* FAQ */}
          <section id="faq">
            <h2
              className="text-2xl font-bold sm:text-3xl"
              style={{ color: '#4F3130' }}
            >
              {t('faq.title')}
            </h2>

            <div className="mt-6 space-y-4">
              {faqItems.map((item, index) => (
                <details
                  key={index}
                  className="group rounded-xl"
                  style={{ backgroundColor: '#F5EDDF' }}
                >
                  <summary
                    className="flex cursor-pointer items-center justify-between p-4 font-semibold"
                    style={{ color: '#4F3130' }}
                  >
                    {item.q}
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      className="h-3 w-3 transition-transform group-open:rotate-90"
                      style={{ color: '#AA5042' }}
                    />
                  </summary>
                  <p className="px-4 pb-4" style={{ color: '#753742' }}>
                    {item.a}
                  </p>
                </details>
              ))}
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
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            {t('cta.title')}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-white/80">{t('cta.text')}</p>
          <div className="mt-8">
            <Button as="link" to="/about" variant="secondary" size="lg">
              Learn about this project
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
