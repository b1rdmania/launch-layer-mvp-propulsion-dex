
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const LaunchesSection: React.FC = () => {
  return (
    <section className="py-16 bg-cradle-surface">
      <div className="container mx-auto px-8 max-w-[1280px]">
        <h2 className="text-3xl font-bold mb-4">Explore Launches on Cradle</h2>
        <p className="text-cradle-text-secondary mb-8">
          Discover upcoming and past fixed-price token launches powered by Cradle on Sonic.
        </p>
        
        <div className="text-center mb-8">
          <Link to="/">
            <Button className="bg-cradle-accent hover:bg-cradle-accent/90 text-white px-6 py-2 rounded-lg">
              Browse All Launches
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LaunchesSection;
