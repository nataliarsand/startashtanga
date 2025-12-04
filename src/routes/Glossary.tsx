import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { PageHero } from '../components/common';

interface GlossaryTerm {
  term: string;
  sanskrit?: string;
  definition: string;
}

export default function Glossary() {
  const { t } = useTranslation('glossary');
  const [searchQuery, setSearchQuery] = useState('');

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
        {/* Search */}
        <div className="mx-auto mt-8 max-w-md">
          <div className="relative">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2"
              style={{ color: '#967369' }}
            />
            <input
              type="text"
              placeholder={t('search.placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border-2 py-3 pl-11 pr-4 text-sm transition-colors focus:outline-none"
              style={{
                borderColor: '#DCC8AF',
                backgroundColor: '#FFFFFF',
                color: '#4F3130',
              }}
            />
          </div>
        </div>
      </PageHero>

      {/* Terms */}
      <div className="bg-white py-16 sm:py-20">
        <div className="container-main max-w-3xl">
          {filteredTerms.length === 0 ? (
            <p className="text-center" style={{ color: '#753742' }}>
              No terms found matching "{searchQuery}"
            </p>
          ) : (
            <div className="space-y-4">
              {filteredTerms.map((item, index) => (
                <div
                  key={index}
                  className="rounded-xl p-5 transition-shadow hover:shadow-md"
                  style={{ backgroundColor: '#F5EDDF' }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3
                        className="text-lg font-semibold"
                        style={{ color: '#4F3130' }}
                      >
                        {item.term}
                      </h3>
                      {item.sanskrit && (
                        <p
                          className="mt-0.5 text-sm font-medium"
                          style={{ color: '#AA5042' }}
                        >
                          {item.sanskrit}
                        </p>
                      )}
                    </div>
                  </div>
                  <p className="mt-2 leading-relaxed" style={{ color: '#753742' }}>
                    {item.definition}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Term count */}
          <p
            className="mt-8 text-center text-sm"
            style={{ color: '#967369' }}
          >
            {filteredTerms.length} {filteredTerms.length === 1 ? 'term' : 'terms'}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
        </div>
      </div>
    </>
  );
}
