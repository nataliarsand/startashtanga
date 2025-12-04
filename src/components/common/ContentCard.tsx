interface ContentCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'cream' | 'white';
}

export default function ContentCard({
  children,
  className = '',
  variant = 'cream'
}: ContentCardProps) {
  const bgColor = variant === 'cream' ? '#F5EDDF' : '#FFFFFF';

  return (
    <div
      className={`rounded-2xl p-6 ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      {children}
    </div>
  );
}
