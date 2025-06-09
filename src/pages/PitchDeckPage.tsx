import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, Pause, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const PitchDeckPage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);

  const slides = [
    {
      id: 1,
      title: "Cover Slide",
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-12">
          <div className="space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-launchlayer-accent to-launchlayer-violet bg-clip-text text-transparent">
              Launch Layer
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold text-launchlayer-text-primary">
              Built for What's Next.
            </h2>
            <p className="text-xl md:text-2xl text-launchlayer-text-secondary max-w-3xl mx-auto">
              Chain-agnostic yield, launch, and liquidity infrastructure.
            </p>
          </div>
          
          <div className="text-base text-launchlayer-text-secondary">
            <p>[Andy / andy@launchlayer.io / @birdman1a]</p>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: "The Opportunity",
      content: (
        <div className="space-y-10">
          <div className="text-center">
            <span className="px-6 py-3 rounded-full bg-launchlayer-violet/10 text-launchlayer-violet text-lg font-medium">
              THE OPPORTUNITY
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Problem Section */}
            <div className="bg-launchlayer-surface rounded-xl border border-launchlayer-surface-light p-8 space-y-6">
              <h3 className="text-2xl font-bold text-launchlayer-accent border-b border-launchlayer-surface-light pb-3">
                The Problem
              </h3>
              <p className="text-base text-launchlayer-text-secondary mb-4">
                Web3 token launches represent a $10B+ market, currently fragmented and inefficient:
              </p>
              <ul className="space-y-4 text-base text-launchlayer-text-secondary">
                <li className="flex items-start space-x-3">
                  <span className="text-red-400 mt-1">•</span>
                  <div><strong className="text-launchlayer-text-primary">Users:</strong> Whitelist grind, capital risk, timing stress</div>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-red-400 mt-1">•</span>
                  <div><strong className="text-launchlayer-text-primary">Projects:</strong> Complex fundraising, vesting challenges</div>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-red-400 mt-1">•</span>
                  <div><strong className="text-launchlayer-text-primary">Chains:</strong> Lack integrated solutions for sticky TVL</div>
                </li>
              </ul>
            </div>

            {/* Solution Section */}
            <div className="bg-launchlayer-surface rounded-xl border border-launchlayer-surface-light p-8 space-y-6">
              <h3 className="text-2xl font-bold text-launchlayer-mint border-b border-launchlayer-surface-light pb-3">
                Our Solution
              </h3>
              <p className="text-base text-launchlayer-text-secondary mb-4">
                One seamless stack solving user friction and liquidity challenges—fully automated.
              </p>
              <div className="space-y-5">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-launchlayer-violet/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold text-launchlayer-violet">1</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-launchlayer-violet text-lg">Airlocks (Yield Automation)</h4>
                    <p className="text-launchlayer-text-secondary">Automated yield-driven presale allocations</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-launchlayer-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold text-launchlayer-accent">2</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-launchlayer-accent text-lg">Launch Layer (Premium Launchpad)</h4>
                    <p className="text-launchlayer-text-secondary">Institutional-grade launches via Magna</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-launchlayer-mint/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold text-launchlayer-mint">3</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-launchlayer-mint text-lg">Propulsion Finance (Advanced DEX)</h4>
                    <p className="text-launchlayer-text-secondary">Deep liquidity via Algebra v4 AMM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "How it Works: The Airlock Mechanism",
      content: (
        <div className="space-y-10">
          <div className="text-center space-y-4">
            <span className="px-6 py-3 rounded-full bg-launchlayer-accent/10 text-launchlayer-accent text-lg font-medium">
              THE AIRLOCK MECHANISM
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">Seamless automation—from staking to allocation</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-6 p-8 bg-launchlayer-surface rounded-xl border-2 border-launchlayer-violet/30 relative">
              <div className="absolute top-4 left-4 w-10 h-10 bg-launchlayer-violet rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-white">1</span>
              </div>
              <div className="pt-6">
                <h3 className="text-2xl font-bold text-launchlayer-violet mb-4">Stake</h3>
                <p className="text-base text-launchlayer-text-secondary leading-relaxed">
                  Users deposit assets into Airlocks. Principal always liquid (withdraw anytime).
                </p>
              </div>
            </div>

            <div className="text-center space-y-6 p-8 bg-launchlayer-surface rounded-xl border-2 border-launchlayer-mint/30 relative">
              <div className="absolute top-4 left-4 w-10 h-10 bg-launchlayer-mint rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-white">2</span>
              </div>
              <div className="pt-6">
                <h3 className="text-2xl font-bold text-launchlayer-mint mb-4">Earn Yield + Boost</h3>
                <p className="text-base text-launchlayer-text-secondary leading-relaxed">
                  Generate validator yield (10-15% APY) plus project-funded bonus rewards.
                </p>
              </div>
            </div>

            <div className="text-center space-y-6 p-8 bg-launchlayer-surface rounded-xl border-2 border-launchlayer-accent/30 relative">
              <div className="absolute top-4 left-4 w-10 h-10 bg-launchlayer-accent rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-white">3</span>
              </div>
              <div className="pt-6">
                <h3 className="text-2xl font-bold text-launchlayer-accent mb-4">Automated Allocation</h3>
                <p className="text-base text-launchlayer-text-secondary leading-relaxed">
                  Yield auto-mints guaranteed presale allocations. Zero whitelist grind.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: "The Integrated Flywheel",
      content: (
        <div className="space-y-10">
          <div className="text-center space-y-4">
            <span className="px-6 py-3 rounded-full bg-launchlayer-mint/10 text-launchlayer-mint text-lg font-medium">
              THE INTEGRATED FLYWHEEL
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">Three standalone pillars forming a continuous loop</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-launchlayer-surface p-8 rounded-xl border-t-4 border-t-launchlayer-violet space-y-4">
              <h3 className="text-xl font-bold text-launchlayer-violet border-b border-launchlayer-surface-light pb-3">
                Airlocks (Yield Engine)
              </h3>
              <ul className="space-y-3 text-base text-launchlayer-text-secondary">
                <li className="flex items-start space-x-3">
                  <span className="text-launchlayer-violet mt-1">•</span>
                  <span>Liquid staking (principal unlocked)</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-launchlayer-violet mt-1">•</span>
                  <span>High-yield validator APY</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-launchlayer-violet mt-1">•</span>
                  <span>Project-funded "Degen Pools"</span>
                </li>
              </ul>
            </div>

            <div className="bg-launchlayer-surface p-8 rounded-xl border-t-4 border-t-launchlayer-accent space-y-4">
              <h3 className="text-xl font-bold text-launchlayer-accent border-b border-launchlayer-surface-light pb-3">
                Launch Layer (Premium Launchpad)
              </h3>
              <ul className="space-y-3 text-base text-launchlayer-text-secondary">
                <li className="flex items-start space-x-3">
                  <span className="text-launchlayer-accent mt-1">•</span>
                  <span>Magna-powered TGE rails ($3.5B+ distributed)</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-launchlayer-accent mt-1">•</span>
                  <span>Curated and permissionless launch lanes</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-launchlayer-accent mt-1">•</span>
                  <span>Cross-chain token delivery</span>
                </li>
              </ul>
            </div>

            <div className="bg-launchlayer-surface p-8 rounded-xl border-t-4 border-t-launchlayer-mint space-y-4">
              <h3 className="text-xl font-bold text-launchlayer-mint border-b border-launchlayer-surface-light pb-3">
                Propulsion Finance (DEX)
              </h3>
              <ul className="space-y-3 text-base text-launchlayer-text-secondary">
                <li className="flex items-start space-x-3">
                  <span className="text-launchlayer-mint mt-1">•</span>
                  <span>Algebra v4 concentrated liquidity AMM</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-launchlayer-mint mt-1">•</span>
                  <span>Upgrade path: Uniswap v4 hooks</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-launchlayer-mint mt-1">•</span>
                  <span>MEV capture via order-flow auctions</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center bg-launchlayer-surface p-6 rounded-xl border border-launchlayer-accent/30">
            <p className="text-lg font-bold text-launchlayer-accent">
              <strong>Moat:</strong> Our integrated flywheel compounds users, liquidity, and TVL—generating defensible, recurring protocol revenue.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 5,
      title: "Traction, GTM, Revenue",
      content: (
        <div className="space-y-10">
          <div className="text-center">
            <span className="px-6 py-3 rounded-full bg-launchlayer-accent/10 text-launchlayer-accent text-lg font-medium">
              TRACTION & REVENUE
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Traction Section */}
            <div className="bg-launchlayer-surface rounded-xl border border-launchlayer-surface-light p-8 space-y-6">
              <h3 className="text-2xl font-bold text-launchlayer-accent border-b border-launchlayer-surface-light pb-3">
                Traction Today
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-4 bg-launchlayer-background rounded-lg">
                  <Check className="text-green-400 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <strong className="text-launchlayer-text-primary">MVP Deployed:</strong>
                    <span className="text-launchlayer-text-secondary ml-2">Core contracts on Sepolia testnet, dashboard testing complete</span>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-4 bg-launchlayer-background rounded-lg">
                  <Check className="text-green-400 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <strong className="text-launchlayer-text-primary">Team Proven:</strong>
                    <span className="text-launchlayer-text-secondary ml-2">Experienced yield-generation & validator ops</span>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-4 bg-launchlayer-background rounded-lg">
                  <Check className="text-green-400 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <strong className="text-launchlayer-text-primary">Ecosystem Partnerships:</strong>
                    <span className="text-launchlayer-text-secondary ml-2">Strategic integrations and GTM discussions</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-launchlayer-violet/10 rounded-lg border border-launchlayer-violet/30">
                <h4 className="font-bold text-launchlayer-violet mb-2">Initial Target Chains:</h4>
                <p className="text-launchlayer-text-secondary">Base, Hype, MegaETH, Sonic</p>
              </div>
            </div>

            {/* Revenue Section */}
            <div className="bg-launchlayer-surface rounded-xl border border-launchlayer-surface-light p-8 space-y-6">
              <h3 className="text-2xl font-bold text-launchlayer-mint border-b border-launchlayer-surface-light pb-3">
                Revenue Model
              </h3>
              <p className="text-base text-launchlayer-text-secondary mb-4">Protocol captures fees from:</p>
              <ul className="space-y-3 text-base text-launchlayer-text-secondary">
                <li className="flex items-start space-x-3">
                  <span className="text-launchlayer-mint mt-1">•</span>
                  <span>Project Raises (~5% platform fee)</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-launchlayer-mint mt-1">•</span>
                  <span>User Yield (~10% of generated yield)</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-launchlayer-mint mt-1">•</span>
                  <span>AMM Trading Fees (protocol share)</span>
                </li>
              </ul>

              <div className="bg-launchlayer-accent/10 p-6 rounded-xl border border-launchlayer-accent/30 mt-6">
                <h4 className="font-bold text-launchlayer-accent mb-3 text-lg">Example:</h4>
                <p className="text-launchlayer-text-secondary">
                  A single $5M Airlock fueling four $2M TGEs = ~$500K protocol revenue per cycle.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 6,
      title: "Battle-Tested Team & Strategic Partners",
      content: (
        <div className="space-y-10">
          <div className="text-center">
            <span className="px-6 py-3 rounded-full bg-launchlayer-violet/10 text-launchlayer-violet text-lg font-medium">
              TEAM & PARTNERS
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Core Team Section */}
            <div className="bg-launchlayer-surface rounded-xl border border-launchlayer-surface-light p-8 space-y-6">
              <h3 className="text-2xl font-bold text-launchlayer-accent border-b border-launchlayer-surface-light pb-3">
                Core Team
              </h3>
              <div className="space-y-4">
                <div className="bg-launchlayer-background p-5 rounded-xl border-l-4 border-l-launchlayer-violet">
                  <h4 className="font-bold text-launchlayer-violet text-lg">Andy (Co-Founder)</h4>
                  <p className="text-launchlayer-text-secondary">Product & Strategy</p>
                </div>
                <div className="bg-launchlayer-background p-5 rounded-xl border-l-4 border-l-launchlayer-accent">
                  <h4 className="font-bold text-launchlayer-accent text-lg">Stable (Co-Founder)</h4>
                  <p className="text-launchlayer-text-secondary">Business Development & Partnerships</p>
                </div>
                <div className="bg-launchlayer-background p-5 rounded-xl border-l-4 border-l-launchlayer-mint">
                  <h4 className="font-bold text-launchlayer-mint text-lg">Jitin (Tech Lead)</h4>
                  <p className="text-launchlayer-text-secondary">Yield-generation & validator ops (via Infrasingularity)</p>
                </div>
              </div>
            </div>

            {/* Strategic Partners Section */}
            <div className="bg-launchlayer-surface rounded-xl border border-launchlayer-surface-light p-8 space-y-6">
              <h3 className="text-2xl font-bold text-launchlayer-mint border-b border-launchlayer-surface-light pb-3">
                Strategic Partners
              </h3>
              <div className="space-y-4">
                <div className="bg-launchlayer-background p-5 rounded-xl border-l-4 border-l-launchlayer-violet">
                  <h4 className="font-bold text-launchlayer-violet text-lg">Hype Marketing Agency</h4>
                  <p className="text-launchlayer-text-secondary">GTM & community</p>
                </div>
                <div className="bg-launchlayer-background p-5 rounded-xl border-l-4 border-l-launchlayer-accent">
                  <h4 className="font-bold text-launchlayer-accent text-lg">Nakamoto Labs / Eli Bernstein</h4>
                  <p className="text-launchlayer-text-secondary">Legal counsel</p>
                </div>
                <div className="bg-launchlayer-background p-5 rounded-xl border-l-4 border-l-launchlayer-mint">
                  <h4 className="font-bold text-launchlayer-mint text-lg">Airfoil Studios</h4>
                  <p className="text-launchlayer-text-secondary">Front-end coherence</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 7,
      title: "Vision & Contact",
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-12">
          <div className="space-y-8">
            <span className="px-6 py-3 rounded-full bg-launchlayer-accent/10 text-launchlayer-accent text-lg font-medium">
              OUR VISION
            </span>
            <h2 className="text-3xl md:text-4xl font-bold max-w-5xl mx-auto leading-tight">
              To become the ubiquitous standard for how quality Web3 projects launch, scale, and sustainably retain liquidity and users cross-chain.
            </h2>
          </div>
          
          <div className="space-y-6 bg-launchlayer-surface p-8 rounded-xl border border-launchlayer-surface-light">
            <h3 className="text-2xl font-bold text-launchlayer-violet">Contact</h3>
            <div className="text-launchlayer-text-secondary space-y-2 text-lg">
              <p><strong className="text-launchlayer-text-primary">Andy</strong></p>
              <p><strong className="text-launchlayer-text-primary">andy@launchlayer.io</strong></p>
              <p><strong className="text-launchlayer-text-primary">Telegram - @birdman1a</strong></p>
            </div>
            <div className="pt-4 border-t border-launchlayer-surface-light">
              <p className="text-base text-launchlayer-accent font-bold">
                <strong>MVP Demo:</strong> <span className="text-launchlayer-accent">launchlayer.io/landing</span>
              </p>
            </div>
          </div>
        </div>
      )
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlay) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlay, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen bg-launchlayer-background text-launchlayer-text-primary">
      {/* Header */}
      <header className="bg-launchlayer-surface border-b border-launchlayer-surface-light p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img 
              src="/lovable-uploads/c054fc20-c0d7-4c0c-9d55-8dc40e350c79.png" 
              alt="Launch Layer Logo" 
              className="h-8 w-auto" 
            />
            <h1 className="text-xl font-bold bg-gradient-to-r from-launchlayer-accent to-launchlayer-violet bg-clip-text text-transparent">
              Launch Layer Pitch Deck
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className="flex items-center space-x-2"
            >
              {isAutoPlay ? <Pause size={16} /> : <Play size={16} />}
              <span>{isAutoPlay ? 'Pause' : 'Auto Play'}</span>
            </Button>
            
            <div className="text-sm text-launchlayer-text-secondary">
              {currentSlide + 1} / {slides.length}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-6 h-[calc(100vh-80px)] flex flex-col">
        {/* Slide Content */}
        <div className="flex-1 bg-launchlayer-surface rounded-xl border border-launchlayer-surface-light p-8 mb-6 overflow-hidden">
          <div className="h-full">
            {slides[currentSlide].content}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="flex items-center space-x-2"
          >
            <ChevronLeft size={16} />
            <span>Previous</span>
          </Button>

          {/* Slide Indicators */}
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide 
                    ? 'bg-launchlayer-accent' 
                    : 'bg-launchlayer-surface-light hover:bg-launchlayer-text-secondary'
                }`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="flex items-center space-x-2"
          >
            <span>Next</span>
            <ChevronRight size={16} />
          </Button>
        </div>
      </main>
    </div>
  );
};

export default PitchDeckPage;
