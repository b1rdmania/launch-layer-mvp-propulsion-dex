
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto py-8 px-4 border-t border-cradle-surface-light">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-lg font-bold bg-gradient-to-r from-cradle-accent to-blue-400 bg-clip-text text-transparent">
              Cradle.build
            </span>
            <p className="text-sm text-cradle-text-secondary mt-1">
              The token launchpad for Sonic Network
            </p>
          </div>
          
          <div className="flex gap-8 text-sm text-cradle-text-secondary">
            <Link to="/" className="hover:text-cradle-text-primary transition-colors">
              Home
            </Link>
            <a href="#" className="hover:text-cradle-text-primary transition-colors">
              Docs
            </a>
            <a href="#" className="hover:text-cradle-text-primary transition-colors">
              GitHub
            </a>
            <a href="#" className="hover:text-cradle-text-primary transition-colors">
              Discord
            </a>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-cradle-surface-light text-sm text-cradle-text-secondary text-center">
          © 2025 Cradle.build. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
