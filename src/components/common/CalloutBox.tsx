import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

type CalloutVariant = 'info' | 'warning' | 'tip';

interface CalloutBoxProps {
  icon: IconDefinition;
  title?: string;
  children: React.ReactNode;
  variant?: CalloutVariant;
}

const variantStyles: Record<CalloutVariant, { borderClass: string; bgClass: string; iconClass: string }> = {
  info: {
    borderClass: 'border-info',
    bgClass: 'bg-info-subtle',
    iconClass: 'text-info',
  },
  warning: {
    borderClass: 'border-accent',
    bgClass: 'bg-warning-subtle',
    iconClass: 'text-accent',
  },
  tip: {
    borderClass: 'border-info',
    bgClass: 'bg-info-subtle',
    iconClass: 'text-info',
  },
};

export default function CalloutBox({
  icon,
  title,
  children,
  variant = 'info'
}: CalloutBoxProps) {
  const styles = variantStyles[variant];

  return (
    <div
      className={`flex gap-4 rounded-2xl border-l-4 p-5 ${styles.borderClass} ${styles.bgClass}`}
    >
      <FontAwesomeIcon
        icon={icon}
        className={`mt-0.5 h-5 w-5 flex-shrink-0 ${styles.iconClass}`}
      />
      <div>
        {title && (
          <h4 className="text-heading font-semibold">
            {title}
          </h4>
        )}
        <div className={`text-body ${title ? 'mt-1' : ''}`}>
          {children}
        </div>
      </div>
    </div>
  );
}
