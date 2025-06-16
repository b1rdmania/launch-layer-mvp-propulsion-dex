
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WalletProvider } from '@/contexts/WalletContext';
import { Toaster } from "@/components/ui/toaster";

import LandingPage from '@/pages/LandingPage';
import PitchDeckPage from '@/pages/PitchDeckPage';
import WhitePaperPage from '@/pages/WhitePaperPage';
import DocsPage from '@/pages/DocsPage';
import DiscoveryPage from '@/pages/DiscoveryPage';
import AirlocksPage from '@/pages/AirlocksPage';
import RaiseDetailPage from '@/pages/RaiseDetailPage';
import ClaimPage from '@/pages/ClaimPage';
import AdminPage from '@/pages/AdminPage';
import BetaUXPage from '@/pages/BetaUXPage';
import BridgePage from '@/pages/BridgePage';
import NotFound from '@/pages/NotFound';

import './App.css';

function App() {
  return (
    <WalletProvider>
      <Router>
        <div className="App">
          <Toaster />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/pitch-deck" element={<PitchDeckPage />} />
            <Route path="/white-paper" element={<WhitePaperPage />} />
            <Route path="/docs" element={<DocsPage />} />
            <Route path="/docs/:docId" element={<DocsPage />} />
            <Route path="/discovery" element={<DiscoveryPage />} />
            <Route path="/airlock/:id" element={<AirlocksPage />} />
            <Route path="/raise/:id" element={<RaiseDetailPage />} />
            <Route path="/claim/:raiseId" element={<ClaimPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/beta-ux" element={<BetaUXPage />} />
            <Route path="/bridge" element={<BridgePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </WalletProvider>
  );
}

export default App;
