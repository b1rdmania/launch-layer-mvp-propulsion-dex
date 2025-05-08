
import React from "react";
import { Clipboard, Timer, CheckCircle, FileText, Settings } from "lucide-react";

const LaunchFlowSection: React.FC = () => {
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
      text: "Export data for vesting setup", 
      icon: <FileText size={18} className="text-launchlayer-mint" /> 
    },
  ];

  return (
    <section className="py-16 bg-launchlayer-background">
      <div className="container mx-auto px-8 max-w-[1280px]">
        <h2 className="text-3xl font-bold text-center mb-4 tracking-wider">
          Launch Your Token in 5 Easy Steps
        </h2>
        <p className="text-launchlayer-text-secondary text-center mb-12 max-w-2xl mx-auto text-[0.95rem] leading-relaxed">
          Launch Layer streamlines the entire token launch process
        </p>

        <div className="max-w-3xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex items-center mb-4 bg-launchlayer-surface p-4 rounded-md border border-launchlayer-surface-light hover:border-launchlayer-accent/50 transition-all hover:translate-y-[-2px] hover:shadow-[0_2px_10px_rgba(50,119,245,0.12)]"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-launchlayer-accent text-white font-bold mr-4">
                {index + 1}
              </div>
              <div className="flex items-center gap-2">
                {step.icon}
                <span className="text-[0.95rem]">{step.text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LaunchFlowSection;
