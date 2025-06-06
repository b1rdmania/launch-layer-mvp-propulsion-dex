
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, Target, Zap, Shield, TrendingUp, Users, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDeviceDetect } from "@/hooks/useDeviceDetect";

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
      title: "Traction & Model",
      component: <TractionSlide />
    },
    {
      id: 5,
      title: "Team & Ask",
      component: <TeamSlide />
    },
    {
      id: 6,
      title: "Vision",
      component: <VisionSlide />
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
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="text-center max-w-4xl mx-auto">
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
        
        <div className="inline-block bg-launchlayer-surface border border-launchlayer-surface-light rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
          <p className="text-launchlayer-text-secondary font-mono">
            birdmania@launchlayer.io
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
            The Opportunity & The "Airlock" Solution
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-launchlayer-violet to-launchlayer-mint rounded-full mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="bg-launchlayer-surface/50 backdrop-blur-sm border border-launchlayer-surface-light rounded-2xl p-8 hover:shadow-[0_8px_32px_rgba(255,107,59,0.15)] transition-all duration-300">
              <div className="flex items-center mb-4">
                <Target className="w-8 h-8 text-launchlayer-error mr-4" />
                <h3 className="text-2xl font-bold text-launchlayer-text-primary">The Problem</h3>
              </div>
              <p className="text-launchlayer-text-secondary leading-relaxed">
                DeFi launches are fragmented. Users face capital-inefficient access to presales. 
                Projects struggle with fundraising, vesting, and securing day-one liquidity.
              </p>
            </div>

            <div className="bg-launchlayer-surface/50 backdrop-blur-sm border border-launchlayer-surface-light rounded-2xl p-8 hover:shadow-[0_8px_32px_rgba(50,119,245,0.15)] transition-all duration-300">
              <div className="flex items-center mb-4">
                <Zap className="w-8 h-8 text-launchlayer-accent mr-4" />
                <h3 className="text-2xl font-bold text-launchlayer-text-primary">Our Solution</h3>
              </div>
              <p className="text-launchlayer-text-secondary leading-relaxed">
                An integrated platform that turns user yield directly into project access.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-launchlayer-surface to-launchlayer-surface/80 backdrop-blur-sm border border-launchlayer-surface-light rounded-3xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold mb-6 text-center text-launchlayer-accent">The "Airlock" Mechanism</h3>
            <div className="space-y-4">
              <div className="flex items-center p-4 bg-launchlayer-background/50 rounded-xl border border-launchlayer-surface-light">
                <div className="w-8 h-8 bg-launchlayer-violet/20 rounded-full flex items-center justify-center mr-4">
                  <span className="text-launchlayer-violet font-bold">1</span>
                </div>
                <p className="text-launchlayer-text-secondary">Users stake assets on-chain (principal always liquid)</p>
              </div>
              <ArrowRight className="w-6 h-6 text-launchlayer-accent mx-auto" />
              <div className="flex items-center p-4 bg-launchlayer-background/50 rounded-xl border border-launchlayer-surface-light">
                <div className="w-8 h-8 bg-launchlayer-mint/20 rounded-full flex items-center justify-center mr-4">
                  <span className="text-launchlayer-mint font-bold">2</span>
                </div>
                <p className="text-launchlayer-text-secondary">Generate real validator yield (targeting 10-25% APY)</p>
              </div>
              <ArrowRight className="w-6 h-6 text-launchlayer-accent mx-auto" />
              <div className="flex items-center p-4 bg-launchlayer-background/50 rounded-xl border border-launchlayer-surface-light">
                <div className="w-8 h-8 bg-launchlayer-accent/20 rounded-full flex items-center justify-center mr-4">
                  <span className="text-launchlayer-accent font-bold">3</span>
                </div>
                <p className="text-launchlayer-text-secondary">Yield automatically buys guaranteed allocations in curated TGEs</p>
              </div>
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
            The Integrated Platform & Our Moat
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-launchlayer-violet to-launchlayer-mint rounded-full mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-launchlayer-surface/50 backdrop-blur-sm border border-launchlayer-surface-light rounded-2xl p-6 hover:shadow-[0_8px_32px_rgba(50,119,245,0.15)] transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-launchlayer-accent/20 rounded-xl flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-launchlayer-accent" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-launchlayer-text-primary">Launch Layer</h3>
            <p className="text-launchlayer-text-secondary text-sm leading-relaxed">
              A full-service TGE platform with tiered launches (curated & permissionless) and Magna-powered vesting.
            </p>
          </div>

          <div className="bg-launchlayer-surface/50 backdrop-blur-sm border border-launchlayer-surface-light rounded-2xl p-6 hover:shadow-[0_8px_32px_rgba(167,139,250,0.15)] transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-launchlayer-violet/20 rounded-xl flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-launchlayer-violet" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-launchlayer-text-primary">"Airlocks"</h3>
            <p className="text-launchlayer-text-secondary text-sm leading-relaxed">
              The yield-to-access staking system that attracts sticky TVL to our host chains (initially Base & HyperEVM).
            </p>
          </div>

          <div className="bg-launchlayer-surface/50 backdrop-blur-sm border border-launchlayer-surface-light rounded-2xl p-6 hover:shadow-[0_8px_32px_rgba(99,206,198,0.15)] transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-launchlayer-mint/20 rounded-xl flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-launchlayer-mint" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-launchlayer-text-primary">Integrated DEX</h3>
            <p className="text-launchlayer-text-secondary text-sm leading-relaxed">
              An Algebra-powered AMM for instant, capital-efficient liquidity, with automated LP seeding.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-launchlayer-accent/10 via-launchlayer-violet/10 to-launchlayer-mint/10 backdrop-blur-sm border border-launchlayer-surface-light rounded-3xl p-8 shadow-2xl">
          <h3 className="text-2xl font-bold mb-4 text-center text-launchlayer-text-primary">Our Defensible Moat</h3>
          <p className="text-lg text-launchlayer-text-secondary text-center leading-relaxed max-w-4xl mx-auto">
            The defensibility lies in the <span className="text-launchlayer-accent font-semibold">synergy of this integrated flywheel</span>. 
            Airlocks attract users, who provide an audience for projects, which launch and seed liquidity on our DEX—creating a 
            value-generating loop that is <span className="text-launchlayer-violet font-semibold">difficult and costly for competitors to replicate</span> from scratch.
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
            Traction & Business Model
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-launchlayer-violet to-launchlayer-mint rounded-full mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-launchlayer-accent">Traction Today</h3>
            <p className="text-lg text-launchlayer-text-secondary mb-6 italic">We're not just a whitepaper</p>
            
            <div className="space-y-4">
              <div className="flex items-start p-4 bg-launchlayer-surface/50 backdrop-blur-sm border border-launchlayer-surface-light rounded-xl">
                <div className="w-3 h-3 bg-launchlayer-accent rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-launchlayer-text-primary mb-1">MVP Built</h4>
                  <p className="text-launchlayer-text-secondary text-sm">Core Launchpad + Magna integration hits testnet next week.</p>
                </div>
              </div>
              
              <div className="flex items-start p-4 bg-launchlayer-surface/50 backdrop-blur-sm border border-launchlayer-surface-light rounded-xl">
                <div className="w-3 h-3 bg-launchlayer-violet rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-launchlayer-text-primary mb-1">Expert Team</h4>
                  <p className="text-launchlayer-text-secondary text-sm">Tech lead's team (from Infrasingularity) has proven validator/yield expertise.</p>
                </div>
              </div>
              
              <div className="flex items-start p-4 bg-launchlayer-surface/50 backdrop-blur-sm border border-launchlayer-surface-light rounded-xl">
                <div className="w-3 h-3 bg-launchlayer-mint rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-launchlayer-text-primary mb-1">BD Secured</h4>
                  <p className="text-launchlayer-text-secondary text-sm">Onboarded senior BD lead from Fjord to drive partnerships.</p>
                </div>
              </div>
              
              <div className="flex items-start p-4 bg-launchlayer-surface/50 backdrop-blur-sm border border-launchlayer-surface-light rounded-xl">
                <div className="w-3 h-3 bg-launchlayer-accent rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-launchlayer-text-primary mb-1">Ecosystem Ready</h4>
                  <p className="text-launchlayer-text-secondary text-sm">Active discussions with Algebra and go-to-market partners.</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6 text-launchlayer-mint">Business Model: Fees at Every Step</h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between p-4 bg-launchlayer-surface/50 backdrop-blur-sm border border-launchlayer-surface-light rounded-xl">
                <span className="text-launchlayer-text-primary">Project Raises</span>
                <span className="text-launchlayer-accent font-semibold">~5% platform fee</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-launchlayer-surface/50 backdrop-blur-sm border border-launchlayer-surface-light rounded-xl">
                <span className="text-launchlayer-text-primary">User Yield</span>
                <span className="text-launchlayer-violet font-semibold">~10% share of yield</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-launchlayer-surface/50 backdrop-blur-sm border border-launchlayer-surface-light rounded-xl">
                <span className="text-launchlayer-text-primary">AMM Trades</span>
                <span className="text-launchlayer-mint font-semibold">Protocol share of fees</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-launchlayer-accent/20 to-launchlayer-violet/20 backdrop-blur-sm border border-launchlayer-surface-light rounded-2xl p-6">
              <h4 className="font-bold text-launchlayer-text-primary mb-2">Example Revenue</h4>
              <p className="text-launchlayer-text-secondary text-sm leading-relaxed">
                A single $5M Airlock fueling four $2M launches could generate <span className="text-launchlayer-accent font-semibold">over $500k</span> for the protocol.
              </p>
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
            The Team & The Ask
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-launchlayer-violet to-launchlayer-mint rounded-full mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-launchlayer-accent flex items-center">
              <Users className="w-8 h-8 mr-3" />
              Core Team
            </h3>
            
            <div className="space-y-4">
              <div className="p-6 bg-launchlayer-surface/50 backdrop-blur-sm border border-launchlayer-surface-light rounded-xl hover:shadow-[0_8px_32px_rgba(50,119,245,0.15)] transition-all duration-300">
                <h4 className="font-bold text-launchlayer-text-primary mb-1">Birdmania</h4>
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
                <p className="text-launchlayer-text-secondary text-sm">Expertise in yield generation & validators</p>
              </div>
              
              <div className="p-6 bg-launchlayer-surface/50 backdrop-blur-sm border border-launchlayer-surface-light rounded-xl hover:shadow-[0_8px_32px_rgba(50,119,245,0.15)] transition-all duration-300">
                <h4 className="font-bold text-launchlayer-text-primary mb-1">BD Lead</h4>
                <p className="text-launchlayer-accent text-sm font-medium mb-2">Head of Partnerships (Ex-Fjord)</p>
                <p className="text-launchlayer-text-secondary text-sm">Strategic partnerships & ecosystem development</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6 text-launchlayer-mint flex items-center">
              <DollarSign className="w-8 h-8 mr-3" />
              The Ask
            </h3>
            
            <div className="bg-gradient-to-br from-launchlayer-surface to-launchlayer-surface/80 backdrop-blur-sm border border-launchlayer-surface-light rounded-3xl p-8 shadow-2xl">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-gradient bg-gradient-to-r from-launchlayer-accent to-launchlayer-violet bg-clip-text text-transparent">
                  $2.5M - $3.0M
                </div>
                <p className="text-launchlayer-text-secondary mt-2">Pre-Seed/Seed Round</p>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-launchlayer-background/50 rounded-xl border border-launchlayer-surface-light">
                  <h4 className="font-semibold text-launchlayer-text-primary mb-2">Purpose</h4>
                  <p className="text-launchlayer-text-secondary text-sm">
                    To accelerate development and go-to-market for the full integrated ecosystem.
                  </p>
                </div>
                
                <div className="p-4 bg-launchlayer-background/50 rounded-xl border border-launchlayer-surface-light">
                  <h4 className="font-semibold text-launchlayer-text-primary mb-2">Use of Funds</h4>
                  <p className="text-launchlayer-text-secondary text-sm">
                    Primarily for Airlock & DEX development, Tier-1 security audits, and GTM on our first two chains.
                  </p>
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

const VisionSlide: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gradient-violet">
            Vision & Contact
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-launchlayer-violet to-launchlayer-mint rounded-full mx-auto"></div>
        </div>

        <div className="bg-gradient-to-br from-launchlayer-surface to-launchlayer-surface/80 backdrop-blur-sm border border-launchlayer-surface-light rounded-3xl p-12 shadow-2xl mb-12">
          <h3 className="text-3xl font-bold mb-6 text-launchlayer-text-primary">Our Vision</h3>
          <p className="text-xl text-launchlayer-text-secondary leading-relaxed">
            To become the <span className="text-launchlayer-accent font-semibold">ubiquitous, cross-chain standard</span> for how quality projects go to market and how users gain 
            <span className="text-launchlayer-violet font-semibold"> capital-efficient access</span> to the future of Web3.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-launchlayer-surface/50 backdrop-blur-sm border border-launchlayer-surface-light rounded-2xl p-8 hover:shadow-[0_8px_32px_rgba(50,119,245,0.15)] transition-all duration-300">
            <h4 className="text-xl font-bold mb-4 text-launchlayer-text-primary">Contact</h4>
            <div className="space-y-2 text-left">
              <p className="text-launchlayer-text-secondary">
                <span className="text-launchlayer-accent font-medium">Name:</span> Birdmania
              </p>
              <p className="text-launchlayer-text-secondary">
                <span className="text-launchlayer-violet font-medium">Email:</span> birdmania@launchlayer.io
              </p>
              <p className="text-launchlayer-text-secondary">
                <span className="text-launchlayer-mint font-medium">Telegram:</span> @birdmania
              </p>
            </div>
          </div>

          <div className="bg-launchlayer-surface/50 backdrop-blur-sm border border-launchlayer-surface-light rounded-2xl p-8 hover:shadow-[0_8px_32px_rgba(99,206,198,0.15)] transition-all duration-300">
            <h4 className="text-xl font-bold mb-4 text-launchlayer-text-primary">MVP Demo</h4>
            <div className="bg-launchlayer-background rounded-xl p-4 font-mono text-launchlayer-mint">
              www.launchlayer.io/landing
            </div>
            <Button 
              variant="accent" 
              className="w-full mt-4 bg-gradient-to-r from-launchlayer-accent to-launchlayer-violet hover:scale-105 transition-all duration-300"
            >
              View Live Demo
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        <div className="mt-12 text-sm text-launchlayer-text-secondary">
          <p>Use arrow keys or click navigation to browse slides</p>
        </div>
      </div>
    </div>
  );
};

export default PitchDeckPage;
