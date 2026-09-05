import { describe, it, expect } from 'vitest';
import glossary from '../i18n/locales/en/glossary.json';
import {
  practiceGlossaryTerm,
  teacherLevelGlossaryTerm,
} from './shalaGlossary';

const terms = new Set(glossary.terms.map((t) => t.term));

describe('shala card glossary links', () => {
  it.each(Object.entries(practiceGlossaryTerm))(
    'practice %s points at an existing glossary term',
    (_practice, term) => {
      expect(terms).toContain(term);
    }
  );

  it.each(Object.entries(teacherLevelGlossaryTerm))(
    'level %s points at an existing glossary term',
    (_level, term) => {
      expect(terms).toContain(term);
    }
  );
});
