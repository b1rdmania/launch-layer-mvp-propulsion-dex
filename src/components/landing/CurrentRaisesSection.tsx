
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
    <section className="py-16 bg-launchlayer-surface">
      <div className="container mx-auto px-8 max-w-[1280px]">
        <h2 className="text-3xl font-bold mb-4">Current Raises on Launch Layer</h2>
        <p className="text-launchlayer-text-secondary mb-8">
          Discover active token launches happening right now on Sonic
        </p>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-launchlayer-accent"></div>
          </div>
        ) : raises.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {raises.map((raise) => (
              <RaiseCard key={raise.address} raise={raise} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-launchlayer-background rounded-lg mb-8">
            <p className="text-lg mb-4">No active raises at the moment</p>
            <p className="text-launchlayer-text-secondary">
              Check back soon for upcoming token sales
            </p>
          </div>
        )}

        <div className="text-center">
          <Link to="/app">
            <Button className="bg-launchlayer-accent hover:bg-launchlayer-accent/90 text-white px-6">
              View All Raises <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CurrentRaisesSection;
