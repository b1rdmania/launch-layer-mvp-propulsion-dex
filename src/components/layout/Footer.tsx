
import React from "react";
import { Link } from "react-router-dom";
import { Github, MessagesSquare, Rocket, Twitter } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto py-8 px-4 border-t border-launchlayer-surface-light">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center gap-2">
              <img 
                src="/lovable-uploads/80dcea32-874f-47f5-875a-fa6add3b7ea6.png" 
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
                to="/"
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
              <Link
                to="/docs"
                className="hover:text-launchlayer-text-primary transition-colors hover:after:content-[''] hover:after:absolute hover:after:w-full hover:after:h-0.5 hover:after:bg-launchlayer-accent hover:after:bottom-[-4px] hover:after:left-0 relative"
              >
                Docs
              </Link>
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
                href="https://twitter.com/launchlayer"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-launchlayer-text-primary transition-colors flex items-center gap-1"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a
                href="https://discord.gg/launchlayer"
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
