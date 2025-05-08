
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RaiseData } from "@/types/contract-types";
import { getAllRaises, getRaiseDetails } from "@/contracts/contractService";
import RaiseCard from "@/components/raise/RaiseCard";
import { ArrowRight } from "lucide-react";

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
          <div className="text-center py-16 bg-launchlayer-surface rounded-xl border border-gray-700 shadow-md mb-10">
            <div className="max-w-md mx-auto">
              <p className="text-xl mb-4 font-medium">No active raises at the moment</p>
              <p className="text-launchlayer-text-secondary mb-6">
                Check back soon for upcoming token sales or create your own raise
              </p>
              <Link to="/app/create">
                <Button variant="violet">
                  Create a Raise
                </Button>
              </Link>
            </div>
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
