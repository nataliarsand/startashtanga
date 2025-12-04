interface PageHeroProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export default function PageHero({ title, subtitle, children }: PageHeroProps) {
  return (
    <section
      className="py-16 sm:py-20"
      style={{ backgroundColor: '#F5EDDF' }}
    >
      <div className="container-main text-center">
        <h1
          className="text-4xl font-bold tracking-tight sm:text-5xl"
          style={{ color: '#4F3130' }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-xl text-lg" style={{ color: '#753742' }}>
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
