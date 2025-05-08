
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";

const CtaSection: React.FC = () => {
  return (
    <section className="py-16 bg-launchlayer-background">
      <div className="container mx-auto px-8 max-w-[1280px] text-center">
        <h2 className="text-3xl font-bold mb-4 tracking-wider">Launch Your Way on Sonic</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto text-[0.95rem] leading-relaxed">
          UI-driven deployment via the Factory ensures consistency. Direct smart
          contract interaction offers flexibility. Built natively for Sonic.
        </p>
        <Link to="/admin">
          <Button
            variant="accent"
            size="lg"
            className="px-8 py-3 rounded-md text-lg flex items-center gap-2"
          >
            <Rocket size={20} />
            Start Your Raise
          </Button>
        </Link>
        <div className="mt-6 text-xs text-launchlayer-text-secondary">
          Built for Builders: Powered by Sonic
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
