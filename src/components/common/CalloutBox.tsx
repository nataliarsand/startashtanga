import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

type CalloutVariant = 'info' | 'warning' | 'tip';

interface CalloutBoxProps {
  icon: IconDefinition;
  title?: string;
  children: React.ReactNode;
  variant?: CalloutVariant;
}

const variantStyles: Record<CalloutVariant, { borderColor: string; bgColor: string; iconColor: string }> = {
  info: {
    borderColor: '#90CBDC',
    bgColor: '#f8fcfd',
    iconColor: '#90CBDC',
  },
  warning: {
    borderColor: '#AA5042',
    bgColor: '#fdf8f7',
    iconColor: '#AA5042',
  },
  tip: {
    borderColor: '#90CBDC',
    bgColor: '#f8fcfd',
    iconColor: '#90CBDC',
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
      className="flex gap-4 rounded-2xl border-l-4 p-5"
      style={{ borderColor: styles.borderColor, backgroundColor: styles.bgColor }}
    >
      <FontAwesomeIcon
        icon={icon}
        className="mt-0.5 h-5 w-5 flex-shrink-0"
        style={{ color: styles.iconColor }}
      />
      <div>
        {title && (
          <h4 className="font-semibold" style={{ color: '#4F3130' }}>
            {title}
          </h4>
        )}
        <div className={title ? 'mt-1' : ''} style={{ color: '#753742' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
