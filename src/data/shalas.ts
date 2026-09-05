import type { Shala } from '../types/shala';
import raw from './shalas.json';

// Shala entries are not translated, so they live here rather than in a locale.
// Add a shala by appending to shalas.json; shalas.test.ts validates each entry.
export const shalas = raw as Shala[];
