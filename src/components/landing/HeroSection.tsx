
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-8 max-w-[1280px]">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cradle-accent to-blue-400 bg-clip-text text-transparent">
              Launch Tokens on Sonic.
              <br />
              No Games. No Fluff.
            </h1>
            <p className="text-xl text-cradle-text-secondary mb-8">
              Launch Layer is a permissionless, tokenless launchpad for serious DeFi builders. 
              Forget raffles, ditch bonding curves, and skip the pointless platform token. 
              Transparent factory contract raises. Done. Vesting. Seamless. 
              Your token. Launched right.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/admin">
                <Button className="bg-cradle-accent hover:bg-cradle-accent/90 text-white px-6 py-2 rounded-lg flex items-center gap-2">
                  Deploy Raise <ArrowRight size={16} />
                </Button>
              </Link>
              <Link to="/">
                <Button
                  variant="outline"
                  className="border-cradle-surface-light hover:bg-cradle-surface-light px-6 py-2 rounded-lg"
                >
                  View Launches
                </Button>
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-center">
            <div className="bg-gradient-to-br from-cradle-accent/20 to-purple-600/20 p-1 rounded-2xl">
              <div className="bg-cradle-surface p-8 rounded-xl flex items-center justify-center">
                <LineChart
                  size={240}
                  className="text-cradle-accent/70"
                  strokeWidth={1.5}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
