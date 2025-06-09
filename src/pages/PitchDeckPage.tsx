import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, Target, Zap, Shield, TrendingUp, Users, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDeviceDetect } from "@/hooks/useDeviceDetect";
import MovingGradientBackground from "@/components/landing/MovingGradientBackground";

interface Slide {
  id: number;
  title: string;
  component: React.ReactNode;
}

const PitchDeckPage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { isMobile } = useDeviceDetect();

  const slides: Slide[] = [
    {
      id: 1,
      title: "Title",
      component: <TitleSlide />
    },
    {
      id: 2,
      title: "The Opportunity",
      component: <OpportunitySlide />
    },
    {
      id: 3,
      title: "The Platform",
      component: <PlatformSlide />
    },
    {
      id: 4,
      title: "Traction & GTM",
      component: <TractionSlide />
    },
    {
      id: 5,
      title: "Business Model & Ask",
      component: <BusinessSlide />
    },
    {
      id: 6,
      title: "Team & Vision",
      component: <TeamSlide />
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide(currentSlide + 1);
        setIsTransitioning(false);
      }, 150);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide(currentSlide - 1);
        setIsTransitioning(false);
      }, 150);
    }
  };

  const goToSlide = (index: number) => {
    if (index !== currentSlide) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide(index);
        setIsTransitioning(false);
      }, 150);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSlide]);

  return (
    <div className="min-h-screen bg-launchlayer-background overflow-hidden relative">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-[0.02] bg-noise"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-launchlayer-accent/5 via-transparent to-launchlayer-violet/5"></div>
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Slide Content */}
        <div className={`flex-1 transition-all duration-300 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
          {slides[currentSlide].component}
        </div>

        {/* Navigation */}
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-launchlayer-surface/80 backdrop-blur-md border border-launchlayer-surface-light rounded-2xl p-4 shadow-xl">
            <div className="flex items-center gap-4">
              {/* Previous Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className="w-10 h-10 rounded-full bg-launchlayer-surface-light/50 hover:bg-launchlayer-accent/20 disabled:opacity-30"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>

              {/* Slide Indicators */}
              <div className="flex gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? 'bg-launchlayer-accent scale-125 shadow-[0_0_8px_rgba(50,119,245,0.6)]'
                        : 'bg-launchlayer-text-secondary/30 hover:bg-launchlayer-text-secondary/50'
                    }`}
                  />
                ))}
              </div>

              {/* Next Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={nextSlide}
                disabled={currentSlide === slides.length - 1}
                className="w-10 h-10 rounded-full bg-launchlayer-surface-light/50 hover:bg-launchlayer-accent/20 disabled:opacity-30"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Slide Counter */}
        <div className="fixed top-8 right-8 z-50">
          <div className="bg-launchlayer-surface/60 backdrop-blur-md border border-launchlayer-surface-light rounded-xl px-4 py-2">
            <span className="text-sm font-mono text-launchlayer-text-secondary">
              {currentSlide + 1} / {slides.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Individual Slide Components
const TitleSlide: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 relative overflow-hidden">
      {/* Add the moving gradient background */}
      <MovingGradientBackground />
      
      <div className="text-center max-w-4xl mx-auto relative z-10">
        <div className="mb-8">
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold mb-6 bg-gradient-to-r from-launchlayer-accent via-launchlayer-violet to-launchlayer-mint bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_200%]">
            Launch Layer
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-launchlayer-accent to-launchlayer-violet rounded-full mx-auto mb-8 animate-pulse-glow"></div>
        </div>
        
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 text-launchlayer-text-primary">
          A cross-chain launch machine. Built for what's next.
        </h2>
        
        <p className="text-lg md:text-xl text-launchlayer-text-secondary mb-8 max-w-3xl mx-auto leading-relaxed">
          An integrated ecosystem for launching Web3 projects, powered by real yield and automated liquidity.
        </p>
        
        <div className="inline-block bg-launchlayer-surface/80 backdrop-blur-md border border-launchlayer-surface-light rounded-2xl p-6 shadow-2xl">
          <p className="text-launchlayer-text-secondary font-mono">
            andy@launchlayer.io
          </p>
        </div>
      </div>
    </div>
  );
};

