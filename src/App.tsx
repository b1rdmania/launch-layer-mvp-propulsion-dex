
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { WalletProvider } from "@/contexts/WalletContext";

// Pages
import Index from "@/pages/Index";
import LandingPage from "@/pages/LandingPage";
import DiscoveryPage from "@/pages/DiscoveryPage";
import RaiseDetailPage from "@/pages/RaiseDetailPage";
import AdminPage from "@/pages/AdminPage";
import ClaimPage from "@/pages/ClaimPage";
import DocsPage from "@/pages/DocsPage";
import NotFound from "@/pages/NotFound";
import PitchDeckPage from "@/pages/PitchDeckPage";

// Layout Components
import LandingLayout from "@/components/layout/LandingLayout";
import Layout from "@/components/layout/Layout";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WalletProvider>
        <Router>
          <Routes>
            {/* Landing page route */}
            <Route
              path="/landing"
              element={
                <LandingLayout>
                  <LandingPage />
                </LandingLayout>
              }
            />
            
            {/* Pitch deck route */}
            <Route path="/pitch" element={<PitchDeckPage />} />
            
            {/* App routes with layout */}
            <Route
              path="/"
              element={
                <Layout>
                  <Index />
                </Layout>
              }
            />
            <Route
              path="/app"
              element={
                <Layout>
                  <DiscoveryPage />
                </Layout>
              }
            />
            <Route
              path="/app/raise/:address"
              element={
                <Layout>
                  <RaiseDetailPage />
                </Layout>
              }
            />
            <Route
              path="/admin"
              element={
                <Layout>
                  <AdminPage />
                </Layout>
              }
            />
            <Route
              path="/claim/:address"
              element={
                <Layout>
                  <ClaimPage />
                </Layout>
              }
            />
            <Route
              path="/docs/*"
              element={
                <Layout>
                  <DocsPage />
                </Layout>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
        <Toaster />
      </WalletProvider>
    </QueryClientProvider>
  );
}

export default App;
