
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const LaunchesSection: React.FC = () => {
  return (
    <section className="py-16 bg-launchlayer-surface">
      <div className="container mx-auto px-8 max-w-[1280px]">
        <h2 className="text-3xl font-bold mb-4 tracking-wider">Explore Launches on Launch Layer</h2>
        <p className="text-launchlayer-text-secondary mb-8 text-[0.95rem] leading-relaxed">
          Discover upcoming and active token launches powered by Launch Layer on
          Sonic.
        </p>

        <div className="text-center mb-8">
          <Link to="/app">
            <Button className="bg-launchlayer-accent hover:bg-launchlayer-accent/90 hover:brightness-110 hover:scale-[1.02] text-white px-6 py-2 rounded-md transition-all">
              Browse All Launches
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LaunchesSection;
