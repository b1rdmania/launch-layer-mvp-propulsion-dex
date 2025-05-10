
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Rocket, Clock, ArrowRight, Zap } from "lucide-react";
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
      timeLeft: "2d 8h",
      color: "blue"
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
      timeLeft: "5d 12h",
      color: "purple"
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
          <Badge className="absolute top-3 right-3 bg-gray-700/80 text-gray-300 border-none">
            Upcoming
          </Badge>
        );
      default:
        return null;
    }
  };

  const getIconBg = (color: string) => {
    if (color === "purple") return "from-launchlayer-violet to-purple-500/70";
    if (color === "green") return "from-launchlayer-mint to-green-500/70";
    return "from-launchlayer-accent to-blue-600/70";
  };

  return (
    <section className="py-24 relative z-10">
      <div className="absolute inset-0 bg-gradient-to-b from-launchlayer-background via-launchlayer-surface/30 to-launchlayer-background opacity-50"></div>
      <div className="container mx-auto px-8 max-w-[1280px] relative z-10">
        <div className="flex flex-col items-center mb-12">
          <span className="px-4 py-1.5 rounded-full bg-launchlayer-accent/10 text-launchlayer-accent text-sm font-medium mb-6">
            ACTIVE TOKEN SALES
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center tracking-tight">
            Current Raises
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-launchlayer-accent to-launchlayer-violet rounded-full mb-6"></div>
          <p className="text-xl text-launchlayer-text-secondary text-center max-w-xl">
            Explore the latest token sales launching on Sonic Network
          </p>
        </div>
        
        {activeRaises.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-8">
            {activeRaises.map((raise, index) => (
              <Card 
                key={index} 
                className="group relative bg-gradient-to-br from-launchlayer-surface to-launchlayer-surface/90 backdrop-blur-sm border-t-2 border-t-launchlayer-violet border-launchlayer-surface-light overflow-hidden hover:shadow-[0_8px_30px_rgba(50,119,245,0.15)] transition-all duration-300 hover:translate-y-[-8px]"
              >
                {/* Glowing accent in corner */}
                <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-[80px] opacity-20 bg-${raise.color === 'purple' ? 'launchlayer-violet' : 'launchlayer-accent'}`} />
                
                {getStatusBadge(raise.status)}
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${getIconBg(raise.color)} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                      {index === 0 ? (
                        <Zap className="text-white" size={30} />
                      ) : (
                        <Trophy className="text-white" size={30} />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-2xl font-bold tracking-tight">{raise.name}</h3>
                        <span className="text-sm py-0.5 px-2 bg-launchlayer-surface-light rounded-full text-launchlayer-text-secondary">{raise.tokenSymbol}</span>
                      </div>
                      <p className="text-launchlayer-text-secondary text-lg mb-6 line-clamp-2">{raise.description}</p>
                      
                      {/* Progress bar */}
                      <div className="mb-6">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="font-medium">Progress</span>
                          <span className="text-launchlayer-accent font-bold">{raise.progress}%</span>
                        </div>
                        <Progress 
                          value={raise.progress} 
                          className="h-2 bg-gray-700/50"
                          indicatorClassName={`bg-gradient-to-r from-launchlayer-accent to-${raise.color === 'purple' ? 'launchlayer-violet' : 'launchlayer-mint'}`}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm bg-launchlayer-surface-light px-3 py-1.5 rounded-full">
                          <Clock size={14} className="mr-1.5 text-launchlayer-accent" />
                          <span className="font-medium">{raise.timeLeft} left</span>
                        </div>
                        <div className="flex gap-3">
                          <Link to={`/raise/${raise.id}`}>
                            <Button variant="outline" size="sm" className="border-launchlayer-surface-light hover:bg-launchlayer-surface-light transition-all duration-200">
                              View Details
                            </Button>
                          </Link>
                          <Link to={`/raise/${raise.id}`}>
                            <Button 
                              variant={raise.color === 'purple' ? 'violet' : 'accent'} 
                              size="sm" 
                              className="group shadow-lg hover:shadow-xl"
                            >
                              <span>Contribute</span>
                              <ArrowRight className="h-3.5 w-3.5 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
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
        
        <div className="flex justify-center mt-12">
          <Link to="/app">
            <Button 
              variant="outline" 
              size="lg" 
              className="border-launchlayer-violet hover:bg-launchlayer-violet/10 text-launchlayer-violet group px-8"
            >
              View All Raises
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CurrentRaisesSection;
