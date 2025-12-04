interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent' | 'info';
}

export default function Badge({ children, variant = 'default' }: BadgeProps) {
  const variants = {
    default: 'bg-gray-100 text-gray-500',
    accent: 'bg-accent/10 text-accent',
    info: 'bg-info/10 text-info',
  };

  return (
    <span className={`rounded px-2 py-0.5 text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
}
