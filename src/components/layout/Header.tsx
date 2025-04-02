
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/contexts/WalletContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Github, Twitter, MessagesSquare, ExternalLink, RocketIcon } from 'lucide-react';
import MobileMenu from './MobileMenu';

const Header: React.FC = () => {
  const { address, isConnected, isConnecting, connect, disconnect } = useWallet();
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="w-full bg-cradle-surface sticky top-0 z-20 border-b border-cradle-surface-light">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-cradle-accent to-blue-400 bg-clip-text text-transparent">
            Cradle.build
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            to="/app" 
            className={`transition-colors ${isActive('/app') 
              ? 'text-cradle-accent font-medium' 
              : 'text-cradle-text-secondary hover:text-cradle-text-primary'}`}
          >
            Discover
          </Link>
          <Link 
            to="/admin" 
            className={`transition-colors ${isActive('/admin') 
              ? 'text-cradle-accent font-medium' 
              : 'text-cradle-text-secondary hover:text-cradle-text-primary'}`}
          >
            Admin
          </Link>
          
          {/* Resources Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-cradle-text-secondary hover:text-cradle-text-primary focus:outline-none">
              Resources <ChevronDown size={16} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-cradle-surface border border-cradle-surface-light">
              <DropdownMenuLabel className="text-cradle-text-primary">Documentation</DropdownMenuLabel>
              <DropdownMenuItem className="text-cradle-text-secondary hover:text-cradle-accent cursor-pointer flex items-center gap-2">
                Docs <ExternalLink size={14} />
              </DropdownMenuItem>
              <DropdownMenuItem className="text-cradle-text-secondary hover:text-cradle-accent cursor-pointer flex items-center gap-2">
                API References <ExternalLink size={14} />
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-cradle-surface-light" />
              <DropdownMenuLabel className="text-cradle-text-primary">Resources</DropdownMenuLabel>
              <DropdownMenuItem className="text-cradle-text-secondary hover:text-cradle-accent cursor-pointer flex items-center gap-2">
                GitHub <Github size={14} />
              </DropdownMenuItem>
              <DropdownMenuItem className="text-cradle-text-secondary hover:text-cradle-accent cursor-pointer flex items-center gap-2">
                Community <MessagesSquare size={14} />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <MobileMenu />
        </div>

        {/* Wallet Connection and Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {/* Deploy Raise Button */}
          <Link to="/admin">
            <Button 
              className="bg-cradle-accent hover:bg-cradle-accent/90 text-white flex items-center gap-1"
              size="sm"
            >
              <RocketIcon size={16} />
              Deploy Raise
            </Button>
          </Link>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-cradle-text-secondary hover:text-cradle-text-primary" aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-cradle-text-secondary hover:text-cradle-text-primary" aria-label="GitHub">
                <Github size={18} />
              </a>
            </div>
            
            {isConnected ? (
              <div className="flex items-center gap-2">
                <div className="hidden md:block px-3 py-1 bg-cradle-surface-light rounded-md text-sm font-mono">
                  {address?.slice(0, 6)}...{address?.slice(-4)}
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
      </div>
    </header>
  );
};

export default Header;
