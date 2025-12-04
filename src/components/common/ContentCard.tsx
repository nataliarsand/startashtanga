type ContentCardVariant =
  | 'default'      // Basic content container (cream bg)
  | 'secondary'    // Alternative content (white bg)
  | 'highlight'    // Emphasized content (cream bg + border)
  | 'featured'     // Special/promoted content (white bg + accent border)
  | 'tip'          // Tips and helpful info (light blue bg + border)
  | 'warning'      // Important warnings (light red bg + border)
  | 'placeholder'; // Coming soon / empty state (dashed border)

interface ContentCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: ContentCardVariant;
}

const variantStyles: Record<ContentCardVariant, string> = {
  default: 'bg-surface',
  secondary: 'bg-white',
  highlight: 'bg-surface border-2 border-default',
  featured: 'bg-white border-2 border-accent',
  tip: 'bg-info-subtle border-2 border-info',
  warning: 'bg-warning-subtle border-2 border-accent',
  placeholder: 'bg-surface border-2 border-dashed border-default',
};

export default function ContentCard({
  children,
  className = '',
  variant = 'default'
}: ContentCardProps) {
  return (
    <div className={`rounded-2xl p-6 ${variantStyles[variant]} ${className}`}>
      {children}
    </div>
  );
}
