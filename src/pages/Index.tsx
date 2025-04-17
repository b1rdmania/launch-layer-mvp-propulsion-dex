import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useWallet } from "@/contexts/WalletContext";

const Index = () => {
  const navigate = useNavigate();
  const { isConnected } = useWallet();

  useEffect(() => {
    // If user has a wallet connected, redirect to the app
    // Otherwise, show the landing page
    if (isConnected) {
      navigate("/app");
    } else {
      navigate("/landing");
    }
  }, [isConnected, navigate]);

  // Show a loading state while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center bg-cradle-background">
      <div className="text-center">
        <div className="w-16 h-16 border-t-4 border-cradle-accent border-solid rounded-full animate-spin mx-auto mb-6"></div>
        <h1 className="text-2xl font-bold text-cradle-text-primary">
          Loading Launch Layer...
        </h1>
      </div>
    </div>
  );
};

export default Index;
