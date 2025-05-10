
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection: React.FC = () => {
  return (
    <section className="pt-20 pb-24 md:pt-28 md:pb-32 relative overflow-hidden z-10">
      {/* Code-like background elements */}
      <div className="absolute inset-0 z-0 opacity-5">
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
            <div className="inline-block mb-4 px-4 py-2 bg-launchlayer-accent/10 rounded-full">
              <p className="text-launchlayer-accent font-medium text-sm tracking-wide">
                THE NEXT-GEN LAUNCHPAD FOR SONIC NETWORK
              </p>
            </div>
          
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 tracking-tighter leading-tight font-satoshi">
              Launch Tokens on 
              <span className="bg-gradient-to-r from-launchlayer-accent via-launchlayer-violet to-launchlayer-mint bg-clip-text text-transparent"> Sonic</span>.
              <br />
              <span className="text-launchlayer-accent">No Games. No Fluff.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-launchlayer-text-secondary mb-8 leading-relaxed">
              A permissionless, tokenless launchpad for serious DeFi builders. 
              <br className="hidden md:block" />
              Forget raffles, ditch bonding curves, and skip the pointless platform token.
              <br className="hidden md:block" />
              Transparent factory contract raises. Done. Vesting. Seamless. Your token. Launched right.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/admin">
                <Button variant="accent" size="lg" className="group px-6 py-3 h-14 text-base rounded-lg">
                  Deploy Raise <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-launchlayer-surface-light hover:bg-launchlayer-surface-light px-6 py-3 h-14 text-base rounded-lg"
                >
                  View Launches
                </Button>
              </Link>
              <Link to="/docs">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-launchlayer-surface-light hover:bg-launchlayer-surface-light px-6 py-3 h-14 text-base rounded-lg"
                >
                  View Docs
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="lg:w-1/2 flex justify-center mt-8 lg:mt-0">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-launchlayer-accent to-launchlayer-violet opacity-30 blur-[60px] rounded-full" />
              
              <div className="bg-gradient-to-br from-launchlayer-surface to-launchlayer-surface/80 p-1 rounded-2xl shadow-xl border border-launchlayer-surface-light animate-float relative">
                <div className="bg-gradient-to-br from-[#131821] to-[#1A212E] p-6 md:p-10 rounded-xl flex items-center justify-center backdrop-blur-sm relative">
                  <div className="absolute top-4 left-4 flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                  </div>
                  
                  <div className="font-mono text-sm md:text-base text-left w-full pt-4">
                    <div className="flex items-center">
                      <span className="text-launchlayer-text-secondary">$</span> 
                      <span className="typing-animation ml-2 text-launchlayer-accent">
                        launch deploy --token=0x123...789 --hardcap=1000000
                      </span>
                    </div>
                    <div className="mt-4 text-green-400">
                      ✓ Deployed: <span className="underline">SonicRaise_0x456...890</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
