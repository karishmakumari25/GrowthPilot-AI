import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import About from '../pages/About';
import AIAnalyzer from '../pages/AIAnalyzer';
import Pricing from '../pages/Pricing';
import CompetitorAnalysis from '../pages/CompetitorAnalysis';
import ReferralProgram from '../pages/ReferralProgram';
import Contact from '../pages/Contact';
import Dashboard from '../pages/Dashboard';
import NotFound from '../pages/NotFound';

/**
 * Central route configuration for the app.
 * All public pages are registered here for easy maintenance.
 */
function AppRouter() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/ai-analyzer" element={<AIAnalyzer />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/competitor-analysis" element={<CompetitorAnalysis />} />
        <Route path="/referral-program" element={<ReferralProgram />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default AppRouter;
