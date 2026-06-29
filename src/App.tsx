import { Route, Routes } from 'react-router-dom';
import { DocumentLanguageSync } from './components/DocumentLanguageSync';
import { SkipLink } from './components/SkipLink';
import ConnectFlow from './pages/ConnectFlow';
import ResourcesPage from './pages/ResourcesPage';
import AboutPage from './pages/AboutPage';

export default function App() {
  return (
    <>
      <SkipLink />
      <DocumentLanguageSync />
      <Routes>
        <Route path="/" element={<ConnectFlow />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </>
  );
}
