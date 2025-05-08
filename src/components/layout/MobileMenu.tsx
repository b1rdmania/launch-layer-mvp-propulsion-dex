
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { useWallet } from "@/contexts/WalletContext";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

const MobileMenu: React.FC = () => {
  const { address, isConnected, connect, disconnect } = useWallet();
  const location = useLocation();
  const isMobile = useIsMobile();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  if (!isMobile) return null;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <span className="sr-only">Toggle menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="bg-launchlayer-surface border-launchlayer-surface-light w-[85%] max-w-[400px]"
      >
        <SheetHeader className="border-b border-launchlayer-surface-light pb-4 mb-4">
          <SheetTitle className="text-launchlayer-text-primary">Menu</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-6 pt-2">
          <Link
            to="/"
            className={`transition-all duration-200 ${
              isActive("/")
                ? "text-launchlayer-violet font-medium"
                : "text-launchlayer-text-secondary hover:text-launchlayer-text-primary"
            }`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`transition-all duration-200 ${
              isActive("/about")
                ? "text-launchlayer-violet font-medium"
                : "text-launchlayer-text-secondary hover:text-launchlayer-text-primary"
            }`}
          >
            About
          </Link>
          <Link
            to="/app"
            className={`transition-all duration-200 ${
              isActive("/app")
                ? "text-launchlayer-violet font-medium"
                : "text-launchlayer-text-secondary hover:text-launchlayer-text-primary"
            }`}
          >
            Discover
          </Link>
          <Link
            to="/admin"
            className={`transition-all duration-200 ${
              isActive("/admin")
                ? "text-launchlayer-violet font-medium"
                : "text-launchlayer-text-secondary hover:text-launchlayer-text-primary"
            }`}
          >
            Create Sale
          </Link>

          <div className="space-y-2">
            <h4 className="text-sm font-medium text-launchlayer-text-primary mb-2">
              Resources
            </h4>
            <div className="pl-2 space-y-3">
              <a
                href="https://github.com/b1rdmania/launchlayer"
                target="_blank"
                rel="noopener noreferrer"
                className="text-launchlayer-text-secondary hover:text-launchlayer-violet flex items-center gap-2 transition-all duration-200"
              >
                GitHub <ExternalLink size={14} />
              </a>
            </div>
          </div>

          <div className="mt-4">
            {isConnected ? (
              <div className="space-y-2 mt-4">
                <div className="px-3 py-2 bg-launchlayer-surface-light rounded-md text-sm font-mono text-center">
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </div>
                <Button
                  variant="outline"
                  onClick={disconnect}
                  className="w-full text-sm border-launchlayer-surface-light hover:bg-launchlayer-surface-light"
                >
                  Disconnect Wallet
                </Button>
              </div>
            ) : (
              <Button
                onClick={connect}
                className="w-full mt-4 bg-gradient-to-r from-launchlayer-accent to-launchlayer-violet hover:bg-launchlayer-accent/90 text-white hover:shadow-[0_0_10px_rgba(112,99,248,0.3)]"
              >
                Connect Wallet
              </Button>
            )}
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
