import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/i18n';
import { AppRoutes } from './App';

// Leaflet needs a real layout engine; the map has its own component boundary
vi.mock('./components/common/ShalaMap', () => ({
  default: () => <div data-testid="shala-map" />,
}));

const routes: Array<{ path: string; heading: RegExp }> = [
  { path: '/', heading: /start ashtanga/i },
  { path: '/getting-started', heading: /getting started/i },
  { path: '/primary-series', heading: /primary series/i },
  { path: '/glossary', heading: /glossary/i },
  { path: '/about', heading: /about/i },
  { path: '/contribute', heading: /contribut/i },
  { path: '/shalas', heading: /shala/i },
  { path: '/does-not-exist', heading: /404/ },
];

function renderAt(path: string) {
  return render(
    <I18nextProvider i18n={i18n}>
      <MemoryRouter initialEntries={[path]}>
        <AppRoutes />
      </MemoryRouter>
    </I18nextProvider>
  );
}

describe('routes', () => {
  it.each(routes)(
    '$path renders its page heading',
    async ({ path, heading }) => {
      renderAt(path);
      expect(
        await screen.findByRole('heading', { level: 1, name: heading })
      ).toBeInTheDocument();
    }
  );

  it('/shalas lists every shala in the directory', async () => {
    renderAt('/shalas');
    const { shalas } = await import('./data/shalas');
    expect(await screen.findByTestId('shala-map')).toBeInTheDocument();
    for (const shala of shalas) {
      expect(screen.getByText(shala.name)).toBeInTheDocument();
    }
  });

  it('sets the document title from the SEO namespace', async () => {
    renderAt('/glossary');
    await screen.findByRole('heading', { level: 1 });
    expect(document.title).toMatch(/glossary/i);
  });
});
