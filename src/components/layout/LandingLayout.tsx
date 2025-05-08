
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/contexts/WalletContext";
import { Github, MessagesSquare, Rocket } from "lucide-react";
import MobileMenu from "./MobileMenu";

interface LandingLayoutProps {
  children: React.ReactNode;
}

const LandingLayout: React.FC<LandingLayoutProps> = ({ children }) => {
  const { isConnected, connect, address } = useWallet();

  return (
    <div className="flex flex-col min-h-screen bg-launchlayer-background">
      {/* Landing page header */}
      <header className="w-full bg-launchlayer-surface sticky top-0 z-20 border-b border-launchlayer-surface-light">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Rocket size={24} className="text-launchlayer-accent" />
            <span className="text-2xl font-bold bg-gradient-to-r from-launchlayer-accent to-launchlayer-blue bg-clip-text text-transparent">
              Launch Layer
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/landing"
              className="text-launchlayer-text-secondary hover:text-launchlayer-text-primary transition-colors relative hover:after:content-[''] hover:after:absolute hover:after:w-full hover:after:h-0.5 hover:after:bg-launchlayer-accent hover:after:bottom-[-8px] hover:after:left-0"
            >
              Home
            </Link>
            <Link
              to="/app"
              className="text-launchlayer-text-secondary hover:text-launchlayer-text-primary transition-colors relative hover:after:content-[''] hover:after:absolute hover:after:w-full hover:after:h-0.5 hover:after:bg-launchlayer-accent hover:after:bottom-[-8px] hover:after:left-0"
            >
              Discover
            </Link>
            <Link
              to="/admin"
              className="text-launchlayer-text-secondary hover:text-launchlayer-text-primary transition-colors relative hover:after:content-[''] hover:after:absolute hover:after:w-full hover:after:h-0.5 hover:after:bg-launchlayer-accent hover:after:bottom-[-8px] hover:after:left-0"
            >
              Create Sale
            </Link>
            <Link
              to="/docs"
              className="text-launchlayer-text-secondary hover:text-launchlayer-text-primary transition-colors relative hover:after:content-[''] hover:after:absolute hover:after:w-full hover:after:h-0.5 hover:after:bg-launchlayer-accent hover:after:bottom-[-8px] hover:after:left-0"
            >
              Docs
            </Link>
          </nav>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <MobileMenu />
          </div>

          <div className="hidden md:block">
            {isConnected ? (
              <Link to="/app">
                <Button className="bg-launchlayer-accent hover:bg-launchlayer-accent/90 text-white shadow-sm hover:shadow-md transition-all">
                  Open App
                </Button>
              </Link>
            ) : (
              <Button
                onClick={connect}
                className="bg-launchlayer-accent hover:bg-launchlayer-accent/90 text-white shadow-sm hover:shadow-md transition-all"
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
              <div className="flex items-center gap-2">
                <Rocket size={20} className="text-launchlayer-accent" />
                <span className="text-lg font-bold bg-gradient-to-r from-launchlayer-accent to-launchlayer-blue bg-clip-text text-transparent">
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
                className="hover:text-launchlayer-text-primary transition-colors p-2"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://discord.gg/launchlayer"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-launchlayer-text-primary transition-colors p-2"
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
    </div>
  );
};

export default LandingLayout;
