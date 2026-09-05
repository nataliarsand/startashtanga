export const PRACTICE_OPTIONS = [
  'mysore',
  'led-primary',
  'led-intermediate',
  'pranayama',
  'chanting',
  'meditation',
  'conference',
  'philosophy',
  'online',
] as const;

export type PracticeOption = (typeof PRACTICE_OPTIONS)[number];

export const TEACHER_LEVELS = [
  'certified',
  'authorized-2',
  'authorized-1',
] as const;

export type TeacherLevel = (typeof TEACHER_LEVELS)[number];

export interface Teacher {
  name: string;
  level?: TeacherLevel;
}

export interface Shala {
  id: string;
  name: string;
  city: string;
  country: string;
  address: string;
  teachers: Teacher[];
  practices: PracticeOption[];
  website: string;
  lat: number;
  lng: number;
}

export interface Coordinates {
  lat: number;
  lng: number;
}
