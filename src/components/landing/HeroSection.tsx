
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection: React.FC = () => {
  return (
    <section className="py-12 md:py-24 relative overflow-hidden">
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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1280px] relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          <div className="lg:w-1/2">
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 tracking-wider font-satoshi">
              Launch Tokens on Sonic.
              <br />
              <span className="text-launchlayer-accent">No Games. No Fluff.</span>
            </h1>
            <div className="border-l-2 border-launchlayer-violet pl-4 mb-6">
              <p className="text-launchlayer-text-secondary mb-2 text-sm">SIMPLE • ACCESSIBLE • FAIR</p>
            </div>
            <p className="text-base md:text-lg text-launchlayer-text-secondary mb-8 leading-relaxed">
              Launch Layer is a permissionless, tokenless launchpad for serious DeFi builders. 
              Forget raffles, ditch bonding curves, and skip the pointless platform token. 
              Transparent factory contract raises. Done. Vesting. Seamless. 
              Your token. Launched right.
            </p>
            <div className="flex flex-wrap gap-3 md:gap-4">
              <Link to="/admin">
                <Button variant="accent" className="px-4 md:px-6 py-2 rounded-md flex items-center gap-2">
                  Deploy Raise <ArrowRight size={16} />
                </Button>
              </Link>
              <Link to="/">
                <Button
                  variant="outline"
                  className="border-launchlayer-surface-light hover:bg-launchlayer-surface-light px-4 md:px-6 py-2 rounded-md shadow-sm hover:shadow-card transition-all"
                >
                  View Launches
                </Button>
              </Link>
              <Link to="/docs">
                <Button
                  variant="violet"
                  className="px-4 md:px-6 py-2 rounded-md shadow-sm hover:shadow-violet transition-all"
                >
                  View Docs
                </Button>
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-center mt-8 lg:mt-0">
            <div className="bg-launchlayer-surface p-1 rounded-2xl shadow-card border border-launchlayer-surface-light animate-float">
              <div className="bg-launchlayer-surface p-4 md:p-8 rounded-xl flex items-center justify-center">
                <Terminal
                  size={180}
                  className="text-launchlayer-accent md:hidden"
                  strokeWidth={1.5}
                />
                <Terminal
                  size={240}
                  className="text-launchlayer-accent hidden md:block"
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
