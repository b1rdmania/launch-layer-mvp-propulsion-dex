
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { WalletProvider } from "@/contexts/WalletContext";
import Layout from "@/components/layout/Layout";
import LandingLayout from "@/components/layout/LandingLayout";
import LandingPage from "@/pages/LandingPage";
import AboutPage from "@/pages/AboutPage";
import Index from "@/pages/Index";
import DiscoveryPage from "@/pages/DiscoveryPage";
import RaiseDetailPage from "@/pages/RaiseDetailPage";
import ClaimPage from "@/pages/ClaimPage";
import AdminPage from "@/pages/AdminPage";
import DocsPage from "@/pages/DocsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <WalletProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Index redirect */}
            <Route path="/" element={<Index />} />

            {/* Landing page with special layout */}
            <Route
              path="/landing"
              element={
                <LandingLayout>
                  <LandingPage />
                </LandingLayout>
              }
            />

            {/* About page */}
            <Route
              path="/about"
              element={
                <Layout>
                  <AboutPage />
                </Layout>
              }
            />

            {/* App routes with standard layout */}
            <Route
              path="/app"
              element={
                <Layout>
                  <DiscoveryPage />
                </Layout>
              }
            />
            <Route
              path="/raise/:raiseAddress"
              element={
                <Layout>
                  <RaiseDetailPage />
                </Layout>
              }
            />
            <Route
              path="/claim/:raiseAddress"
              element={
                <Layout>
                  <ClaimPage />
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
              path="/docs"
              element={
                <Layout>
                  <DocsPage />
                </Layout>
              }
            />
            <Route
              path="*"
              element={
                <Layout>
                  <NotFound />
                </Layout>
              }
            />
          </Routes>
        </BrowserRouter>
      </WalletProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
