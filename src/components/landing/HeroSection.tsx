
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection: React.FC = () => {
  return (
    <section className="pt-20 pb-24 md:pt-28 md:pb-32 relative overflow-hidden z-10">
      {/* Floating logos background */}
      <div className="absolute inset-0 z-0 opacity-8 overflow-hidden">
        <div className="logo-grid">
          {Array.from({ length: 20 }).map((_, i) => (
            <img 
              key={i}
              src="/lovable-uploads/e117309c-add3-4b3f-b49b-ee89f91a2df3.png"
              alt=""
              className="floating-logo"
              style={{
                position: 'absolute',
                width: `${Math.random() * 40 + 20}px`,
                opacity: Math.random() * 0.07 + 0.02,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 20 + 10}s`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Hero Logo - Centered and Animated */}
      <div className="absolute top-[20%] left-[10%] hidden lg:block z-0">
        <img 
          src="/lovable-uploads/e117309c-add3-4b3f-b49b-ee89f91a2df3.png" 
          alt="Launch Layer Logo" 
          className="w-64 h-64 opacity-10 animate-pulse-slow"
          style={{ filter: 'blur(2px)' }}
        />
      </div>

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
        <div className="flex flex-col items-center gap-8">
          <div className="w-full">
            {/* Removed the "THE NEXT-GEN LAUNCHPAD FOR SONIC NETWORK" line */}
          
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 tracking-tighter leading-tight font-satoshi">
              Launch on 
              <span className="bg-gradient-to-r from-launchlayer-accent via-launchlayer-violet to-launchlayer-mint bg-clip-text text-transparent"> Sonic</span>.
              <br />
              <span className="text-launchlayer-accent">No Games. No Fluff.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-launchlayer-text-secondary mb-8 leading-relaxed">
              A permissionless launchpad for serious DeFi builders. 
              <br className="hidden md:block" />
              Forget raffles, ditch bonding curves, and skip the platform token.
              <br className="hidden md:block" />
              Transparent raises, seamless vesting. Your token. Launched right.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/">
                <Button variant="accent" size="lg" className="group px-6 py-3 h-14 text-base rounded-lg backdrop-blur-sm">
                  View Launches <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/admin">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-launchlayer-surface-light hover:bg-launchlayer-surface-light px-6 py-3 h-14 text-base rounded-lg backdrop-blur-sm"
                >
                  Deploy Raise
                </Button>
              </Link>
              <Link to="/docs">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-launchlayer-surface-light hover:bg-launchlayer-surface-light px-6 py-3 h-14 text-base rounded-lg backdrop-blur-sm"
                >
                  View Docs
                </Button>
              </Link>
            </div>
          </div>

          {/* 3D rotating logo effect */}
          <div className="hidden md:flex justify-center items-center my-8">
            <div className="logo-3d-container relative w-32 h-32">
              <img 
                src="/lovable-uploads/e117309c-add3-4b3f-b49b-ee89f91a2df3.png"
                alt="Launch Layer Logo 3D"
                className="absolute w-full h-full animate-spin-slow"
                style={{animationDuration: '15s'}}
              />
              <img 
                src="/lovable-uploads/e117309c-add3-4b3f-b49b-ee89f91a2df3.png"
                alt="Launch Layer Logo 3D Layer"
                className="absolute w-full h-full animate-spin-slow-reverse opacity-70"
                style={{animationDuration: '12s'}}
              />
              <img 
                src="/lovable-uploads/e117309c-add3-4b3f-b49b-ee89f91a2df3.png"
                alt="Launch Layer Logo 3D Layer"
                className="absolute w-full h-full animate-spin-slow opacity-40"
                style={{animationDuration: '20s', filter: 'blur(2px)'}}
              />
            </div>
          </div>
          
          <div className="w-full max-w-2xl mt-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-launchlayer-accent to-launchlayer-violet opacity-30 blur-[60px] rounded-full" />
              
              <div className="bg-gradient-to-br from-launchlayer-surface to-launchlayer-surface/80 p-1 rounded-2xl shadow-xl border border-launchlayer-surface-light animate-float relative backdrop-blur-sm">
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

      {/* Add CSS for the animations */}
      <style jsx="true">{`
        @keyframes float-up {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-slow-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        @keyframes pulse-slow {
          0% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.15; transform: scale(1.05); }
          100% { opacity: 0.1; transform: scale(1); }
        }
        
        .floating-logo {
          animation: float-up 15s infinite ease-in-out;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s infinite linear;
        }
        
        .animate-spin-slow-reverse {
          animation: spin-slow-reverse 15s infinite linear;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 8s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
