import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CtaSection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-cradle-accent/20 to-purple-600/20">
      <div className="container mx-auto px-8 max-w-[1280px] text-center">
        <h2 className="text-3xl font-bold mb-4">Launch Your Way on Sonic</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          UI-driven deployment via the Factory ensures consistency. Direct smart
          contract interaction offers flexibility. Built natively for Sonic.
        </p>
        <Link to="/admin">
          <Button
            size="lg"
            className="bg-cradle-accent hover:bg-cradle-accent/90 text-white px-8 py-3 rounded-lg text-lg"
          >
            Start Your Raise
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default CtaSection;
