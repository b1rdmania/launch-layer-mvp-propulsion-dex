
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { WalletProvider } from "@/contexts/WalletContext";

// Pages
import LandingPage from "@/pages/LandingPage";
import WhitePaperPage from "@/pages/WhitePaperPage";
import BetaUXPage from "@/pages/BetaUXPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WalletProvider>
        <Router>
          <Routes>
            {/* Main route now shows the landing page */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/pitch" element={<LandingPage />} />
            <Route path="/app" element={<LandingPage />} />
            <Route path="/whitepaper" element={<WhitePaperPage />} />
            <Route path="/beta-ux" element={<BetaUXPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
        <Toaster />
      </WalletProvider>
    </QueryClientProvider>
  );
}

export default App;
