
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/contexts/WalletContext";
import MobileMenu from "./MobileMenu";
import { useIsMobile } from "@/hooks/use-mobile";

const Header: React.FC = () => {
  const { address, isConnected, connect, disconnect } = useWallet();
  const location = useLocation();
  const isMobile = useIsMobile();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="p-4 sticky top-0 z-40 bg-launchlayer-background/80 backdrop-blur-sm border-b border-gray-800">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="mr-8 flex items-center">
            <img 
              src="/lovable-uploads/1599dec7-0c67-4bd8-90d2-40ffe4f3daf0.png" 
              alt="Launch Layer Logo" 
              className="h-8 w-auto mr-3" 
            />
            <span className="text-xl font-bold tracking-wider bg-gradient-to-r from-launchlayer-accent to-launchlayer-violet bg-clip-text text-transparent">
              Launch Layer
            </span>
          </Link>

          {!isMobile && (
            <nav className="hidden md:flex items-center gap-6">
              <Link
                to="/"
                className={`relative transition-all duration-200 ${
                  isActive("/")
                    ? "text-launchlayer-violet font-medium after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-launchlayer-violet after:bottom-[-4px] after:left-0"
                    : "text-launchlayer-text-secondary hover:text-launchlayer-text-primary"
                }`}
              >
                Home
              </Link>
              <Link
                to="/about"
                className={`relative transition-all duration-200 ${
                  isActive("/about")
                    ? "text-launchlayer-violet font-medium after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-launchlayer-violet after:bottom-[-4px] after:left-0"
                    : "text-launchlayer-text-secondary hover:text-launchlayer-text-primary"
                }`}
              >
                About
              </Link>
              <Link
                to="/app"
                className={`relative transition-all duration-200 ${
                  isActive("/app")
                    ? "text-launchlayer-violet font-medium after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-launchlayer-violet after:bottom-[-4px] after:left-0"
                    : "text-launchlayer-text-secondary hover:text-launchlayer-text-primary"
                }`}
              >
                Discover
              </Link>
              <Link
                to="/admin"
                className={`relative transition-all duration-200 ${
                  isActive("/admin")
                    ? "text-launchlayer-violet font-medium after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-launchlayer-violet after:bottom-[-4px] after:left-0"
                    : "text-launchlayer-text-secondary hover:text-launchlayer-text-primary"
                }`}
              >
                Create Sale
              </Link>
            </nav>
          )}
        </div>

        <div className="flex items-center gap-2">
          {isConnected ? (
            <div className="hidden md:flex items-center gap-2">
              <span className="px-3 py-1 bg-launchlayer-surface rounded-md text-sm font-mono">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </span>
              <Button variant="outline" size="sm" onClick={disconnect} className="border-launchlayer-surface-light">
                Disconnect
              </Button>
            </div>
          ) : (
            <Button
              onClick={connect}
              className="hidden md:flex items-center bg-launchlayer-accent hover:bg-launchlayer-accent/90 text-white"
            >
              Connect Wallet
            </Button>
          )}

          <MobileMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
