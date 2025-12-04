import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout';
import { ScrollToTop } from './components/common';
import { Home, About, Contributing, GettingStarted, Glossary, PrimarySeries } from './routes';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="getting-started" element={<GettingStarted />} />
          <Route path="primary-series" element={<PrimarySeries />} />
          <Route path="glossary" element={<Glossary />} />
          <Route path="about" element={<About />} />
          <Route path="contribute" element={<Contributing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
