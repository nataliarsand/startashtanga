interface ChecklistItemProps {
  title: string;
  description?: string;
}

export default function ChecklistItem({
  title,
  description,
}: ChecklistItemProps) {
  return (
    <div className="flex items-start gap-3 py-2">
      <div className="border-accent mt-0.5 h-5 w-5 flex-shrink-0 rounded border-2" />
      <div>
        <span className="text-heading font-medium">{title}</span>
        {description && (
          <p className="text-body mt-1 text-sm">{description}</p>
        )}
      </div>
    </div>
  );
}
