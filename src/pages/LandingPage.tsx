
import React from "react";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import CurrentRaisesSection from "@/components/landing/CurrentRaisesSection";
import BackgroundPatternSection from "@/components/landing/BackgroundPatternSection";
import { useDeviceDetect } from "@/hooks/useDeviceDetect";
import { Card, CardContent } from "@/components/ui/card";
import { Star, CheckCircle, FileCode, Settings, Clipboard, Timer, FileText } from "lucide-react";

const LandingPage: React.FC = () => {
  const { isMobile, isIOS } = useDeviceDetect();
  
  // Add iOS-specific class if needed
  React.useEffect(() => {
    if (isIOS) {
      document.body.classList.add('ios-device');
    } else {
      document.body.classList.remove('ios-device');
    }
    
    return () => {
      document.body.classList.remove('ios-device');
    };
  }, [isIOS]);

  // Premium features for the about section
  const premiumFeatures = [
    {
      title: "Zero Platform Token",
      description: "No proprietary token required. Launch on Sonic without unnecessary token dependencies.",
      icon: <Star size={24} className="text-launchlayer-violet" />
    },
    {
      title: "Permissionless Design",
      description: "Anyone can launch without approval processes or gatekeeping.",
      icon: <CheckCircle size={24} className="text-launchlayer-violet" />
    },
    {
      title: "Fixed Price Mechanics",
      description: "Simple, transparent pricing for participants with no complex bonding curves.",
      icon: <FileCode size={24} className="text-launchlayer-violet" />
    }
  ];

  // Define steps for the launch process section
  const steps = [
    { 
      text: "Configure your token sale parameters", 
      icon: <Settings size={18} className="text-launchlayer-mint" /> 
    },
    { 
      text: "Deploy your contract on Sonic", 
      icon: <Clipboard size={18} className="text-launchlayer-mint" /> 
    },
    { 
      text: "Community contributes during sale phases", 
      icon: <Timer size={18} className="text-launchlayer-mint" /> 
    },
    { 
      text: "Finalize and collect your funds", 
      icon: <CheckCircle size={18} className="text-launchlayer-mint" /> 
    },
    { 
      text: "Export data for Magna vesting setup", 
      icon: <FileText size={18} className="text-launchlayer-mint" /> 
    },
  ];
  
  return (
    <div className="bg-launchlayer-background overflow-hidden">
      <BackgroundPatternSection />
      {/* Content */}
      <div className="relative z-10">
        <HeroSection />
        <CurrentRaisesSection />
        <FeaturesSection />

        {/* Core Principles Section */}
        <section className="py-16 bg-launchlayer-background relative">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-launchlayer-accent/5 blur-[80px]"></div>
          </div>
          
          <div className="container mx-auto px-8 max-w-[1280px]">
            <div className="text-center mb-12">
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-launchlayer-accent/10 text-launchlayer-accent mb-2 inline-block">Core Principles</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-wider bg-gradient-to-r from-launchlayer-accent to-launchlayer-violet bg-clip-text text-transparent">
                Built For Serious Builders
              </h2>
              <p className="text-launchlayer-text-secondary max-w-2xl mx-auto">
                Launch Layer was designed with the core principles that matter most to DeFi projects
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {premiumFeatures.map((feature, index) => (
                <Card key={index} className="h-full border border-launchlayer-surface-light bg-gradient-to-b from-launchlayer-surface to-launchlayer-surface/80 backdrop-blur-sm hover:border-launchlayer-violet/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_25px_-5px_rgba(167,139,250,0.1)]">
                  <CardContent className="p-6 h-full">
                    <div className="flex flex-col h-full">
                      <div className="mb-4 p-3 rounded-full bg-launchlayer-surface-light w-fit">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-launchlayer-text-primary">{feature.title}</h3>
                      <p className="text-launchlayer-text-secondary">{feature.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Launch Process Section */}
        <section className="py-16 bg-launchlayer-surface/50">
          <div className="container mx-auto px-8 max-w-[1280px]">
            <div className="text-center mb-12">
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-launchlayer-accent/10 text-launchlayer-accent mb-2 inline-block">Process</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-wider bg-gradient-to-r from-launchlayer-accent to-launchlayer-violet bg-clip-text text-transparent">
                Launch Your Token in 5 Easy Steps
              </h2>
              <p className="text-launchlayer-text-secondary max-w-2xl mx-auto">
                Launch Layer streamlines the entire token launch process
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between mb-5 bg-gradient-to-r from-launchlayer-surface to-launchlayer-surface p-5 rounded-xl border border-launchlayer-surface-light hover:border-launchlayer-violet/50 transition-all hover:translate-y-[-2px] hover:shadow-[0_8px_20px_rgba(50,119,245,0.12)] group"
                >
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-launchlayer-accent to-launchlayer-violet text-white font-bold mr-5 shadow-[0_2px_10px_rgba(112,99,248,0.25)] group-hover:shadow-[0_2px_15px_rgba(112,99,248,0.4)] transition-all duration-300">
                      {index + 1}
                    </div>
                    <span className="text-[1rem] font-medium">{step.text}</span>
                  </div>
                  {step.icon}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      
      {/* iOS safe area bottom padding */}
      {isIOS && <div className="h-8 md:hidden"></div>}
    </div>
  );
};

export default LandingPage;
