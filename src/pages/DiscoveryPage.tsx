
import React, { useState, useEffect } from "react";
import { RaiseData, RaiseStatus } from "@/types/contract-types";
import RaiseCard from "@/components/raise/RaiseCard";
import { Button } from "@/components/ui/button";
import { DESIGN_SYSTEM } from "@/contracts/config";
import { getAllRaises, getRaiseDetails } from "@/contracts/contractService";
import { Search, Filter, ChevronDown } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

const DiscoveryPage: React.FC = () => {
  const [raises, setRaises] = useState<RaiseData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<RaiseStatus | "all">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFiltersOnMobile, setShowFiltersOnMobile] = useState(false);

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
          addressesArray.map((address) => getRaiseDetails(address as string)),
        );
        console.log("raisesData", raisesData);

        // Now you can safely filter and use the data
        setRaises(raisesData);
      } catch (error) {
        console.error("Failed to load raises:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRaises();
  }, []);

  const filteredRaises = raises
    .filter((raise) => filter === "all" || raise.status === filter)
    .filter((raise) => 
      searchTerm === "" || 
      raise.metadata.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      raise.tokenSymbol.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const statusFilters: Array<{ value: RaiseStatus | "all"; label: string }> = [
    { value: "all", label: "All" },
    { value: "upcoming", label: "Upcoming" },
    { value: "presale", label: "Presale" },
    { value: "public", label: "Public" },
    { value: "finalized", label: "Finalized" },
    { value: "cancelled", label: "Cancelled" },
  ];

  return (
    <div className="bg-launchlayer-background min-h-[calc(100vh-64px)]">
      <div
        className="container mx-auto px-8 py-8 max-w-[1280px] fade-in"
        style={{ fontFamily: DESIGN_SYSTEM.fonts.primary }}
      >
        <div className="mb-8">
          <h4 className="section-header-violet mb-2 text-sm uppercase tracking-wider">Explore Launch Layer</h4>
          <h1 className="text-3xl font-bold mb-3 text-launchlayer-text-primary">
            Discover Raises
          </h1>
          <p className="text-launchlayer-text-secondary max-w-2xl mb-8">
            Browse active and upcoming token sales on Sonic Network. Connect your
            wallet to participate in raises.
          </p>

          <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between mb-6">
            <div className="flex md:hidden items-center">
              <Button 
                variant="outline" 
                className="text-launchlayer-text-secondary bg-launchlayer-surface border-gray-700 w-full justify-between"
                onClick={() => setShowFiltersOnMobile(!showFiltersOnMobile)}
              >
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span>Filters: {filter !== "all" ? filter : "All"}</span>
                </div>
                <ChevronDown className={cn("h-4 w-4 transition-transform", showFiltersOnMobile && "transform rotate-180")} />
              </Button>
            </div>
            
            <div className={cn(
              "md:flex md:flex-wrap md:gap-2 transition-all duration-300", 
              showFiltersOnMobile ? "flex flex-wrap gap-2" : "hidden"
            )}>
              {statusFilters.map((statusFilter) => (
                <Button
                  key={statusFilter.value}
                  variant={filter === statusFilter.value ? "stepActive" : "stepInactive"}
                  onClick={() => setFilter(statusFilter.value)}
                  size="sm"
                  className="transition-all duration-200"
                >
                  {statusFilter.label}
                </Button>
              ))}
            </div>
            
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-launchlayer-text-secondary h-4 w-4" />
              <Input
                placeholder="Search by name or token"
                className="pl-10 bg-launchlayer-surface border-gray-700"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <Separator className="bg-gray-700 mb-8" />
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[300px] bg-launchlayer-surface rounded-xl border border-gray-700 shadow-md">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-launchlayer-accent"></div>
              <p className="text-launchlayer-text-secondary">Loading raises...</p>
            </div>
          </div>
        ) : filteredRaises.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRaises.map((raise) => (
              <RaiseCard key={raise.address} raise={raise} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 bg-launchlayer-surface rounded-xl border border-gray-700 shadow-md">
            <svg
              className="w-16 h-16 mb-4 text-launchlayer-violet opacity-50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <h3 className="text-xl font-medium mb-2 text-launchlayer-text-primary">No raises found</h3>
            <p className="text-launchlayer-text-secondary">
              There are no {filter !== "all" ? filter : ""} raises at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscoveryPage;
