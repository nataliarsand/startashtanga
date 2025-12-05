import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowUpRightFromSquare,
  faCertificate,
  faAward,
} from '@fortawesome/free-solid-svg-icons';
import ContentCard from './ContentCard';
import GlossaryTooltip from './GlossaryTooltip';

export interface Teacher {
  name: string;
  level?: 'certified' | 'authorized-2' | 'authorized-1';
}

export type PracticeOption =
  | 'mysore'
  | 'led-primary'
  | 'led-intermediate'
  | 'pranayama'
  | 'chanting'
  | 'meditation'
  | 'conference'
  | 'philosophy'
  | 'online';

export interface ShalaData {
  id: string;
  name: string;
  city: string;
  country: string;
  address: string;
  teachers: Teacher[];
  practices: PracticeOption[];
  website: string;
  lat: number;
  lng: number;
}

interface ShalaCardProps {
  shala: ShalaData;
}

const practiceLabels: Record<PracticeOption, { label: string; tooltip?: string }> = {
  mysore: { label: 'Mysore', tooltip: 'Mysore style' },
  'led-primary': { label: 'Led Primary', tooltip: 'Led Class' },
  'led-intermediate': { label: 'Led Intermediate', tooltip: 'Intermediate Series' },
  pranayama: { label: 'Pranayama', tooltip: 'Pranayama' },
  chanting: { label: 'Chanting', tooltip: 'Mantra' },
  meditation: { label: 'Meditation', tooltip: 'Dhyana' },
  conference: { label: 'Conference', tooltip: 'Conference' },
  philosophy: { label: 'Philosophy' },
  online: { label: 'Online' },
};

export default function ShalaCard({ shala }: ShalaCardProps) {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(shala.address)}`;

  const getTeacherIcon = (level?: Teacher['level']) => {
    switch (level) {
      case 'certified':
        return {
          icon: faCertificate,
          tooltip: 'Certified',
          className: 'text-amber-500',
        };
      case 'authorized-2':
      case 'authorized-1':
        return {
          icon: faAward,
          tooltip: 'Authorised',
          className: 'text-accent',
        };
      default:
        return null;
    }
  };

  return (
    <ContentCard className="flex flex-col !p-0">
      {/* Main content */}
      <div className="p-6">
        {/* Header */}
        <div>
          <h3 className="text-heading text-lg font-semibold leading-tight">
            {shala.name}
          </h3>
          <p className="text-subtle mt-1 text-sm">
            {shala.city}, {shala.country}
          </p>
        </div>

        {/* Divider */}
        <hr className="border-default my-4" />

        {/* Two columns: Teachers and Practices */}
        <div className="grid grid-cols-2 gap-6">
          {/* Teachers */}
          <div>
            <p className="text-subtle mb-2 text-xs font-medium uppercase tracking-wide">
              Teachers
            </p>
            <ul className="space-y-1.5">
              {shala.teachers.map((teacher, index) => {
                const iconData = getTeacherIcon(teacher.level);
                return (
                  <li
                    key={index}
                    className="text-body flex items-center gap-1.5 text-sm"
                  >
                    {iconData ? (
                      <GlossaryTooltip term={iconData.tooltip}>
                        <FontAwesomeIcon
                          icon={iconData.icon}
                          className={`h-3.5 w-3.5 flex-shrink-0 ${iconData.className}`}
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

          {/* Practices */}
          <div>
            <p className="text-subtle mb-2 text-xs font-medium uppercase tracking-wide">
              Classes
            </p>
            <div className="flex flex-wrap gap-1.5">
              {shala.practices.map((practice) => {
                const { label, tooltip } = practiceLabels[practice];
                return (
                  <span
                    key={practice}
                    className="bg-surface-alt text-body inline-block rounded-full px-2.5 py-0.5 text-xs"
                  >
                    {tooltip ? (
                      <GlossaryTooltip term={tooltip}>{label}</GlossaryTooltip>
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

      {/* Footer links */}
      <div className="bg-surface-alt mt-auto flex items-center justify-between px-6 py-3">
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:text-accent/80 inline-flex items-center gap-1 text-sm font-medium transition-colors"
        >
          Directions
          <FontAwesomeIcon
            icon={faArrowUpRightFromSquare}
            className="h-3 w-3"
          />
        </a>
        <a
          href={shala.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:text-accent/80 inline-flex items-center gap-1 text-sm font-medium transition-colors"
        >
          Website
          <FontAwesomeIcon
            icon={faArrowUpRightFromSquare}
            className="h-3 w-3"
          />
        </a>
      </div>
    </ContentCard>
  );
}
