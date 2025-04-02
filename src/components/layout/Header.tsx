
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/contexts/WalletContext';

const Header: React.FC = () => {
  const { address, isConnected, isConnecting, connect, disconnect } = useWallet();
  
  return (
    <header className="w-full bg-cradle-surface sticky top-0 z-20 border-b border-cradle-surface-light">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
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
            Admin
          </Link>
          <a href="#" className="text-cradle-text-secondary hover:text-cradle-text-primary transition-colors">
            Docs
          </a>
        </nav>

        <div className="flex items-center gap-4">
          {isConnected ? (
            <div className="flex items-center gap-2">
              <div className="hidden md:block px-3 py-1 bg-cradle-surface-light rounded-md text-sm font-mono">
                {address}
              </div>
              <Button 
                variant="outline" 
                onClick={disconnect}
                className="text-sm border-cradle-surface-light hover:bg-cradle-surface-light"
              >
                Disconnect
              </Button>
            </div>
          ) : (
            <Button 
              onClick={connect}
              disabled={isConnecting}
              className="bg-cradle-accent hover:bg-cradle-accent/90 text-white"
            >
              {isConnecting ? 'Connecting...' : 'Connect Wallet'}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
