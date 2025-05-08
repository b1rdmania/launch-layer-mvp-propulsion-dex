import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RaiseData } from "@/types/contract-types";
import { getAllRaises, getRaiseDetails } from "@/contracts/contractService";
import RaiseCard from "@/components/raise/RaiseCard";
import { ArrowRight, Rocket, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

// Sample raise data to show when no actual raises are available
const sampleRaises: Partial<RaiseData>[] = [
  {
    address: "sample-1",
    tokenSymbol: "SST",
    status: "public",
    totalAcceptedTokenRaised: "750000",
    maxAcceptedTokenRaise: "1000000",
    acceptedTokenSymbol: "SONIC",
    presaleStart: Date.now() - 86400000, // 1 day ago
    publicSaleStart: Date.now() - 43200000, // 12 hours ago
    endTime: Date.now() + 172800000, // 2 days from now
    metadata: {
      name: "SonicSpeed",
      description: "High-speed cross-chain bridging and liquidity protocol",
      logoUrl: "/placeholder.svg",
      bannerUrl: "/placeholder.svg",
      websiteUrl: "https://example.com",
      longDescription: "",
      socialLinks: {
        twitter: "https://twitter.com",
        telegram: "https://telegram.org",
      },
    },
  },
  {
    address: "sample-2",
    tokenSymbol: "ETG",
    status: "upcoming",
    totalAcceptedTokenRaised: "0",
    maxAcceptedTokenRaise: "500000",
    acceptedTokenSymbol: "SONIC",
    presaleStart: Date.now() + 172800000, // 2 days in future
    publicSaleStart: Date.now() + 259200000, // 3 days in future
    endTime: Date.now() + 432000000, // 5 days in future
    metadata: {
      name: "EtherGlobe",
      description: "Global cross-chain payment infrastructure for seamless transactions",
      logoUrl: "/placeholder.svg", 
      bannerUrl: "/placeholder.svg",
      websiteUrl: "https://example.com",
      longDescription: "",
      socialLinks: {
        discord: "https://discord.com",
        medium: "https://medium.com",
      },
    },
  }
];

const CurrentRaisesSection: React.FC = () => {
  const [raises, setRaises] = useState<RaiseData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadRaises = async () => {
      try {
        setIsLoading(true);
        const addresses = await getAllRaises();
        console.log("getAllRaises", addresses);

        // Convert addresses to a regular array
        const addressesArray = Array.from(addresses);

        // Fetch details for each address
        const raisesData = await Promise.all(
          addressesArray.map(async (address) => {
            return await getRaiseDetails(address as string);
          }),
        );

        console.log("raisesData with metadata", raisesData);
        setRaises(raisesData);
      } catch (error) {
        console.error("Failed to load raises:", error);
        // If we can't load real raises or there are none, show the sample ones
        setRaises(sampleRaises as RaiseData[]);
      } finally {
        setIsLoading(false);
      }
    };

    loadRaises();
  }, []);

  return (
    <section className="py-16 bg-launchlayer-background border-t border-gray-800">
      <div className="container mx-auto px-8 max-w-[1280px]">
        <div className="mb-8">
          <h4 className="section-header-violet mb-2 text-sm uppercase tracking-wider">Explore Opportunities</h4>
          <h2 className="text-3xl font-bold mb-3">Current Raises on Launch Layer</h2>
          <p className="text-launchlayer-text-secondary max-w-2xl">
            Discover active token launches happening right now on Sonic
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-16 bg-launchlayer-surface rounded-xl border border-gray-700 shadow-md">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-launchlayer-accent"></div>
              <p className="text-launchlayer-text-secondary">Loading raises...</p>
            </div>
          </div>
        ) : raises.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {raises.map((raise) => (
              <RaiseCard key={raise.address} raise={raise} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {/* Sample Raise Cards when no real raises are available */}
            <Card className="border-t-2 border-t-launchlayer-violet shadow-md hover:shadow-[0_2px_10px_rgba(167,139,250,0.12)] transition-all duration-300 hover:translate-y-[-2px]">
              <CardHeader className="pb-2 relative">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-green-500/20 text-green-500 text-xs font-semibold px-2 py-1 rounded-full">
                    Active
                  </div>
                  <span className="text-xs bg-launchlayer-violet/10 text-launchlayer-violet px-2 py-0.5 rounded-full">
                    75% funded
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full ring-1 ring-gray-700 bg-gradient-to-br from-launchlayer-accent to-launchlayer-violet flex items-center justify-center">
                    <Rocket size={24} className="text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-lg">SonicSpeed</h3>
                    <p className="text-sm text-launchlayer-text-secondary">$SST</p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-2">
                <p className="text-sm text-launchlayer-text-secondary line-clamp-2 mb-4">
                  High-speed cross-chain bridging and liquidity protocol
                </p>
                
                <div className="mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-xs text-launchlayer-text-secondary">Raised</span>
                    <span className="text-xs text-launchlayer-text-secondary">
                      750K / 1M SONIC
                    </span>
                  </div>
                  <Progress 
                    value={75} 
                    className="h-1.5 bg-gray-700"
                    indicatorClassName="bg-gradient-to-r from-launchlayer-accent to-launchlayer-violet" 
                  />
                </div>
                
                <div className="flex justify-between items-center pt-2 border-t border-gray-700">
                  <span className="text-xs text-launchlayer-text-secondary">
                    Ends in 2d 0h
                  </span>
                  
                  <Link to="/app">
                    <Button
                      variant="violet"
                      size="sm"
                      className="group"
                    >
                      <span>View</span>
                      <ArrowRight className="h-3.5 w-3.5 ml-1 group-hover:translate-x-0.5 transition-transform duration-200" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-t-2 border-t-launchlayer-violet shadow-md hover:shadow-[0_2px_10px_rgba(167,139,250,0.12)] transition-all duration-300 hover:translate-y-[-2px]">
              <CardHeader className="pb-2 relative">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-amber-500/20 text-amber-500 text-xs font-semibold px-2 py-1 rounded-full">
                    Upcoming
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full ring-1 ring-gray-700 bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                    <Globe size={24} className="text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-lg">EtherGlobe</h3>
                    <p className="text-sm text-launchlayer-text-secondary">$ETG</p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-2">
                <p className="text-sm text-launchlayer-text-secondary line-clamp-2 mb-4">
                  Global cross-chain payment infrastructure for seamless transactions
                </p>
                
                <div className="mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-xs text-launchlayer-text-secondary">Target</span>
                    <span className="text-xs text-launchlayer-text-secondary">
                      500K SONIC
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-700 rounded"></div>
                </div>
                
                <div className="flex justify-between items-center pt-2 border-t border-gray-700">
                  <span className="text-xs text-launchlayer-text-secondary">
                    Starts in 2d 0h
                  </span>
                  
                  <Link to="/app">
                    <Button
                      variant="violet"
                      size="sm"
                      className="group"
                    >
                      <span>View</span>
                      <ArrowRight className="h-3.5 w-3.5 ml-1 group-hover:translate-x-0.5 transition-transform duration-200" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="text-center mt-8">
          <Link to="/app">
            <Button variant="accent" className="group">
              View All Raises 
              <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-200" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CurrentRaisesSection;
