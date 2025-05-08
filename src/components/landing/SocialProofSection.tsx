
import React from "react";
import { Star } from "lucide-react";

const SocialProofSection: React.FC = () => {
  return (
    <section className="py-8 bg-cradle-background border-y border-cradle-surface-light">
      <div className="container mx-auto px-8 max-w-[1280px]">
        <div className="flex flex-col items-center">
          <div className="flex items-center space-x-1 mb-4">
            <Star className="text-yellow-500 fill-yellow-500" size={16} />
            <Star className="text-yellow-500 fill-yellow-500" size={16} />
            <Star className="text-yellow-500 fill-yellow-500" size={16} />
            <Star className="text-yellow-500 fill-yellow-500" size={16} />
            <Star className="text-yellow-500 fill-yellow-500" size={16} />
          </div>
          <p className="text-lg md:text-xl font-medium text-center text-cradle-text-primary mb-6">
            Trusted by builders across the Sonic ecosystem
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            <div className="flex flex-col items-center">
              <div className="bg-cradle-surface-light h-12 w-12 rounded-full flex items-center justify-center mb-2">
                <span className="font-bold text-cradle-accent">SF</span>
              </div>
              <p className="text-xs text-cradle-text-secondary">Sonic Foundation</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-cradle-surface-light h-12 w-12 rounded-full flex items-center justify-center mb-2">
                <span className="font-bold text-cradle-accent">FJ</span>
              </div>
              <p className="text-xs text-cradle-text-secondary">Fjord Finance</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-cradle-surface-light h-12 w-12 rounded-full flex items-center justify-center mb-2">
                <span className="font-bold text-cradle-accent">DH</span>
              </div>
              <p className="text-xs text-cradle-text-secondary">DoraHacks</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-cradle-surface-light h-12 w-12 rounded-full flex items-center justify-center mb-2">
                <span className="font-bold text-cradle-accent">LP</span>
              </div>
              <p className="text-xs text-cradle-text-secondary">LiquidPool</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-cradle-surface-light h-12 w-12 rounded-full flex items-center justify-center mb-2">
                <span className="font-bold text-cradle-accent">SL</span>
              </div>
              <p className="text-xs text-cradle-text-secondary">SonicLabs</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
