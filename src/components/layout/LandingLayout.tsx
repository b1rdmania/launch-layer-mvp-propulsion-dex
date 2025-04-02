
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/contexts/WalletContext';
import { Github, Twitter, MessagesSquare } from 'lucide-react';

interface LandingLayoutProps {
  children: React.ReactNode;
}

const LandingLayout: React.FC<LandingLayoutProps> = ({ children }) => {
  const { isConnected, connect, address } = useWallet();

  return (
    <div className="flex flex-col min-h-screen bg-cradle-background">
      {/* Landing page header */}
      <header className="w-full bg-cradle-surface sticky top-0 z-20 border-b border-cradle-surface-light">
        <div className="container mx-auto px-8 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-cradle-accent to-blue-400 bg-clip-text text-transparent">
              Cradle.build
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link to="/app" className="text-cradle-text-secondary hover:text-cradle-text-primary transition-colors">
              Discover
            </Link>
            <Link to="/admin" className="text-cradle-text-secondary hover:text-cradle-text-primary transition-colors">
              Create Sale
            </Link>
            <Link to="/docs" className="text-cradle-text-secondary hover:text-cradle-text-primary transition-colors">
              Docs
            </Link>
          </nav>

          <div>
            {isConnected ? (
              <Link to="/app">
                <Button className="bg-cradle-accent hover:bg-cradle-accent/90 text-white">
                  Open App
                </Button>
              </Link>
            ) : (
              <Button onClick={connect} className="bg-cradle-accent hover:bg-cradle-accent/90 text-white">
                Connect Wallet
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Landing page footer */}
      <footer className="mt-auto py-8 px-8 border-t border-cradle-surface-light bg-cradle-surface">
        <div className="container mx-auto max-w-[1280px]">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-lg font-bold bg-gradient-to-r from-cradle-accent to-blue-400 bg-clip-text text-transparent">
                Cradle.build
              </span>
              <p className="text-sm text-cradle-text-secondary mt-1">
                On-Chain Infrastructure. Not Investment Advice.
              </p>
            </div>
            
            <div className="flex gap-4 text-sm text-cradle-text-secondary">
              <a href="https://twitter.com/cradle_build" target="_blank" rel="noopener noreferrer" className="hover:text-cradle-text-primary transition-colors p-2" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="https://discord.gg/cradle" target="_blank" rel="noopener noreferrer" className="hover:text-cradle-text-primary transition-colors p-2" aria-label="Discord">
                <MessagesSquare size={20} />
              </a>
              <a href="https://github.com/cradle-build" target="_blank" rel="noopener noreferrer" className="hover:text-cradle-text-primary transition-colors p-2" aria-label="GitHub">
                <Github size={20} />
              </a>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-cradle-surface-light text-sm text-cradle-text-secondary text-center">
            © 2025 Cradle.build. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingLayout;
