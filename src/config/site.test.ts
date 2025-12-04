import { describe, it, expect } from 'vitest';
import { siteConfig } from './site';

describe('siteConfig', () => {
  it('has contact email configured', () => {
    expect(siteConfig.contact.email).toBeDefined();
    expect(siteConfig.contact.email).toContain('@');
  });

  it('has github link configured', () => {
    expect(siteConfig.links.github).toBeDefined();
    expect(siteConfig.links.github).toContain('github.com');
  });

  it('has site url configured', () => {
    expect(siteConfig.url).toBeDefined();
  });
});
