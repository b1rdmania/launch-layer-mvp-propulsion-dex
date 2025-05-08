
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Rocket, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Code-like background elements */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="hidden lg:block absolute top-1/4 left-10 text-launchlayer-text-secondary/20 font-mono text-xs">
          {`contract LaunchLayerRaise {`}<br />
          {`  address token;`}<br />
          {`  uint256 hardcap;`}<br />
          {`  uint256 deadline;`}<br />
          {`  // ...`}
        </div>
        <div className="hidden lg:block absolute bottom-1/4 right-10 text-launchlayer-text-secondary/20 font-mono text-xs">
          {`function deposit() external {`}<br />
          {`  require(block.timestamp < deadline);`}<br />
          {`  // ...`}<br />
          {`}`}
        </div>
      </div>

      <div className="container mx-auto px-8 max-w-[1280px] relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-wider">
              Launch Tokens on Sonic.
              <br />
              <span className="text-launchlayer-accent">No Games. No Fluff.</span>
            </h1>
            <p className="text-lg text-launchlayer-text-secondary mb-8 leading-relaxed">
              Launch Layer is a permissionless, tokenless launchpad for serious DeFi builders. 
              Forget raffles, ditch bonding curves, and skip the pointless platform token. 
              Transparent factory contract raises. Done. Vesting. Seamless. 
              Your token. Launched right.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/admin">
                <Button className="bg-launchlayer-accent hover:bg-launchlayer-accent/90 hover:brightness-110 hover:scale-[1.02] text-white px-6 py-2 rounded-md flex items-center gap-2 shadow-sm hover:shadow-md transition-all">
                  Deploy Raise <ArrowRight size={16} />
                </Button>
              </Link>
              <Link to="/">
                <Button
                  variant="outline"
                  className="border-launchlayer-surface-light hover:bg-launchlayer-surface-light px-6 py-2 rounded-md shadow-sm hover:shadow-md transition-all hover:scale-[1.02]"
                >
                  View Launches
                </Button>
              </Link>
              <Link to="/docs">
                <Button
                  variant="secondary"
                  className="bg-launchlayer-surface hover:bg-launchlayer-surface-light px-6 py-2 rounded-md shadow-sm hover:shadow-md transition-all hover:scale-[1.02]"
                >
                  View Docs
                </Button>
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-center">
            <div className="bg-launchlayer-surface p-1 rounded-2xl shadow-lg border border-launchlayer-surface-light animate-float">
              <div className="bg-launchlayer-surface p-8 rounded-xl flex items-center justify-center">
                <Terminal
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
