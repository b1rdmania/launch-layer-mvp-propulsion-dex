
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ToolItem from './ToolItem';

const DeveloperSection: React.FC = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-8 max-w-[1280px]">
        <h2 className="text-3xl font-bold mb-8">Integrate & Build with Cradle V1</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-cradle-surface rounded-xl p-8">
            <ul className="space-y-4">
              <ToolItem text="Immutable CradleRaise Contracts (Deployed via Factory)" />
              <ToolItem text="Standardized & Audited V1 Contract Logic (Post-Audit)" />
              <ToolItem text="Public GitHub Repository & Documentation Access" />
              <ToolItem text="Direct Smart Contract Interaction (ABIs & Addresses provided)" />
              <ToolItem text="(Coming Soon): Raise-as-a-Service SDK" />
            </ul>
          </div>
          
          <div className="bg-cradle-surface rounded-xl p-8">
            <h3 className="text-xl font-bold mb-4">Start Building Today</h3>
            <p className="mb-4 text-cradle-text-secondary">
              Cradle's contracts are designed for developers. Interact directly with our factory contract or use our simplified UI.
            </p>
            <Link to="/admin">
              <Button className="bg-cradle-accent hover:bg-cradle-accent/90 text-white px-6 py-2 rounded-lg">
                Deploy Your First Raise
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeveloperSection;
