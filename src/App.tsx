
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { WalletProvider } from "@/contexts/WalletContext";
import { useState } from "react";

// Pages
import LandingPage from "@/pages/LandingPage";
import PitchDeckPage from "@/pages/PitchDeckPage";
import WhitePaperPage from "@/pages/WhitePaperPage";
import NotFound from "@/pages/NotFound";

function App() {
  // Create QueryClient inside the component to ensure proper React context
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 1,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <WalletProvider>
        <Router>
          <Routes>
            {/* Main route now shows the landing page */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/pitch" element={<PitchDeckPage />} />
            <Route path="/app" element={<PitchDeckPage />} />
            <Route path="/whitepaper" element={<WhitePaperPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
        <Toaster />
      </WalletProvider>
    </QueryClientProvider>
  );
}

export default App;
