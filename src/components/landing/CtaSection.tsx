
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CtaSection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-launchlayer-surface to-launchlayer-background">
      <div className="container mx-auto px-8 max-w-[1280px] text-center">
        <h2 className="text-3xl font-bold mb-4 tracking-wider">Launch Your Way on Sonic</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          UI-driven deployment via the Factory ensures consistency. Direct smart
          contract interaction offers flexibility. Built natively for Sonic.
        </p>
        <Link to="/admin">
          <Button
            size="lg"
            className="bg-launchlayer-accent hover:bg-launchlayer-accent/90 hover:brightness-110 hover:scale-[1.02] text-white px-8 py-3 rounded-md text-lg transition-all"
          >
            Start Your Raise
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default CtaSection;
