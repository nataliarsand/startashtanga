import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { PageHero, SearchInput } from '../components/common';
import { useSEO } from '../hooks';

interface GlossaryTerm {
  term: string;
  sanskrit?: string;
  definition: string;
}

export default function Glossary() {
  const { t } = useTranslation('glossary');
  const [searchQuery, setSearchQuery] = useState('');

  useSEO({ page: 'glossary' });

  const terms = t('terms', { returnObjects: true }) as GlossaryTerm[];

  const filteredTerms = useMemo(() => {
    if (!searchQuery.trim()) return terms;
    const query = searchQuery.toLowerCase();
    return terms.filter(
      (term) =>
        term.term.toLowerCase().includes(query) ||
        term.definition.toLowerCase().includes(query) ||
        (term.sanskrit && term.sanskrit.includes(query))
    );
  }, [terms, searchQuery]);

  return (
    <>
      <PageHero title={t('hero.title')} subtitle={t('hero.subtitle')}>
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder={t('search.placeholder')}
          className="mx-auto mt-8 max-w-md"
        />
      </PageHero>

      {/* Terms */}
      <div className="bg-white py-16 sm:py-20">
        <div className="container-main max-w-3xl">
          {filteredTerms.length === 0 ? (
            <p className="text-body text-center">
              No terms found matching "{searchQuery}"
            </p>
          ) : (
            <div className="space-y-4">
              {filteredTerms.map((item, index) => (
                <div
                  key={index}
                  className="bg-surface rounded-xl p-5 transition-shadow hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-heading text-lg font-semibold">
                        {item.term}
                      </h3>
                      {item.sanskrit && (
                        <p className="text-accent mt-0.5 text-sm font-medium">
                          {item.sanskrit}
                        </p>
                      )}
                    </div>
                  </div>
                  <p className="text-body mt-2 leading-relaxed">
                    {item.definition}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Term count */}
          <p className="text-subtle mt-8 text-center text-sm">
            {filteredTerms.length} {filteredTerms.length === 1 ? 'term' : 'terms'}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
        </div>
      </div>
    </>
  );
}
