
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ExternalLink, FileCode, Rocket, Terminal } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import ProcessSection from "@/components/landing/ProcessSection";
import DeveloperSection from "@/components/landing/DeveloperSection";

const AboutPage: React.FC = () => {
  return (
    <div className="bg-launchlayer-background">
      {/* Hero Section */}
      <section className="py-16 bg-launchlayer-surface">
        <div className="container mx-auto px-8 max-w-[1280px]">
          <h1 className="text-4xl font-bold mb-6 tracking-wider text-center">About Launch Layer</h1>
          <p className="text-launchlayer-text-secondary text-center mb-8 max-w-2xl mx-auto">
            The premier permissionless, tokenless launchpad for serious DeFi builders on Sonic Network.
          </p>
          <Separator className="max-w-[200px] mx-auto bg-launchlayer-violet opacity-40" />
        </div>
      </section>

      {/* Process Section */}
      <ProcessSection />
      
      {/* Separator */}
      <div className="container mx-auto px-8 max-w-[1280px]">
        <Separator className="my-2 bg-launchlayer-surface-light opacity-40" />
      </div>

      {/* Developer Section */}
      <DeveloperSection />

      {/* CTA Section */}
      <section className="py-16 bg-launchlayer-background">
        <div className="container mx-auto px-8 max-w-[1280px] text-center">
          <h2 className="text-3xl font-bold mb-4 tracking-wider text-gradient-violet">Launch Your Way on Sonic</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-[0.95rem] leading-relaxed">
            UI-driven deployment via the Factory ensures consistency. Direct smart
            contract interaction offers flexibility. Built natively for Sonic.
          </p>
          <div className="flex justify-center">
            <Link to="/admin">
              <Button
                variant="accent"
                size="lg"
                className="px-8 py-3 rounded-md text-lg flex items-center gap-2 bg-gradient-to-r from-launchlayer-accent to-launchlayer-violet hover:shadow-[0_0_15px_rgba(112,99,248,0.5)] hover:scale-105 transition-all duration-300"
              >
                <Rocket size={20} />
                Start Your Raise
              </Button>
            </Link>
          </div>
          <div className="mt-6 text-xs text-launchlayer-text-secondary">
            Built for Builders: Powered by Sonic
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
