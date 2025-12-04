interface PageHeroProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export default function PageHero({ title, subtitle, children }: PageHeroProps) {
  return (
    <section className="bg-surface py-16 sm:py-20">
      <div className="container-main text-center">
        <h1 className="text-heading text-4xl font-bold tracking-tight sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="text-body mx-auto mt-4 max-w-xl text-lg">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
