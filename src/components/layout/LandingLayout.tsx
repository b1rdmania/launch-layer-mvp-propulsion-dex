
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/contexts/WalletContext";
import { Github, MessagesSquare, X } from "lucide-react";
import MobileMenu from "./MobileMenu";

interface LandingLayoutProps {
  children: React.ReactNode;
}

const LandingLayout: React.FC<LandingLayoutProps> = ({ children }) => {
  const { isConnected, connect } = useWallet();
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
              src="/lovable-uploads/c054fc20-c0d7-4c0c-9d55-8dc40e350c79.png" 
              alt="Launch Layer Logo" 
              className="h-10 w-auto mr-3" 
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-launchlayer-accent to-launchlayer-violet bg-clip-text text-transparent">
              Launch Layer
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/landing"
              className={`relative transition-all duration-200 ${
                isActive('/landing') 
                  ? 'text-launchlayer-accent font-medium after:content-[""] after:absolute after:w-full after:h-0.5 after:bg-launchlayer-accent after:bottom-[-4px] after:left-0' 
                  : 'text-launchlayer-text-secondary hover:text-launchlayer-text-primary'
              }`}
            >
              Home
            </Link>
            <Link
              to="/app"
              className={`relative transition-all duration-200 ${
                isActive('/app') 
                  ? 'text-launchlayer-accent font-medium after:content-[""] after:absolute after:w-full after:h-0.5 after:bg-launchlayer-accent after:bottom-[-4px] after:left-0' 
                  : 'text-launchlayer-text-secondary hover:text-launchlayer-text-primary'
              }`}
            >
              Discover
            </Link>
            <Link
              to="/admin"
              className={`relative transition-all duration-200 ${
                isActive('/admin') 
                  ? 'text-launchlayer-accent font-medium after:content-[""] after:absolute after:w-full after:h-0.5 after:bg-launchlayer-accent after:bottom-[-4px] after:left-0' 
                  : 'text-launchlayer-text-secondary hover:text-launchlayer-text-primary'
              }`}
            >
              Create Sale
            </Link>
            <a
              href="https://launch-layer.gitbook.io/launchlayer"
              target="_blank"
              rel="noopener noreferrer"
              className="text-launchlayer-text-secondary hover:text-launchlayer-text-primary relative transition-all duration-200"
            >
              Docs
            </a>
          </nav>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <MobileMenu />
          </div>

          <div className="hidden md:block">
            {isConnected ? (
              <Link to="/app">
                <Button variant="accent" className="text-white">
                  Open App
                </Button>
              </Link>
            ) : (
              <Button
                onClick={connect}
                variant="accent"
                className="text-white"
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
                  src="/lovable-uploads/a65bc258-aa72-465f-a387-1875b787c1c4.png" 
                  alt="Launch Layer Logo" 
                  className="h-6 w-auto mr-3" 
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
                className="hover:text-launchlayer-accent transition-colors p-2 hover:scale-[1.1] transition-transform duration-200"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://x.com/launchlayerio"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-launchlayer-accent transition-colors p-2 hover:scale-[1.1] transition-transform duration-200"
                aria-label="X (Twitter)"
              >
                <X size={20} />
              </a>
              <a
                href="https://discord.gg/xVCnBxVU4X"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-launchlayer-accent transition-colors p-2 hover:scale-[1.1] transition-transform duration-200"
                aria-label="Discord"
              >
                <MessagesSquare size={20} />
              </a>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-launchlayer-surface-light text-sm text-launchlayer-text-secondary text-center">
            © 2025 Launch Layer. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Mobile fixed wallet button */}
      <div className="fixed bottom-4 inset-x-0 flex justify-center md:hidden z-20">
        {!isConnected && (
          <Button
            onClick={connect}
            variant="accent"
            className="text-white shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Connect Wallet
          </Button>
        )}
      </div>
    </div>
  );
};

export default LandingLayout;
