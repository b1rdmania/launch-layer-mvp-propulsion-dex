
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/contexts/WalletContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Github, ExternalLink, Rocket } from "lucide-react";
import MobileMenu from "./MobileMenu";

const Header: React.FC = () => {
  const { address, isConnected, isConnecting, connect, disconnect } =
    useWallet();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="w-full bg-launchlayer-surface sticky top-0 z-20 border-b border-launchlayer-surface-light">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Rocket size={24} className="text-launchlayer-accent" />
          <span className="text-2xl font-bold bg-gradient-to-r from-launchlayer-accent to-launchlayer-blue bg-clip-text text-transparent">
            Launch Layer
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className={`transition-colors relative ${
              isActive("/")
                ? "text-launchlayer-accent font-medium after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-launchlayer-accent after:bottom-[-8px] after:left-0"
                : "text-launchlayer-text-secondary hover:text-launchlayer-text-primary"
            }`}
          >
            Home
          </Link>
          <Link
            to="/app"
            className={`transition-colors relative ${
              isActive("/app")
                ? "text-launchlayer-accent font-medium after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-launchlayer-accent after:bottom-[-8px] after:left-0"
                : "text-launchlayer-text-secondary hover:text-launchlayer-text-primary"
            }`}
          >
            Discover
          </Link>
          <Link
            to="/admin"
            className={`transition-colors relative ${
              isActive("/admin")
                ? "text-launchlayer-accent font-medium after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-launchlayer-accent after:bottom-[-8px] after:left-0"
                : "text-launchlayer-text-secondary hover:text-launchlayer-text-primary"
            }`}
          >
            Create Sale
          </Link>
          <Link
            to="/docs"
            className={`transition-colors relative ${
              isActive("/docs")
                ? "text-launchlayer-accent font-medium after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-launchlayer-accent after:bottom-[-8px] after:left-0"
                : "text-launchlayer-text-secondary hover:text-launchlayer-text-primary"
            }`}
          >
            Docs
          </Link>
        </nav>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <MobileMenu />
        </div>

        {/* Wallet Connection and Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/b1rdmania/launchlayer"
                target="_blank"
                rel="noopener noreferrer"
                className="text-launchlayer-text-secondary hover:text-launchlayer-text-primary"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
            </div>

            {isConnected ? (
              <div className="flex items-center gap-2">
                <div className="hidden md:block px-3 py-1 bg-launchlayer-surface-light rounded-md text-sm font-mono">
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </div>
                <Button
                  variant="outline"
                  onClick={disconnect}
                  className="text-sm border-launchlayer-surface-light hover:bg-launchlayer-surface-light"
                >
                  Disconnect
                </Button>
              </div>
            ) : (
              <Button
                onClick={connect}
                disabled={isConnecting}
                className="bg-launchlayer-accent hover:bg-launchlayer-accent/90 text-white shadow-sm hover:shadow-md transition-all"
              >
                {isConnecting ? "Connecting..." : "Connect Wallet"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
