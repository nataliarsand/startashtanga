import type { PracticeOption, TeacherLevel } from '../types/shala';

// Glossary entries (matched by term) that explain each practice tag and
// teacher level on a shala card. shalaGlossary.test.ts checks they exist.
export const practiceGlossaryTerm: Partial<Record<PracticeOption, string>> = {
  mysore: 'Mysore Style',
  'led-primary': 'Led Class',
  'led-intermediate': 'Intermediate Series',
  pranayama: 'Pranayama',
  chanting: 'Mantra',
  meditation: 'Dhyana',
  conference: 'Conference',
};

export const teacherLevelGlossaryTerm: Record<TeacherLevel, string> = {
  certified: 'Certified',
  'authorized-2': 'Authorised',
  'authorized-1': 'Authorised',
  authorized: 'Authorised',
};
