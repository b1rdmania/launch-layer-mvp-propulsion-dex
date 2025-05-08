
import React from "react";
import { Link } from "react-router-dom";
import { Github, MessagesSquare, Rocket, Twitter } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto py-8 px-4 border-t border-cradle-surface-light">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center gap-2">
              <Rocket size={20} className="text-cradle-accent" />
              <span className="text-lg font-bold bg-gradient-to-r from-cradle-accent to-blue-400 bg-clip-text text-transparent">
                Launch Layer
              </span>
            </div>
            <p className="text-sm text-cradle-text-secondary mt-1">
              The token launchpad for Sonic Network
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            <div className="flex gap-6 text-sm text-cradle-text-secondary">
              <Link
                to="/"
                className="hover:text-cradle-text-primary transition-colors hover:after:content-[''] hover:after:absolute hover:after:w-full hover:after:h-0.5 hover:after:bg-cradle-accent hover:after:bottom-[-4px] hover:after:left-0 relative"
              >
                Home
              </Link>
              <Link
                to="/app"
                className="hover:text-cradle-text-primary transition-colors hover:after:content-[''] hover:after:absolute hover:after:w-full hover:after:h-0.5 hover:after:bg-cradle-accent hover:after:bottom-[-4px] hover:after:left-0 relative"
              >
                App
              </Link>
              <Link
                to="/docs"
                className="hover:text-cradle-text-primary transition-colors hover:after:content-[''] hover:after:absolute hover:after:w-full hover:after:h-0.5 hover:after:bg-cradle-accent hover:after:bottom-[-4px] hover:after:left-0 relative"
              >
                Docs
              </Link>
            </div>
            
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <a
                href="https://github.com/b1rdmania/cradleyolo"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cradle-text-primary transition-colors flex items-center gap-1"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href="https://twitter.com/launchlayer"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cradle-text-primary transition-colors flex items-center gap-1"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a
                href="https://discord.gg/launchlayer"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cradle-text-primary transition-colors flex items-center gap-1"
                aria-label="Discord"
              >
                <MessagesSquare size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-cradle-surface-light text-sm text-cradle-text-secondary text-center">
          © 2025 Launch Layer. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
