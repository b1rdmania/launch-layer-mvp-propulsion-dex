
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Rocket, Blocks } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-5 left-1/4 w-64 h-64 rounded-full bg-launchlayer-accent/30 blur-3xl animate-pulse-glow"></div>
          <div className="absolute bottom-10 right-1/4 w-96 h-96 rounded-full bg-launchlayer-secondary/20 blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }}></div>
        </div>
        
        {/* Code-like background elements */}
        <div className="hidden lg:block absolute top-1/4 left-10 text-launchlayer-text-secondary/10 font-mono text-xs">
          {`contract LaunchLayerRaise {`}<br />
          {`  address token;`}<br />
          {`  uint256 hardcap;`}<br />
          {`  uint256 deadline;`}<br />
          {`  // ...`}
        </div>
        <div className="hidden lg:block absolute bottom-1/4 right-10 text-launchlayer-text-secondary/10 font-mono text-xs">
          {`function deposit() external {`}<br />
          {`  require(block.timestamp < deadline);`}<br />
          {`  // ...`}<br />
          {`}`}
        </div>
      </div>

      <div className="container mx-auto px-8 max-w-[1280px] relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-launchlayer-accent to-launchlayer-blue bg-clip-text text-transparent">
              Launch Tokens on Sonic.
              <br />
              No Games. No Fluff.
            </h1>
            <p className="text-xl text-launchlayer-text-secondary mb-8">
              Launch Layer is a permissionless, tokenless launchpad for serious DeFi builders. 
              Forget raffles, ditch bonding curves, and skip the pointless platform token. 
              Transparent factory contract raises. Done. Vesting. Seamless. 
              Your token. Launched right.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/admin">
                <Button className="bg-launchlayer-accent hover:bg-launchlayer-accent/90 text-white px-6 py-2 rounded-lg flex items-center gap-2 shadow-sm hover:shadow-md transition-all hover:scale-105">
                  Deploy Raise <ArrowRight size={16} />
                </Button>
              </Link>
              <Link to="/">
                <Button
                  variant="outline"
                  className="border-launchlayer-surface-light hover:bg-launchlayer-surface-light px-6 py-2 rounded-lg shadow-sm hover:shadow-md transition-all hover:scale-105"
                >
                  View Launches
                </Button>
              </Link>
              <Link to="/docs">
                <Button
                  variant="secondary"
                  className="bg-launchlayer-surface hover:bg-launchlayer-surface-light px-6 py-2 rounded-lg shadow-sm hover:shadow-md transition-all hover:scale-105"
                >
                  View Docs
                </Button>
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-center">
            <div className="bg-gradient-to-br from-launchlayer-accent/20 to-launchlayer-secondary/20 p-1 rounded-2xl shadow-lg animate-float">
              <div className="bg-launchlayer-surface p-8 rounded-xl flex items-center justify-center">
                <Blocks
                  size={240}
                  className="text-launchlayer-accent"
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
