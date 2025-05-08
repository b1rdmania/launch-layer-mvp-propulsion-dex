
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Rocket } from "lucide-react";
import { RaiseMetadata } from "@/types/contract-types";

const CurrentRaisesSection: React.FC = () => {
  // Sample raises to display when no real raises are available
  const sampleRaises = [
    {
      id: "sample1",
      name: "SonicSpeed",
      tokenSymbol: "SST", // Added missing tokenSymbol
      description: "High-performance DEX built for speed with minimal slippage",
      logoUrl: "/placeholder.svg",
      bannerUrl: "/placeholder.svg",
      websiteUrl: "https://example.com",
      longDescription: "SonicSpeed is a high-performance DEX optimized for the Sonic Network, providing lightning-fast trades with minimal slippage and low fees.",
      socialLinks: {
        twitter: "https://twitter.com/example",
        telegram: "https://t.me/example"
      }
    },
    {
      id: "sample2",
      name: "EtherGlobe", 
      tokenSymbol: "EGT", // Added missing tokenSymbol
      description: "Cross-chain liquidity protocol connecting DeFi ecosystems",
      logoUrl: "/placeholder.svg",
      bannerUrl: "/placeholder.svg",
      websiteUrl: "https://example.com",
      longDescription: "EtherGlobe is a cross-chain liquidity protocol that connects DeFi ecosystems, enabling seamless asset transfers and swaps across multiple blockchains.",
      socialLinks: {
        discord: "https://discord.gg/example",
        medium: "https://medium.com/example"
      }
    }
  ];

  // Simulated active raises data for demo purpose
  const activeRaises = sampleRaises;

  return (
    <section className="py-16 bg-launchlayer-surface">
      <div className="container mx-auto px-8 max-w-[1280px]">
        <h2 className="text-3xl font-bold mb-4 text-center tracking-wider">Current Raises</h2>
        <p className="text-launchlayer-text-secondary mb-10 text-center max-w-2xl mx-auto">
          Explore the latest token sales launching on Sonic Network through Launch Layer
        </p>

        {activeRaises.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
            {activeRaises.map((raise, index) => (
              <Card 
                key={index} 
                className="bg-launchlayer-surface border border-launchlayer-surface-light hover:border-launchlayer-accent/50 transition-all hover:translate-y-[-4px] hover:shadow-[0_4px_20px_rgba(50,119,245,0.15)]"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-launchlayer-surface-light rounded-md flex items-center justify-center">
                      {index === 0 ? (
                        <Trophy className="text-launchlayer-accent" size={24} />
                      ) : (
                        <Rocket className="text-launchlayer-mint" size={24} />
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">{raise.name}</h3>
                      <p className="text-launchlayer-text-secondary text-sm mb-4">{raise.description}</p>
                      <div className="flex gap-2">
                        <Button variant="default" size="sm" asChild>
                          <Link to={`/raise/${raise.id}`}>View Details</Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/raise/${raise.id}`}>Contribute</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-launchlayer-text-secondary mb-4">No active raises at the moment.</p>
            <Button variant="accent" asChild>
              <Link to="/admin">Create Your Own</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CurrentRaisesSection;
