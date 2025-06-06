
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { WalletProvider } from "@/contexts/WalletContext";

// Pages
import PitchDeckPage from "@/pages/PitchDeckPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WalletProvider>
        <Router>
          <Routes>
            {/* Main route now shows the pitch deck */}
            <Route path="/" element={<PitchDeckPage />} />
            <Route path="/pitch" element={<PitchDeckPage />} />
            <Route path="/landing" element={<PitchDeckPage />} />
            <Route path="/app" element={<PitchDeckPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
        <Toaster />
      </WalletProvider>
    </QueryClientProvider>
  );
}

export default App;