const OpportunitySlide: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gradient-violet">
            Web3 Launches Are Broken. We Fixed Them.
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-launchlayer-violet to-launchlayer-mint rounded-full mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-launchlayer-surface/50 backdrop-blur-sm border border-launchlayer-surface-light rounded-2xl p-6 hover:shadow-[0_8px_32px_rgba(255,107,59,0.15)] transition-all duration-300">
            <div className="flex items-center mb-4">
              <Users className="w-8 h-8 text-launchlayer-error mr-4" />
              <h3 className="text-xl font-bold text-launchlayer-text-primary">Users</h3>
            </div>
            <p className="text-launchlayer-text-secondary text-sm leading-relaxed">
              Risky presales and inefficient access requiring locked capital.
            </p>
          </div>

          <div className="bg-launchlayer-surface/50 backdrop-blur-sm border border-launchlayer-surface-light rounded-2xl p-6 hover:shadow-[0_8px_32px_rgba(255,107,59,0.15)] transition-all duration-300">
            <div className="flex items-center mb-4">
              <Target className="w-8 h-8 text-launchlayer-error mr-4" />
              <h3 className="text-xl font-bold text-launchlayer-text-primary">Projects</h3>
            </div>
            <p className="text-launchlayer-text-secondary text-sm leading-relaxed">
              Complex launch management and the challenge of day-one liquidity.
            </p>
          </div>

          <div className="bg-launchlayer-surface/50 backdrop-blur-sm border border-launchlayer-surface-light rounded-2xl p-6 hover:shadow-[0_8px_32px_rgba(255,107,59,0.15)] transition-all duration-300">
            <div className="flex items-center mb-4">
              <Shield className="w-8 h-8 text-launchlayer-error mr-4" />
              <h3 className="text-xl font-bold text-launchlayer-text-primary">Chains</h3>
            </div>
            <p className="text-launchlayer-text-secondary text-sm leading-relaxed">
              Difficulty attracting and retaining sticky, long-term TVL.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-launchlayer-surface to-launchlayer-surface/80 backdrop-blur-sm border border-launchlayer-surface-light rounded-3xl p-8 shadow-2xl">
          <h3 className="text-2xl font-bold mb-6 text-center text-launchlayer-accent">Our Solution: The "Airlock" Mechanism</h3>
          <div className="space-y-4">
            <div className="flex items-center p-4 bg-launchlayer-background/50 rounded-xl border border-launchlayer-surface-light">
              <div className="w-8 h-8 bg-launchlayer-violet/20 rounded-full flex items-center justify-center mr-4">
                <span className="text-launchlayer-violet font-bold">1</span>
              </div>
              <p className="text-launchlayer-text-secondary">Users stake assets into Airlocks; their principal remains fully liquid</p>
            </div>
            <ArrowRight className="w-6 h-6 text-launchlayer-accent mx-auto" />
            <div className="flex items-center p-4 bg-launchlayer-background/50 rounded-xl border border-launchlayer-surface-light">
              <div className="w-8 h-8 bg-launchlayer-mint/20 rounded-full flex items-center justify-center mr-4">
                <span className="text-launchlayer-mint font-bold">2</span>
              </div>
              <p className="text-launchlayer-text-secondary">We generate real validator & early-ops yield (10-25% APY target)</p>
            </div>
            <ArrowRight className="w-6 h-6 text-launchlayer-accent mx-auto" />
            <div className="flex items-center p-4 bg-launchlayer-background/50 rounded-xl border border-launchlayer-surface-light">
              <div className="w-8 h-8 bg-launchlayer-accent/20 rounded-full flex items-center justify-center mr-4">
                <span className="text-launchlayer-accent font-bold">3</span>
              </div>
              <p className="text-launchlayer-text-secondary">This compounded yield automatically buys users guaranteed allocations in curated TGEs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PlatformSlide: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gradient-violet">
            Three Pillars. One Unstoppable Machine.
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-launchlayer-violet to-launchlayer-mint rounded-full mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-launchlayer-surface/50 backdrop-blur-sm border border-launchlayer-surface-light rounded-2xl p-6 hover:shadow-[0_8px_32px_rgba(50,119,245,0.15)] transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-launchlayer-accent/20 rounded-xl flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-launchlayer-accent" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-launchlayer-text-primary">Airlocks (Yield Engine)</h3>
            <ul className="text-launchlayer-text-secondary text-sm leading-relaxed space-y-1">
              <li>• High-yield, liquid staking</li>
              <li>• Gamified yield via "Degen Pools"</li>
              <li>• Project-funded APY boosts</li>
              <li>• Core TVL & user acquisition engine</li>
            </ul>
          </div>

          <div className="bg-launchlayer-surface/50 backdrop-blur-sm border border-launchlayer-surface-light rounded-2xl p-6 hover:shadow-[0_8px_32px_rgba(167,139,250,0.15)] transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-launchlayer-violet/20 rounded-xl flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-launchlayer-violet" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-launchlayer-text-primary">Launch Layer (Premium Launchpad)</h3>
            <ul className="text-launchlayer-text-secondary text-sm leading-relaxed space-y-1">
              <li>• Institutional-grade TGEs</li>
              <li>• Magna-powered vesting ($3.5B+ distributed)</li>
              <li>• Curated (vetted) & Permissionless lanes</li>
            </ul>
          </div>

          <div className="bg-launchlayer-surface/50 backdrop-blur-sm border border-launchlayer-surface-light rounded-2xl p-6 hover:shadow-[0_8px_32px_rgba(99,206,198,0.15)] transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-launchlayer-mint/20 rounded-xl flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-launchlayer-mint" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-launchlayer-text-primary">Propulsion Finance (Advanced DEX)</h3>
            <ul className="text-launchlayer-text-secondary text-sm leading-relaxed space-y-1">
              <li>• Initial: Algebra v4 (concentrated liquidity)</li>
              <li>• Upgrade path: Uniswap v4 hooks</li>
              <li>• MEV-capture (OFA), Ambient/PMM</li>
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-r from-launchlayer-accent/10 via-launchlayer-violet/10 to-launchlayer-mint/10 backdrop-blur-sm border border-launchlayer-surface-light rounded-3xl p-8 shadow-2xl">
          <h3 className="text-2xl font-bold mb-4 text-center text-launchlayer-text-primary">Our Moat (The Flywheel)</h3>
          <p className="text-lg text-launchlayer-text-secondary text-center leading-relaxed max-w-4xl mx-auto">
            The defensibility is in the <span className="text-launchlayer-accent font-semibold">synergy</span>. 
            Airlocks attract users → Users provide an audience for quality projects → Projects launch & seed liquidity on our DEX → 
            A thriving ecosystem with <span className="text-launchlayer-violet font-semibold">sticky TVL and users</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

