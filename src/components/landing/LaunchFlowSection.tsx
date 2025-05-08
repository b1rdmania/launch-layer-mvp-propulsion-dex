
import React from "react";
import { Check } from "lucide-react";

const LaunchFlowSection: React.FC = () => {
  const steps = [
    "Configure your token sale parameters",
    "Deploy your contract on Sonic",
    "Community contributes during sale phases",
    "Finalize and collect your funds",
    "Export data for vesting setup",
  ];

  return (
    <section className="py-16 bg-launchlayer-background">
      <div className="container mx-auto px-8 max-w-[1280px]">
        <h2 className="text-3xl font-bold text-center mb-4 tracking-wider">
          Launch Your Token in 5 Easy Steps
        </h2>
        <p className="text-launchlayer-text-secondary text-center mb-12 max-w-2xl mx-auto">
          Launch Layer streamlines the entire token launch process
        </p>

        <div className="max-w-3xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex items-center mb-4 bg-launchlayer-surface p-4 rounded-md border border-launchlayer-surface-light"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-launchlayer-accent text-white font-bold mr-4">
                {index + 1}
              </div>
              <span>{step}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LaunchFlowSection;
