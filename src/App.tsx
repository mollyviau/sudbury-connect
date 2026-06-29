import { Route, Routes } from 'react-router-dom';
import ConnectFlow from './pages/ConnectFlow';
import ResourcesPage from './pages/ResourcesPage';
import AboutPage from './pages/AboutPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ConnectFlow />} />
      <Route path="/resources" element={<ResourcesPage />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  );
}