const TractionSlide: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gradient-violet">
            Ship Fast. Scale Faster.
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-launchlayer-violet to-launchlayer-mint rounded-full mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-launchlayer-accent">Traction Today</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start p-4 bg-launchlayer-surface/50 backdrop-blur-sm border border-launchlayer-surface-light rounded-xl">
                <div className="w-6 h-6 bg-launchlayer-accent rounded-full flex items-center justify-center mt-1 mr-4 flex-shrink-0">
                  <span className="text-white text-xs">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-launchlayer-text-primary mb-1">MVP Built</h4>
                  <p className="text-launchlayer-text-secondary text-sm">Core Launchpad + Magna integration deployed on Sepolia testnet.</p>
                </div>
              </div>
              
              <div className="flex items-start p-4 bg-launchlayer-surface/50 backdrop-blur-sm border border-launchlayer-surface-light rounded-xl">
                <div className="w-6 h-6 bg-launchlayer-accent rounded-full flex items-center justify-center mt-1 mr-4 flex-shrink-0">
                  <span className="text-white text-xs">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-launchlayer-text-primary mb-1">Expert Team</h4>
                  <p className="text-launchlayer-text-secondary text-sm">Tech lead's team (Infrasingularity) has proven validator/yield expertise.</p>
                </div>
              </div>
              
              <div className="flex items-start p-4 bg-launchlayer-surface/50 backdrop-blur-sm border border-launchlayer-surface-light rounded-xl">
                <div className="w-6 h-6 bg-launchlayer-accent rounded-full flex items-center justify-center mt-1 mr-4 flex-shrink-0">
                  <span className="text-white text-xs">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-launchlayer-text-primary mb-1">BD Secured</h4>
                  <p className="text-launchlayer-text-secondary text-sm">Onboarded senior BD lead to drive partnerships.</p>
                </div>
              </div>
              
              <div className="flex items-start p-4 bg-launchlayer-surface/50 backdrop-blur-sm border border-launchlayer-surface-light rounded-xl">
                <div className="w-6 h-6 bg-launchlayer-violet/60 rounded-full flex items-center justify-center mt-1 mr-4 flex-shrink-0">
                  <span className="text-white text-xs">⚙</span>
                </div>
                <div>
                  <h4 className="font-semibold text-launchlayer-text-primary mb-1">In Progress</h4>
                  <p className="text-launchlayer-text-secondary text-sm">Final UI testing, API automation layer, active talks with Algebra & GTM partners.</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6 text-launchlayer-mint">Go-To-Market Strategy</h3>
            
            <div className="bg-gradient-to-br from-launchlayer-surface to-launchlayer-surface/80 backdrop-blur-sm border border-launchlayer-surface-light rounded-3xl p-6 shadow-2xl">
              <h4 className="font-bold text-launchlayer-text-primary mb-4 text-center">Initial Target Chains</h4>
              <p className="text-launchlayer-text-secondary text-sm mb-4 text-center">
                Strategically targeting deployment to maximize impact, liquidity, and user adoption:
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-launchlayer-background/50 rounded-xl p-4 text-center border border-launchlayer-surface-light">
                  <div className="w-8 h-8 bg-launchlayer-accent/20 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <span className="text-launchlayer-accent font-bold text-sm">B</span>
                  </div>
                  <p className="text-launchlayer-text-primary font-medium">Base</p>
                </div>
                
                <div className="bg-launchlayer-background/50 rounded-xl p-4 text-center border border-launchlayer-surface-light">
                  <div className="w-8 h-8 bg-launchlayer-violet/20 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <span className="text-launchlayer-violet font-bold text-sm">H</span>
                  </div>
                  <p className="text-launchlayer-text-primary font-medium">Hype</p>
                </div>
                
                <div className="bg-launchlayer-background/50 rounded-xl p-4 text-center border border-launchlayer-surface-light">
                  <div className="w-8 h-8 bg-launchlayer-mint/20 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <span className="text-launchlayer-mint font-bold text-sm">M</span>
                  </div>
                  <p className="text-launchlayer-text-primary font-medium">MegaETH</p>
                </div>
                
                <div className="bg-launchlayer-background/50 rounded-xl p-4 text-center border border-launchlayer-surface-light">
                  <div className="w-8 h-8 bg-launchlayer-accent/20 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <span className="text-launchlayer-accent font-bold text-sm">S</span>
                  </div>
                  <p className="text-launchlayer-text-primary font-medium">Sonic</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BusinessSlide: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gradient-violet">
            Print Money. Need Money.
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-launchlayer-violet to-launchlayer-mint rounded-full mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-launchlayer-mint flex items-center">
              <DollarSign className="w-8 h-8 mr-3" />
              Business Model
            </h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between p-4 bg-launchlayer-surface/50 backdrop-blur-sm border border-launchlayer-surface-light rounded-xl">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-launchlayer-accent/20 rounded-full flex items-center justify-center mr-3">
                    <Target className="w-4 h-4 text-launchlayer-accent" />
                  </div>
                  <span className="text-launchlayer-text-primary">Project Raises</span>
                </div>
                <span className="text-launchlayer-accent font-semibold">~5% platform fee</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-launchlayer-surface/50 backdrop-blur-sm border border-launchlayer-surface-light rounded-xl">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-launchlayer-violet/20 rounded-full flex items-center justify-center mr-3">
                    <Zap className="w-4 h-4 text-launchlayer-violet" />
                  </div>
                  <span className="text-launchlayer-text-primary">User Yield</span>
                </div>
                <span className="text-launchlayer-violet font-semibold">~10% share of yield</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-launchlayer-surface/50 backdrop-blur-sm border border-launchlayer-surface-light rounded-xl">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-launchlayer-mint/20 rounded-full flex items-center justify-center mr-3">
                    <TrendingUp className="w-4 h-4 text-launchlayer-mint" />
                  </div>
                  <span className="text-launchlayer-text-primary">AMM Trades</span>
                </div>
                <span className="text-launchlayer-mint font-semibold">Protocol share of fees</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-launchlayer-accent/20 to-launchlayer-violet/20 backdrop-blur-sm border border-launchlayer-surface-light rounded-2xl p-6">
              <h4 className="font-bold text-launchlayer-text-primary mb-2">Powerful Economics</h4>
              <p className="text-launchlayer-text-secondary text-sm leading-relaxed">
                A single <span className="text-launchlayer-accent font-semibold">$5M Airlock</span> fueling four $2M project launches can generate 
                <span className="text-launchlayer-violet font-semibold"> over $500k</span> for the protocol per cycle.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6 text-launchlayer-accent">The Ask</h3>
            
            <div className="bg-gradient-to-br from-launchlayer-surface to-launchlayer-surface/80 backdrop-blur-sm border border-launchlayer-surface-light rounded-3xl p-8 shadow-2xl">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-gradient bg-gradient-to-r from-launchlayer-accent to-launchlayer-violet bg-clip-text text-transparent">
                  $2.5M - $3.0M
                </div>
                <p className="text-launchlayer-text-secondary mt-2">Pre-Seed/Seed Round</p>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-launchlayer-background/50 rounded-xl border border-launchlayer-surface-light">
                  <h4 className="font-semibold text-launchlayer-text-primary mb-2">Use of Funds</h4>
                  <ul className="text-launchlayer-text-secondary text-sm space-y-1">
                    <li>• Core Development (Airlocks & DEX)</li>
                    <li>• Tier-1 Security Audits</li>
                    <li>• Multi-Chain Go-To-Market & Marketing</li>
                    <li>• Legal & Operations</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-launchlayer-accent/20 to-launchlayer-violet/20 rounded-xl border border-launchlayer-surface-light">
                  <h4 className="font-semibold text-launchlayer-text-primary mb-2">Runway</h4>
                  <p className="text-launchlayer-text-secondary text-sm">
                    This provides a <span className="text-launchlayer-accent font-semibold">2-3 year runway</span> to execute and scale.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TeamSlide: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gradient-violet">
            We Build. We Ship. We Win.
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-launchlayer-violet to-launchlayer-mint rounded-full mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-launchlayer-accent flex items-center">
              <Users className="w-8 h-8 mr-3" />
              Core Team
            </h3>
            
            <div className="space-y-4">
              <div className="p-6 bg-launchlayer-surface/50 backdrop-blur-sm border border-launchlayer-surface-light rounded-xl hover:shadow-[0_8px_32px_rgba(50,119,245,0.15)] transition-all duration-300">
                <h4 className="font-bold text-launchlayer-text-primary mb-1">Andy</h4>
                <p className="text-launchlayer-accent text-sm font-medium mb-2">Co-Founder</p>
                <p className="text-launchlayer-text-secondary text-sm">Product & Strategy Lead</p>
              </div>
              
              <div className="p-6 bg-launchlayer-surface/50 backdrop-blur-sm border border-launchlayer-surface-light rounded-xl hover:shadow-[0_8px_32px_rgba(167,139,250,0.15)] transition-all duration-300">
                <h4 className="font-bold text-launchlayer-text-primary mb-1">Stable</h4>
                <p className="text-launchlayer-violet text-sm font-medium mb-2">Co-Founder/Partner</p>
                <p className="text-launchlayer-text-secondary text-sm">Technical Architecture & Operations</p>
              </div>
              
              <div className="p-6 bg-launchlayer-surface/50 backdrop-blur-sm border border-launchlayer-surface-light rounded-xl hover:shadow-[0_8px_32px_rgba(99,206,198,0.15)] transition-all duration-300">
                <h4 className="font-bold text-launchlayer-text-primary mb-1">Jitin</h4>
                <p className="text-launchlayer-mint text-sm font-medium mb-2">Tech Lead (via Infrasingularity)</p>
                <p className="text-launchlayer-text-secondary text-sm">Expertise in yield generation & validator ops</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6 text-launchlayer-violet">Strategic Partners</h3>
            
            <div className="space-y-4">
              <div className="p-4 bg-launchlayer-surface/50 backdrop-blur-sm border border-launchlayer-surface-light rounded-xl">
                <h4 className="font-semibold text-launchlayer-text-primary mb-1">Hype Marketing Agency</h4>
                <p className="text-launchlayer-text-secondary text-sm">Go-to-market & community growth</p>
              </div>
              
              <div className="p-4 bg-launchlayer-surface/50 backdrop-blur-sm border border-launchlayer-surface-light rounded-xl">
                <h4 className="font-semibold text-launchlayer-text-primary mb-1">Nakamoto Labs / Eli Bernstein</h4>
                <p className="text-launchlayer-text-secondary text-sm">Legal Counsel</p>
              </div>
              
              <div className="p-4 bg-launchlayer-surface/50 backdrop-blur-sm border border-launchlayer-surface-light rounded-xl">
                <h4 className="font-semibold text-launchlayer-text-primary mb-1">Airfoil Studios</h4>
                <p className="text-launchlayer-text-secondary text-sm">Front-end design coherence</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-launchlayer-surface to-launchlayer-surface/80 backdrop-blur-sm border border-launchlayer-surface-light rounded-3xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold mb-4 text-launchlayer-text-primary">Our Vision</h3>
            <p className="text-lg text-launchlayer-text-secondary leading-relaxed">
              To become the <span className="text-launchlayer-accent font-semibold">ubiquitous, cross-chain standard</span> for how quality projects go to market and how users gain 
              <span className="text-launchlayer-violet font-semibold"> capital-efficient access</span> to the future of Web3.
            </p>
          </div>

          <div className="bg-launchlayer-surface/50 backdrop-blur-sm border border-launchlayer-surface-light rounded-2xl p-8">
            <h4 className="text-xl font-bold mb-4 text-launchlayer-text-primary">Contact & MVP</h4>
            <div className="space-y-3 mb-4">
              <p className="text-launchlayer-text-secondary">
                <span className="text-launchlayer-accent font-medium">Contact:</span> Andy / andy@launchlayer.io
              </p>
              <p className="text-launchlayer-text-secondary">
                <span className="text-launchlayer-violet font-medium">Telegram:</span> @birdman1a
              </p>
            </div>
            <div className="bg-launchlayer-background rounded-xl p-4 font-mono text-launchlayer-mint text-sm mb-4">
              MVP (Testnet next week): www.launchlayer.io/landing
            </div>
            <Button 
              variant="accent" 
              className="w-full bg-gradient-to-r from-launchlayer-accent to-launchlayer-violet hover:scale-105 transition-all duration-300"
            >
              View Live Demo
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PitchDeckPage;
