import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout';
import { ScrollToTop } from './components/common';
import {
  Home,
  About,
  Contributing,
  GettingStarted,
  Glossary,
  NotFound,
  PrimarySeries,
} from './routes';

// Leaflet is only needed here, so the map bundle loads on demand
const Shalas = lazy(() => import('./routes/Shalas'));

/** Route table without a router, so tests can mount it in a MemoryRouter. */
export function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="getting-started" element={<GettingStarted />} />
          <Route path="primary-series" element={<PrimarySeries />} />
          <Route path="glossary" element={<Glossary />} />
          <Route path="about" element={<About />} />
          <Route path="contribute" element={<Contributing />} />
          <Route
            path="shalas"
            element={
              <Suspense fallback={null}>
                <Shalas />
              </Suspense>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
