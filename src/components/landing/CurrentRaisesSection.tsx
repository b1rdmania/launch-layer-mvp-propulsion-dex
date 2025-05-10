
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Rocket, Clock, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const CurrentRaisesSection: React.FC = () => {
  // Sample raises to display when no real raises are available
  const sampleRaises = [
    {
      id: "sample1",
      name: "SonicSpeed",
      tokenSymbol: "SST",
      description: "High-performance DEX built for speed with minimal slippage",
      logoUrl: "/placeholder.svg",
      bannerUrl: "/placeholder.svg",
      websiteUrl: "https://example.com",
      longDescription: "SonicSpeed is a high-performance DEX optimized for the Sonic Network, providing lightning-fast trades with minimal slippage and low fees.",
      socialLinks: {
        twitter: "https://twitter.com/example",
        telegram: "https://t.me/example"
      },
      status: "presale",
      progress: 68,
      timeLeft: "2d 8h"
    },
    {
      id: "sample2",
      name: "EtherGlobe", 
      tokenSymbol: "EGT",
      description: "Cross-chain liquidity protocol connecting DeFi ecosystems",
      logoUrl: "/placeholder.svg",
      bannerUrl: "/placeholder.svg",
      websiteUrl: "https://example.com",
      longDescription: "EtherGlobe is a cross-chain liquidity protocol that connects DeFi ecosystems, enabling seamless asset transfers and swaps across multiple blockchains.",
      socialLinks: {
        discord: "https://discord.gg/example",
        medium: "https://medium.com/example"
      },
      status: "public",
      progress: 42,
      timeLeft: "5d 12h"
    }
  ];

  // Simulated active raises data for demo purpose
  const activeRaises = sampleRaises;

  // Function to get status badge color based on status
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'presale':
        return (
          <Badge className="absolute top-3 right-3 bg-launchlayer-accent/20 text-launchlayer-accent border-none">
            Presale
          </Badge>
        );
      case 'public':
        return (
          <Badge className="absolute top-3 right-3 bg-launchlayer-mint/20 text-launchlayer-mint border-none">
            Public Sale
          </Badge>
        );
      case 'upcoming':
        return (
          <Badge className="absolute top-3 right-3 bg-gray-700 text-gray-300 border-none">
            Upcoming
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-8 max-w-[1280px]">
        <h2 className="text-3xl font-bold mb-2 text-center tracking-wider">Current Raises</h2>
        <p className="text-launchlayer-text-secondary mb-4 text-center max-w-2xl mx-auto">
          Explore the latest token sales launching on Sonic Network
        </p>
        
        <div className="w-24 h-1 bg-launchlayer-violet mx-auto mb-10 rounded-full"></div>

        {activeRaises.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {activeRaises.map((raise, index) => (
              <Card 
                key={index} 
                className="relative bg-launchlayer-surface border-t-2 border-t-launchlayer-violet border-launchlayer-surface-light hover:border-launchlayer-accent/30 transition-all duration-200 hover:translate-y-[-4px] hover:shadow-[0_4px_20px_rgba(50,119,245,0.15)]"
              >
                {getStatusBadge(raise.status)}
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-launchlayer-surface-light flex items-center justify-center shadow-inner">
                      {index === 0 ? (
                        <Trophy className="text-launchlayer-accent" size={24} />
                      ) : (
                        <Rocket className="text-launchlayer-mint" size={24} />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-semibold">{raise.name}</h3>
                        <span className="text-xs text-launchlayer-text-secondary">{raise.tokenSymbol}</span>
                      </div>
                      <p className="text-launchlayer-text-secondary text-sm mb-4 line-clamp-2">{raise.description}</p>
                      
                      {/* Progress bar */}
                      <div className="mb-4">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-launchlayer-text-secondary">Progress</span>
                          <span className="text-launchlayer-text-secondary">{raise.progress}%</span>
                        </div>
                        <Progress 
                          value={raise.progress} 
                          className="h-1.5 bg-gray-700"
                          indicatorClassName="bg-gradient-to-r from-launchlayer-accent to-launchlayer-violet" 
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-xs text-launchlayer-text-secondary">
                          <Clock size={14} className="mr-1" />
                          {raise.timeLeft} left
                        </div>
                        <div className="flex gap-2">
                          <Link to={`/raise/${raise.id}`}>
                            <Button variant="outline" size="sm" className="border-launchlayer-surface-light hover:bg-launchlayer-surface-light transition-all duration-200">
                              View Details
                            </Button>
                          </Link>
                          <Link to={`/raise/${raise.id}`}>
                            <Button variant="accent" size="sm" className="group">
                              <span>Contribute</span>
                              <ArrowRight className="h-3.5 w-3.5 ml-1 group-hover:translate-x-0.5 transition-transform duration-200" />
                            </Button>
                          </Link>
                        </div>
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
