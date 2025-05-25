
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, X, MessagesSquare } from "lucide-react";
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
        <SheetHeader className="border-b border-launchlayer-surface-light pb-4 mb-6">
          <SheetTitle className="text-launchlayer-text-primary">Menu</SheetTitle>
        </SheetHeader>
        
        <nav className="flex flex-col gap-6">
          <Link
            to="/landing"
            className={`transition-all duration-200 ${
              isActive("/landing")
                ? "text-launchlayer-accent font-medium"
                : "text-launchlayer-text-secondary hover:text-launchlayer-text-primary"
            }`}
          >
            Home
          </Link>
          <Link
            to="/app"
            className={`transition-all duration-200 ${
              isActive("/app")
                ? "text-launchlayer-accent font-medium"
                : "text-launchlayer-text-secondary hover:text-launchlayer-text-primary"
            }`}
          >
            Discover
          </Link>
          <Link
            to="/admin"
            className={`transition-all duration-200 ${
              isActive("/admin")
                ? "text-launchlayer-accent font-medium"
                : "text-launchlayer-text-secondary hover:text-launchlayer-text-primary"
            }`}
          >
            Create Sale
          </Link>

          <div className="space-y-4 pt-2">
            <h4 className="text-sm font-medium text-launchlayer-text-primary">
              Resources
            </h4>
            <div className="pl-2 space-y-4">
              <a
                href="https://launch-layer.gitbook.io/launchlayer"
                target="_blank"
                rel="noopener noreferrer"
                className="text-launchlayer-text-secondary hover:text-launchlayer-accent flex items-center gap-2 transition-all duration-200"
              >
                Documentation <ExternalLink size={14} />
              </a>
              <a
                href="https://github.com/b1rdmania/launchlayer"
                target="_blank"
                rel="noopener noreferrer"
                className="text-launchlayer-text-secondary hover:text-launchlayer-accent flex items-center gap-2 transition-all duration-200"
              >
                GitHub <Github size={14} />
              </a>
              <a
                href="https://x.com/launchlayerio"
                target="_blank"
                rel="noopener noreferrer"
                className="text-launchlayer-text-secondary hover:text-launchlayer-accent flex items-center gap-2 transition-all duration-200"
              >
                X (Twitter) <X size={14} />
              </a>
              <a
                href="https://discord.gg/xVCnBxVU4X"
                target="_blank"
                rel="noopener noreferrer"
                className="text-launchlayer-text-secondary hover:text-launchlayer-accent flex items-center gap-2 transition-all duration-200"
              >
                Discord <MessagesSquare size={14} />
              </a>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-launchlayer-surface-light">
            {isConnected ? (
              <div className="space-y-3">
                <div className="px-3 py-2 bg-launchlayer-surface-light rounded-lg text-sm font-mono text-center border border-launchlayer-surface-light">
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
                variant="accent"
                className="w-full text-white"
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
