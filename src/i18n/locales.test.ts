import { describe, it, expect } from 'vitest';

// Every locale must mirror the English key structure, so a missing or extra
// key in a translation fails here instead of rendering a raw key on the site.
const files = import.meta.glob('./locales/*/*.json', {
  eager: true,
  import: 'default',
}) as Record<string, unknown>;

function keyPaths(value: unknown, prefix = ''): string[] {
  if (Array.isArray(value) || typeof value !== 'object' || value === null) {
    return [prefix];
  }
  return Object.entries(value).flatMap(([k, v]) =>
    keyPaths(v, prefix ? `${prefix}.${k}` : k)
  );
}

const byLocale = new Map<string, Map<string, unknown>>();
for (const [path, json] of Object.entries(files)) {
  const [, locale, file] = path.match(/locales\/([^/]+)\/([^/]+)\.json$/) ?? [];
  if (!byLocale.has(locale)) byLocale.set(locale, new Map());
  byLocale.get(locale)!.set(file, json);
}

const en = byLocale.get('en')!;
const others = [...byLocale.keys()].filter((l) => l !== 'en');

describe('locales', () => {
  it('has English as the reference locale', () => {
    expect(en.size).toBeGreaterThan(0);
  });

  it.each(others)('%s has the same namespaces as en', (locale) => {
    expect([...byLocale.get(locale)!.keys()].sort()).toEqual(
      [...en.keys()].sort()
    );
  });

  it.each(others.flatMap((l) => [...en.keys()].map((f) => [l, f])))(
    '%s/%s.json has the same keys as en',
    (locale, file) => {
      const translated = byLocale.get(locale)!.get(file);
      expect(keyPaths(translated).sort()).toEqual(
        keyPaths(en.get(file)).sort()
      );
    }
  );
});
