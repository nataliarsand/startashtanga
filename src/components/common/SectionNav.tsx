interface NavItem {
  id: string;
  label: string;
}

interface SectionNavProps {
  items: NavItem[];
}

export default function SectionNav({ items }: SectionNavProps) {
  return (
    <nav className="mx-auto mt-8 flex max-w-2xl flex-wrap justify-center gap-2">
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className="text-body rounded-full bg-white px-4 py-2 text-sm font-medium transition-all hover:opacity-80"
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
