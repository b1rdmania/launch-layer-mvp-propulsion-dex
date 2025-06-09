import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";

const PitchDeckPage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);

  const slides = [
    {
      id: 1,
      title: "Cover Slide",
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-8">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-launchlayer-accent to-launchlayer-violet bg-clip-text text-transparent">
              Launch Layer
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-launchlayer-text-primary">
              Built for What's Next.
            </h2>
            <p className="text-lg md:text-xl text-launchlayer-text-secondary max-w-2xl mx-auto">
              Chain-agnostic yield, launch, and liquidity infrastructure.
            </p>
          </div>
          
          <div className="text-sm text-launchlayer-text-secondary space-y-1">
            <p>[Your Name / Email / Telegram]</p>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: "The Opportunity",
      content: (
        <div className="space-y-8">
          <div className="text-center">
            <span className="px-4 py-2 rounded-full bg-launchlayer-violet/10 text-launchlayer-violet text-sm font-medium">
              THE OPPORTUNITY
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Problem */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-launchlayer-accent">The Problem</h3>
              <p className="text-sm text-launchlayer-text-secondary">
                Web3 token launches represent a $10B+ market, currently fragmented and inefficient:
              </p>
              <ul className="space-y-2 text-sm text-launchlayer-text-secondary">
                <li>• <strong>Users:</strong> Whitelist grind, capital risk, timing stress</li>
                <li>• <strong>Projects:</strong> Complex fundraising, vesting challenges</li>
                <li>• <strong>Chains:</strong> Lack integrated solutions for sticky TVL</li>
              </ul>
            </div>

            {/* Solution */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-launchlayer-mint">Our Solution</h3>
              <p className="text-sm text-launchlayer-text-secondary">
                One seamless stack solving user friction and liquidity challenges—fully automated.
              </p>
              <div className="space-y-3 text-sm">
                <div>
                  <h4 className="font-semibold text-launchlayer-violet">1. Airlocks (Yield Automation)</h4>
                  <p className="text-launchlayer-text-secondary">Automated yield-driven presale allocations</p>
                </div>
                <div>
                  <h4 className="font-semibold text-launchlayer-accent">2. Launch Layer (Premium Launchpad)</h4>
                  <p className="text-launchlayer-text-secondary">Institutional-grade launches via Magna</p>
                </div>
                <div>
                  <h4 className="font-semibold text-launchlayer-mint">3. Propulsion Finance (Advanced DEX)</h4>
                  <p className="text-launchlayer-text-secondary">Deep liquidity via Algebra v4 AMM</p>
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
        <div className="space-y-8">
          <div className="text-center">
            <span className="px-4 py-2 rounded-full bg-launchlayer-accent/10 text-launchlayer-accent text-sm font-medium">
              THE AIRLOCK MECHANISM
            </span>
            <h2 className="text-2xl md:text-3xl font-bold mt-4">Seamless automation—from staking to allocation</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center space-y-4 p-6 bg-launchlayer-surface rounded-xl border border-launchlayer-surface-light">
              <div className="w-12 h-12 bg-launchlayer-violet/20 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-launchlayer-violet">1</span>
              </div>
              <h3 className="text-lg font-bold text-launchlayer-violet">Stake</h3>
              <p className="text-sm text-launchlayer-text-secondary">
                Users deposit assets into Airlocks. Principal always liquid (withdraw anytime).
              </p>
            </div>

            <div className="text-center space-y-4 p-6 bg-launchlayer-surface rounded-xl border border-launchlayer-surface-light">
              <div className="w-12 h-12 bg-launchlayer-accent/20 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-launchlayer-accent">2</span>
              </div>
              <h3 className="text-lg font-bold text-launchlayer-accent">Earn Yield + Boost</h3>
              <p className="text-sm text-launchlayer-text-secondary">
                Generate validator yield (10-15% APY), plus project-funded bonus rewards.
              </p>
            </div>

            <div className="text-center space-y-4 p-6 bg-launchlayer-surface rounded-xl border border-launchlayer-surface-light">
              <div className="w-12 h-12 bg-launchlayer-mint/20 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-launchlayer-mint">3</span>
              </div>
              <h3 className="text-lg font-bold text-launchlayer-mint">Automated Allocation</h3>
              <p className="text-sm text-launchlayer-text-secondary">
                Yield auto-mints guaranteed presale allocations. Zero whitelist grind.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: "The Integrated Flywheel",
      content: (
        <div className="space-y-8">
          <div className="text-center">
            <span className="px-4 py-2 rounded-full bg-launchlayer-mint/10 text-launchlayer-mint text-sm font-medium">
              THE INTEGRATED FLYWHEEL
            </span>
            <h2 className="text-2xl md:text-3xl font-bold mt-4">Three standalone pillars forming a continuous loop</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-launchlayer-surface p-6 rounded-xl border-t-4 border-t-launchlayer-violet">
              <h3 className="text-lg font-bold text-launchlayer-violet mb-3">Airlocks (Yield Engine)</h3>
              <ul className="space-y-1 text-sm text-launchlayer-text-secondary">
                <li>• Liquid staking (principal unlocked)</li>
                <li>• High-yield validator APY</li>
                <li>• Project-funded "Degen Pools"</li>
              </ul>
            </div>

            <div className="bg-launchlayer-surface p-6 rounded-xl border-t-4 border-t-launchlayer-accent">
              <h3 className="text-lg font-bold text-launchlayer-accent mb-3">Launch Layer (Premium Launchpad)</h3>
              <ul className="space-y-1 text-sm text-launchlayer-text-secondary">
                <li>• Magna-powered TGE rails ($3.5B+ distributed)</li>
                <li>• Curated and permissionless launch lanes</li>
                <li>• Cross-chain token delivery</li>
              </ul>
            </div>

            <div className="bg-launchlayer-surface p-6 rounded-xl border-t-4 border-t-launchlayer-mint">
              <h3 className="text-lg font-bold text-launchlayer-mint mb-3">Propulsion Finance (DEX)</h3>
              <ul className="space-y-1 text-sm text-launchlayer-text-secondary">
                <li>• Algebra v4 concentrated liquidity AMM</li>
                <li>• Upgrade path: Uniswap v4 hooks</li>
                <li>• MEV capture via order-flow auctions</li>
              </ul>
            </div>
          </div>

          <div className="text-center bg-launchlayer-surface p-4 rounded-xl">
            <p className="text-sm font-medium text-launchlayer-accent">
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
        <div className="space-y-8">
          <div className="text-center">
            <span className="px-4 py-2 rounded-full bg-launchlayer-accent/10 text-launchlayer-accent text-sm font-medium">
              TRACTION & REVENUE
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Traction */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-launchlayer-accent">Traction Today</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-2">
                  <span className="text-green-400">✅</span>
                  <div>
                    <strong>MVP Deployed:</strong> Core contracts on Sepolia testnet, dashboard testing complete
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-green-400">✅</span>
                  <div>
                    <strong>Team Proven:</strong> Experienced yield-generation & validator ops
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-green-400">✅</span>
                  <div>
                    <strong>Ecosystem Partnerships:</strong> Strategic integrations and GTM discussions
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <h4 className="font-semibold text-launchlayer-violet mb-2">Initial Target Chains:</h4>
                <p className="text-sm text-launchlayer-text-secondary">Base, Hype, MegaETH, Sonic</p>
              </div>
            </div>

            {/* Revenue */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-launchlayer-mint">Revenue Model</h3>
              <p className="text-sm text-launchlayer-text-secondary mb-3">Protocol captures fees from:</p>
              <ul className="space-y-2 text-sm text-launchlayer-text-secondary">
                <li>• Project Raises (~5% platform fee)</li>
                <li>• User Yield (~10% of generated yield)</li>
                <li>• AMM Trading Fees (protocol share)</li>
              </ul>

              <div className="bg-launchlayer-surface p-4 rounded-xl mt-4">
                <h4 className="font-semibold text-launchlayer-accent mb-2">Example:</h4>
                <p className="text-sm text-launchlayer-text-secondary">
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
        <div className="space-y-8">
          <div className="text-center">
            <span className="px-4 py-2 rounded-full bg-launchlayer-violet/10 text-launchlayer-violet text-sm font-medium">
              TEAM & PARTNERS
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Core Team */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-launchlayer-accent">Core Team</h3>
              <div className="space-y-3">
                <div className="bg-launchlayer-surface p-4 rounded-xl">
                  <h4 className="font-semibold text-launchlayer-violet">Andy (Co-Founder)</h4>
                  <p className="text-sm text-launchlayer-text-secondary">Product & Strategy</p>
                </div>
                <div className="bg-launchlayer-surface p-4 rounded-xl">
                  <h4 className="font-semibold text-launchlayer-accent">Stable (Co-Founder)</h4>
                  <p className="text-sm text-launchlayer-text-secondary">Technical Architecture & Ops</p>
                </div>
                <div className="bg-launchlayer-surface p-4 rounded-xl">
                  <h4 className="font-semibold text-launchlayer-mint">Jitin (Tech Lead)</h4>
                  <p className="text-sm text-launchlayer-text-secondary">Yield-generation & validator ops (via Infrasingularity)</p>
                </div>
              </div>
            </div>

            {/* Strategic Partners */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-launchlayer-mint">Strategic Partners</h3>
              <div className="space-y-3">
                <div className="bg-launchlayer-surface p-4 rounded-xl">
                  <h4 className="font-semibold text-launchlayer-violet">Hype Marketing Agency</h4>
                  <p className="text-sm text-launchlayer-text-secondary">GTM & community</p>
                </div>
                <div className="bg-launchlayer-surface p-4 rounded-xl">
                  <h4 className="font-semibold text-launchlayer-accent">Nakamoto Labs/Eli Bernstein</h4>
                  <p className="text-sm text-launchlayer-text-secondary">Legal counsel</p>
                </div>
                <div className="bg-launchlayer-surface p-4 rounded-xl">
                  <h4 className="font-semibold text-launchlayer-mint">Airfoil Studios</h4>
                  <p className="text-sm text-launchlayer-text-secondary">Front-end coherence</p>
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
        <div className="flex flex-col items-center justify-center h-full text-center space-y-8">
          <div className="space-y-6">
            <span className="px-4 py-2 rounded-full bg-launchlayer-accent/10 text-launchlayer-accent text-sm font-medium">
              OUR VISION
            </span>
            <h2 className="text-2xl md:text-4xl font-bold max-w-4xl mx-auto leading-tight">
              To become the ubiquitous standard for how quality Web3 projects launch, scale, and sustainably retain liquidity and users cross-chain.
            </h2>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-launchlayer-violet">Contact</h3>
            <div className="text-launchlayer-text-secondary space-y-1">
              <p>[Your Name]</p>
              <p>[Your Email]</p>
              <p>[Telegram]</p>
            </div>
            <div className="pt-4">
              <p className="text-sm text-launchlayer-text-secondary">
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
