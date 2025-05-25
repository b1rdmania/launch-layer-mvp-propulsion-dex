
import React from "react";
import { Link } from "react-router-dom";
import { Github, MessagesSquare, Rocket, X } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto py-8 px-4 border-t border-launchlayer-surface-light">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center gap-2">
              <img 
                src="/lovable-uploads/a65bc258-aa72-465f-a387-1875b787c1c4.png" 
                alt="Launch Layer Logo"
                className="h-12 w-auto mr-2" 
              />
              <span className="text-lg font-bold bg-gradient-to-r from-launchlayer-accent to-launchlayer-blue bg-clip-text text-transparent">
                Launch Layer
              </span>
            </div>
            <p className="text-sm text-launchlayer-text-secondary mt-1">
              The token launchpad for Sonic Network
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            <div className="flex gap-6 text-sm text-launchlayer-text-secondary">
              <Link
                to="/landing"
                className="hover:text-launchlayer-text-primary transition-colors hover:after:content-[''] hover:after:absolute hover:after:w-full hover:after:h-0.5 hover:after:bg-launchlayer-accent hover:after:bottom-[-4px] hover:after:left-0 relative"
              >
                Home
              </Link>
              <Link
                to="/app"
                className="hover:text-launchlayer-text-primary transition-colors hover:after:content-[''] hover:after:absolute hover:after:w-full hover:after:h-0.5 hover:after:bg-launchlayer-accent hover:after:bottom-[-4px] hover:after:left-0 relative"
              >
                App
              </Link>
              <a
                href="https://launch-layer.gitbook.io/launchlayer"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-launchlayer-text-primary transition-colors hover:after:content-[''] hover:after:absolute hover:after:w-full hover:after:h-0.5 hover:after:bg-launchlayer-accent hover:after:bottom-[-4px] hover:after:left-0 relative"
              >
                Docs
              </a>
            </div>
            
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <a
                href="https://github.com/b1rdmania/launchlayer"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-launchlayer-text-primary transition-colors flex items-center gap-1"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href="https://x.com/launchlayerio"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-launchlayer-text-primary transition-colors flex items-center gap-1"
                aria-label="X (Twitter)"
              >
                <X size={18} />
              </a>
              <a
                href="https://discord.gg/xVCnBxVU4X"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-launchlayer-text-primary transition-colors flex items-center gap-1"
                aria-label="Discord"
              >
                <MessagesSquare size={18} />
              </a>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-launchlayer-surface-light text-sm text-launchlayer-text-secondary text-center">
            © 2025 Launch Layer. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
