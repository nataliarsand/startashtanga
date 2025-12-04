import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRepeat, faRightLeft } from '@fortawesome/free-solid-svg-icons';
import {
  PageHero,
  SectionNav,
  ContentCard,
  CalloutBox,
  GlossaryTooltip,
} from '../components/common';

interface Pose {
  name: string;
  sanskrit: string;
  meaning: string;
  sides?: boolean;
  repetitions?: string;
  gatekeeper?: boolean;
  pranayama?: boolean;
}

interface SuryaGroup {
  name: string;
  sanskrit: string;
  repetitions: string;
  poses: Pose[];
}

export default function PrimarySeries() {
  const { t } = useTranslation('primarySeries');

  const navItems = [
    { id: 'opening-mantra', label: t('nav.openingMantra') },
    { id: 'surya-namaskara', label: t('nav.suryaNamaskara') },
    { id: 'standing', label: t('nav.standing') },
    { id: 'seated', label: t('nav.seated') },
    { id: 'finishing', label: t('nav.finishing') },
    { id: 'closing-mantra', label: t('nav.closingMantra') },
  ];

  const suryaGroups = t('suryaNamaskara.groups', { returnObjects: true }) as SuryaGroup[];
  const standingPoses = t('standing.poses', { returnObjects: true }) as Pose[];
  const seatedPoses = t('seated.poses', { returnObjects: true }) as Pose[];
  const finishingPoses = t('finishing.poses', { returnObjects: true }) as Pose[];

  const openingSanskrit = t('openingMantra.sanskrit', { returnObjects: true }) as string[];
  const openingTransliteration = t('openingMantra.transliteration', { returnObjects: true }) as string[];
  const openingTranslation = t('openingMantra.translation', { returnObjects: true }) as string[];

  const closingSanskrit = t('closingMantra.sanskrit', { returnObjects: true }) as string[];
  const closingTransliteration = t('closingMantra.transliteration', { returnObjects: true }) as string[];
  const closingTranslation = t('closingMantra.translation', { returnObjects: true }) as string[];

  const renderPoseList = (poses: Pose[]) => (
    <div className="space-y-2">
      {poses.map((pose, index) => (
        <div
          key={index}
          className={`flex items-center justify-between rounded-lg border bg-white p-3 ${
            pose.gatekeeper ? 'border-accent border-l-4' : pose.pranayama ? 'border-info border-l-4' : 'border-default'
          }`}
        >
          <div className="min-w-0 flex-1">
            <p className="text-heading font-medium">
              {pose.pranayama ? (
                <GlossaryTooltip term="Nādi Śodhana">{pose.name}</GlossaryTooltip>
              ) : (
                pose.name
              )}
              {pose.gatekeeper && (
                <span className="text-accent ml-2 text-xs font-normal">
                  (<GlossaryTooltip term="Gatekeeper Pose">gatekeeper</GlossaryTooltip>)
                </span>
              )}
              {pose.pranayama && (
                <span className="text-info ml-2 text-xs font-normal">
                  (<GlossaryTooltip term="Pranayama">pranayama</GlossaryTooltip>)
                </span>
              )}
            </p>
            <p className="text-subtle text-sm">
              {pose.sanskrit && <span className="mr-2">{pose.sanskrit}</span>}
              <span className="italic">{pose.meaning}</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            {pose.sides && (
              <span className="text-accent flex items-center gap-1 text-xs">
                <FontAwesomeIcon icon={faRightLeft} className="h-3 w-3" />
                <span className="hidden sm:inline">Both sides</span>
              </span>
            )}
            {pose.repetitions && (
              <span className="text-accent flex items-center gap-1 text-xs">
                <FontAwesomeIcon icon={faRepeat} className="h-3 w-3" />
                <span className="hidden sm:inline">{pose.repetitions}</span>
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  const renderMantra = (
    sanskrit: string[],
    transliteration: string[],
    translation: string[]
  ) => (
    <div className="grid gap-6 lg:grid-cols-3">
      <ContentCard>
        <h4 className="text-heading mb-3 text-sm font-semibold uppercase tracking-wide">
          Sanskrit
        </h4>
        <div className="space-y-1 text-lg leading-relaxed">
          {sanskrit.map((line, i) => (
            <p key={i} className={`text-heading ${!line ? 'h-4' : ''}`}>
              {line}
            </p>
          ))}
        </div>
      </ContentCard>
      <ContentCard>
        <h4 className="text-heading mb-3 text-sm font-semibold uppercase tracking-wide">
          Transliteration
        </h4>
        <div className="space-y-1 leading-relaxed">
          {transliteration.map((line, i) => (
            <p key={i} className={`text-body ${!line ? 'h-4' : ''}`}>
              {line}
            </p>
          ))}
        </div>
      </ContentCard>
      <ContentCard>
        <h4 className="text-heading mb-3 text-sm font-semibold uppercase tracking-wide">
          Translation
        </h4>
        <div className="space-y-1 leading-relaxed">
          {translation.map((line, i) => (
            <p key={i} className={`text-body italic ${!line ? 'h-4' : ''}`}>
              {line}
            </p>
          ))}
        </div>
      </ContentCard>
    </div>
  );

  return (
    <>
      <PageHero title={t('hero.title')} subtitle={t('hero.subtitle')}>
        <SectionNav items={navItems} />
      </PageHero>

      <div className="bg-white py-16 sm:py-20">
        <div className="container-main max-w-4xl">
          {/* Intro */}
          <CalloutBox title={t('intro.title')} variant="info">
            <p>{t('intro.text')}</p>
          </CalloutBox>

          {/* Opening Mantra */}
          <section id="opening-mantra" className="mt-16">
            <h2 className="text-heading text-2xl font-bold sm:text-3xl">
              {t('openingMantra.title')}
            </h2>
            <p className="text-body mt-2">{t('openingMantra.subtitle')}</p>
            <div className="mt-6">
              {renderMantra(openingSanskrit, openingTransliteration, openingTranslation)}
            </div>
          </section>

          <hr className="border-default my-12" />

          {/* Surya Namaskara */}
          <section id="surya-namaskara">
            <h2 className="text-heading text-2xl font-bold sm:text-3xl">
              {t('suryaNamaskara.title')}
            </h2>
            <p className="text-body mt-2">{t('suryaNamaskara.subtitle')}</p>
            <p className="text-subtle mt-1 text-sm">{t('suryaNamaskara.description')}</p>

            <div className="mt-8 space-y-8">
              {suryaGroups.map((group, index) => (
                <ContentCard key={index}>
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-heading text-lg font-semibold">{group.name}</h3>
                      <p className="text-accent text-sm">{group.sanskrit}</p>
                    </div>
                    <span className="bg-accent rounded-full px-3 py-1 text-xs font-medium text-white">
                      {group.repetitions}
                    </span>
                  </div>
                  {renderPoseList(group.poses)}
                </ContentCard>
              ))}
            </div>
          </section>

          <hr className="border-default my-12" />

          {/* Standing */}
          <section id="standing">
            <h2 className="text-heading text-2xl font-bold sm:text-3xl">
              {t('standing.title')}
            </h2>
            <p className="text-body mt-2">{t('standing.subtitle')}</p>
            <div className="mt-6">{renderPoseList(standingPoses)}</div>
          </section>

          <hr className="border-default my-12" />

          {/* Seated */}
          <section id="seated">
            <h2 className="text-heading text-2xl font-bold sm:text-3xl">
              {t('seated.title')}
            </h2>
            <p className="text-body mt-2">{t('seated.subtitle')}</p>
            <div className="mt-6">{renderPoseList(seatedPoses)}</div>
          </section>

          <hr className="border-default my-12" />

          {/* Finishing */}
          <section id="finishing">
            <h2 className="text-heading text-2xl font-bold sm:text-3xl">
              {t('finishing.title')}
            </h2>
            <p className="text-body mt-2">{t('finishing.subtitle')}</p>
            <div className="mt-6">{renderPoseList(finishingPoses)}</div>
          </section>

          <hr className="border-default my-12" />

          {/* Closing Mantra */}
          <section id="closing-mantra">
            <h2 className="text-heading text-2xl font-bold sm:text-3xl">
              {t('closingMantra.title')}
            </h2>
            <p className="text-body mt-2">{t('closingMantra.subtitle')}</p>
            <div className="mt-6">
              {renderMantra(closingSanskrit, closingTransliteration, closingTranslation)}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
