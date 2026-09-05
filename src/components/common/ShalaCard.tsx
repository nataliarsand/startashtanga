import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowUpRightFromSquare,
  faCertificate,
  faAward,
} from '@fortawesome/free-solid-svg-icons';
import type { Shala, TeacherLevel } from '../../types/shala';
import ContentCard from './ContentCard';
import GlossaryTooltip from './GlossaryTooltip';

interface ShalaCardProps {
  shala: Shala;
}

// Glossary entries (by term) that explain each practice and level
const practiceGlossaryTerm: Partial<
  Record<Shala['practices'][number], string>
> = {
  mysore: 'Mysore style',
  'led-primary': 'Led Class',
  'led-intermediate': 'Intermediate Series',
  pranayama: 'Pranayama',
  chanting: 'Mantra',
  meditation: 'Dhyana',
  conference: 'Conference',
};

const teacherLevelBadge: Record<
  TeacherLevel,
  { icon: typeof faAward; glossaryTerm: string; className: string }
> = {
  certified: {
    icon: faCertificate,
    glossaryTerm: 'Certified',
    className: 'text-amber-500',
  },
  'authorized-2': {
    icon: faAward,
    glossaryTerm: 'Authorised',
    className: 'text-accent',
  },
  'authorized-1': {
    icon: faAward,
    glossaryTerm: 'Authorised',
    className: 'text-accent',
  },
};

const externalLinkClass =
  'text-accent hover:text-accent/80 inline-flex items-center gap-1 text-sm font-medium transition-colors';

export default function ShalaCard({ shala }: ShalaCardProps) {
  const { t } = useTranslation('shalas');
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(shala.address)}`;

  return (
    <ContentCard className="flex flex-col !p-0">
      <div className="p-6">
        <h3 className="text-heading text-lg leading-tight font-semibold">
          {shala.name}
        </h3>
        <p className="text-subtle mt-1 text-sm">
          {shala.city}, {shala.country}
        </p>

        <hr className="border-line my-4" />

        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-subtle mb-2 text-xs font-medium tracking-wide uppercase">
              {t('list.teachers')}
            </p>
            <ul className="space-y-1.5">
              {shala.teachers.map((teacher) => {
                const badge = teacher.level
                  ? teacherLevelBadge[teacher.level]
                  : null;
                return (
                  <li
                    key={teacher.name}
                    className="text-body flex items-center gap-1.5 text-sm"
                  >
                    {badge ? (
                      <GlossaryTooltip term={badge.glossaryTerm}>
                        <FontAwesomeIcon
                          icon={badge.icon}
                          className={`h-3.5 w-3.5 flex-shrink-0 ${badge.className}`}
                        />
                      </GlossaryTooltip>
                    ) : (
                      <span className="w-3.5 flex-shrink-0" />
                    )}
                    <span className="leading-tight">{teacher.name}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <p className="text-subtle mb-2 text-xs font-medium tracking-wide uppercase">
              {t('list.classes')}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {shala.practices.map((practice) => {
                const label = t(`practices.${practice}`);
                const glossaryTerm = practiceGlossaryTerm[practice];
                return (
                  <span
                    key={practice}
                    className="bg-surface-alt text-body inline-block rounded-full px-2.5 py-0.5 text-xs"
                  >
                    {glossaryTerm ? (
                      <GlossaryTooltip term={glossaryTerm}>
                        {label}
                      </GlossaryTooltip>
                    ) : (
                      label
                    )}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-surface-alt mt-auto flex items-center justify-between px-6 py-3">
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={externalLinkClass}
        >
          {t('list.directions')}
          <FontAwesomeIcon
            icon={faArrowUpRightFromSquare}
            className="h-3 w-3"
          />
        </a>
        <a
          href={shala.website}
          target="_blank"
          rel="noopener noreferrer"
          className={externalLinkClass}
        >
          {t('list.website')}
          <FontAwesomeIcon
            icon={faArrowUpRightFromSquare}
            className="h-3 w-3"
          />
        </a>
      </div>
    </ContentCard>
  );
}
