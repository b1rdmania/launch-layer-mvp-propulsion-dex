
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDeviceDetect } from "@/hooks/useDeviceDetect";

const HeroSection: React.FC = () => {
  const { isMobile } = useDeviceDetect();
  
  console.log("HeroSection rendering - Pitch Deck Version");
  
  return (
    <section className="pt-16 md:pt-20 pb-16 md:pb-24 relative overflow-hidden z-10">
      {/* Simplified background elements - removed potential duplicates */}
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

      {/* Simplified logo background */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1280px] relative z-10">
        <div className="flex flex-col items-center gap-6 md:gap-8">
          <div className="w-full">
            <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 tracking-tighter leading-tight font-satoshi">
              Launch on 
              <span className="bg-gradient-to-r from-launchlayer-accent via-launchlayer-violet to-launchlayer-mint bg-clip-text text-transparent"> Sonic</span>.
              <br />
              <span className="text-launchlayer-accent">No Games. No Fluff.</span>
            </h1>
            
            <p className="text-lg md:text-2xl text-launchlayer-text-secondary mb-6 md:mb-8 leading-relaxed">
              A permissionless launchpad for serious DeFi builders. 
              <br className="hidden md:block" />
              Forget raffles, ditch bonding curves, and skip the platform token.
              <br className="hidden md:block" />
              Transparent raises, seamless vesting. Your token. Launched right.
            </p>
            
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4">
              <Link to="/app" className="w-full sm:w-auto">
                <Button variant="accent" size="lg" className="group w-full sm:w-auto px-6 py-3 h-14 text-base rounded-lg backdrop-blur-sm">
                  View Launches <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto">
                <Link to="/admin" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full border-launchlayer-surface-light hover:bg-launchlayer-surface-light px-4 md:px-6 py-3 h-14 text-base rounded-lg backdrop-blur-sm"
                  >
                    Deploy Raise
                  </Button>
                </Link>
                <a href="https://launch-layer.gitbook.io/launchlayer" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full border-launchlayer-surface-light hover:bg-launchlayer-surface-light px-4 md:px-6 py-3 h-14 text-base rounded-lg backdrop-blur-sm"
                  >
                    View Docs
                  </Button>
                </a>
              </div>
            </div>
          </div>
          
          <div className="w-full max-w-2xl mt-6 md:mt-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-launchlayer-accent to-launchlayer-violet opacity-30 blur-[60px] rounded-full" />
              
              <div className="bg-gradient-to-br from-launchlayer-surface to-launchlayer-surface/80 p-1 rounded-2xl shadow-xl border border-launchlayer-surface-light relative backdrop-blur-sm">
                <div className="bg-gradient-to-br from-[#131821] to-[#1A212E] p-4 md:p-10 rounded-xl flex items-center justify-center backdrop-blur-sm relative">
                  <div className="absolute top-4 left-4 flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                  </div>
                  
                  <div className="font-mono text-xs md:text-base text-left w-full pt-4 overflow-x-auto scrollbar-hide">
                    <div className="flex items-center whitespace-nowrap">
                      <span className="text-launchlayer-text-secondary">$</span> 
                      <span className="typing-animation ml-2 text-launchlayer-accent">
                        launch deploy --token=0x123...789 --hardcap=1000000
                      </span>
                    </div>
                    <div className="mt-4 text-green-400 whitespace-nowrap">
                      ✓ Deployed: <span className="underline">SonicRaise_0x456...890</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style>
        {`
          .typing-animation {
            overflow: hidden;
            border-right: 2px solid #3277F5;
            white-space: nowrap;
            margin: 0;
            animation: 
              typing 3.5s steps(40, end),
              blink-caret 0.75s step-end infinite;
          }
          
          @keyframes typing {
            from { width: 0 }
            to { width: 100% }
          }
          
          @keyframes blink-caret {
            from, to { border-color: transparent }
            50% { border-color: #3277F5 }
          }
          
          /* Hide scrollbar for Chrome, Safari and Opera */
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          
          /* Hide scrollbar for IE, Edge and Firefox */
          .scrollbar-hide {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
          }
        `}
      </style>
    </section>
  );
};

export default HeroSection;
