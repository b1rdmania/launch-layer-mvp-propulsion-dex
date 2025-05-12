
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/contexts/WalletContext";
import { Github, MessagesSquare } from "lucide-react";
import MobileMenu from "./MobileMenu";

interface LandingLayoutProps {
  children: React.ReactNode;
}

const LandingLayout: React.FC<LandingLayoutProps> = ({ children }) => {
  const { isConnected, connect, address } = useWallet();
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="flex flex-col min-h-screen bg-launchlayer-background font-satoshi">
      {/* Landing page header */}
      <header className="w-full bg-launchlayer-surface sticky top-0 z-20 border-b border-launchlayer-surface-light">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/c51fee80-a5b6-42e5-b0af-fa129d0f3215.png" 
              alt="Launch Layer Logo" 
              className="h-8 w-auto mr-2" 
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-launchlayer-accent to-launchlayer-violet bg-clip-text text-transparent">
              Launch Layer
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/landing"
              className={`text-launchlayer-text-secondary hover:text-launchlayer-text-primary transition-all duration-200 hover-underline-animation ${isActive('/landing') ? 'active-step text-launchlayer-text-primary' : 'opacity-70 hover:opacity-100'}`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`text-launchlayer-text-secondary hover:text-launchlayer-text-primary transition-all duration-200 hover-underline-animation ${isActive('/about') ? 'active-step text-launchlayer-text-primary' : 'opacity-70 hover:opacity-100'}`}
            >
              About
            </Link>
            <Link
              to="/app"
              className={`text-launchlayer-text-secondary hover:text-launchlayer-text-primary transition-all duration-200 hover-underline-animation ${isActive('/app') ? 'active-step text-launchlayer-text-primary' : 'opacity-70 hover:opacity-100'}`}
            >
              Discover
            </Link>
            <Link
              to="/admin"
              className={`text-launchlayer-text-secondary hover:text-launchlayer-text-primary transition-all duration-200 hover-underline-violet ${isActive('/admin') ? 'active-step text-launchlayer-text-primary' : 'opacity-70 hover:opacity-100'}`}
            >
              Create Sale
            </Link>
          </nav>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <MobileMenu />
          </div>

          <div className="hidden md:block">
            {isConnected ? (
              <Link to="/app">
                <Button className="bg-launchlayer-accent hover:bg-launchlayer-accent/90 text-white shadow-sm hover:shadow-[0_0_6px_rgba(50,119,245,0.3)] transition-all duration-200 hover:scale-[1.03]">
                  Open App
                </Button>
              </Link>
            ) : (
              <Button
                onClick={connect}
                className="bg-launchlayer-accent hover:bg-launchlayer-accent/90 text-white shadow-sm hover:shadow-[0_0_6px_rgba(50,119,245,0.3)] transition-all duration-200 hover:scale-[1.03]"
              >
                Connect Wallet
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow">{children}</main>

      {/* Landing page footer */}
      <footer className="mt-auto py-8 px-4 border-t border-launchlayer-surface-light bg-launchlayer-surface">
        <div className="container mx-auto max-w-[1280px]">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center">
                <img 
                  src="/lovable-uploads/c51fee80-a5b6-42e5-b0af-fa129d0f3215.png" 
                  alt="Launch Layer Logo" 
                  className="h-6 w-auto mr-2" 
                />
                <span className="text-lg font-bold bg-gradient-to-r from-launchlayer-accent to-launchlayer-violet bg-clip-text text-transparent">
                  Launch Layer
                </span>
              </div>
              <p className="text-sm text-launchlayer-text-secondary mt-1">
                On-Chain Infrastructure. Not Investment Advice.
              </p>
            </div>

            <div className="flex gap-4 text-sm text-launchlayer-text-secondary">
              <a
                href="https://github.com/b1rdmania/launchlayer"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-launchlayer-text-primary transition-colors p-2 hover:scale-[1.1] transition-transform duration-200"
                aria-label="GitHub"
              >
                <Github size={20} className="hover:brightness-110 transition-all duration-200" />
              </a>
              <a
                href="https://discord.gg/launchlayer"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-launchlayer-text-primary transition-colors p-2 hover:scale-[1.1] transition-transform duration-200"
                aria-label="Discord"
              >
                <MessagesSquare size={20} className="hover:brightness-110 transition-all duration-200" />
              </a>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-launchlayer-surface-light text-sm text-launchlayer-text-secondary text-center">
            © 2025 Launch Layer. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Mobile fixed wallet button with enhanced styling */}
      <div className="fixed bottom-4 inset-x-0 flex justify-center md:hidden z-20">
        {!isConnected && (
          <Button
            onClick={connect}
            className="bg-launchlayer-accent hover:bg-launchlayer-accent/90 text-white shadow-[0_2px_10px_rgba(50,119,245,0.3)] hover:shadow-[0_0_16px_rgba(50,119,245,0.4)] transition-all duration-200 px-6 hover:scale-[1.03]"
          >
            Connect Wallet
          </Button>
        )}
      </div>
    </div>
  );
};

export default LandingLayout;
