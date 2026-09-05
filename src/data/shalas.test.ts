import { describe, it, expect } from 'vitest';
import { shalas } from './shalas';
import { PRACTICE_OPTIONS, TEACHER_LEVELS } from '../types/shala';

describe('shalas.json', () => {
  it('has unique, url-safe ids', () => {
    const ids = shalas.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) expect(id).toMatch(/^[a-z0-9-]+$/);
  });

  it.each(shalas)('$id is a complete entry', (shala) => {
    expect(shala.name.trim()).not.toBe('');
    expect(shala.city.trim()).not.toBe('');
    expect(shala.country.trim()).not.toBe('');
    expect(shala.address.trim()).not.toBe('');
    expect(shala.website).toMatch(/^https?:\/\//);
    expect(shala.lat).toBeGreaterThanOrEqual(-90);
    expect(shala.lat).toBeLessThanOrEqual(90);
    expect(shala.lng).toBeGreaterThanOrEqual(-180);
    expect(shala.lng).toBeLessThanOrEqual(180);
    expect(shala.teachers.length).toBeGreaterThan(0);
    for (const teacher of shala.teachers) {
      expect(teacher.name.trim()).not.toBe('');
      if (teacher.level) expect(TEACHER_LEVELS).toContain(teacher.level);
    }
    expect(shala.practices.length).toBeGreaterThan(0);
    for (const practice of shala.practices) {
      expect(PRACTICE_OPTIONS).toContain(practice);
    }
  });
});
