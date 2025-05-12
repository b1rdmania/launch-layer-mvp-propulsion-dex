
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
      <div className="relative">
        {/* Premium header with gradient background */}
        <div className="absolute inset-0 w-full h-64 bg-gradient-to-b from-launchlayer-violet/30 to-transparent opacity-50 pointer-events-none" />
        
        {/* Premium animated floating shapes in background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-[10%] w-40 h-40 bg-launchlayer-accent/10 rounded-full filter blur-3xl animate-first"></div>
          <div className="absolute top-10 right-[15%] w-56 h-56 bg-launchlayer-violet/10 rounded-full filter blur-3xl animate-second"></div>
          <div className="absolute top-40 left-[30%] w-32 h-32 bg-launchlayer-mint/10 rounded-full filter blur-3xl animate-third"></div>
        </div>
        
        <div className="container mx-auto px-8 py-16 max-w-[1280px] fade-in relative z-10">
          <div className="mb-12">
            <div className="space-y-2 max-w-3xl">
              <h4 className="section-header-violet mb-2 text-sm uppercase tracking-wider font-medium">Explore Launch Layer</h4>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-violet tracking-tight leading-tight">
                Discover Raises
              </h1>
              <p className="text-launchlayer-text-secondary text-lg max-w-2xl mb-8 leading-relaxed">
                Browse active and upcoming token sales on Sonic Network. Connect your
                wallet to participate in raises and be part of the next generation of blockchain projects.
              </p>
            </div>

            {/* Premium styled filter and search section */}
            <div className="mt-12 bg-launchlayer-surface/80 backdrop-blur-sm border border-launchlayer-violet/20 rounded-xl p-6 shadow-lg">
              <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row md:items-center md:justify-between">
                <div className="flex md:hidden items-center">
                  <Button 
                    variant="outline" 
                    className="text-launchlayer-text-secondary bg-launchlayer-surface/80 backdrop-blur-sm border-gray-700 w-full justify-between"
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
                  "md:flex md:flex-wrap md:gap-3 transition-all duration-300", 
                  showFiltersOnMobile ? "flex flex-wrap gap-2" : "hidden"
                )}>
                  {statusFilters.map((statusFilter) => (
                    <Button
                      key={statusFilter.value}
                      variant={filter === statusFilter.value ? "stepActive" : "stepInactive"}
                      onClick={() => setFilter(statusFilter.value)}
                      size="sm"
                      className="transition-all duration-300 hover:scale-105"
                    >
                      {statusFilter.label}
                    </Button>
                  ))}
                </div>
                
                <div className="relative w-full md:w-72">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-launchlayer-violet h-4 w-4" />
                  <Input
                    placeholder="Search by name or token"
                    className="pl-10 bg-launchlayer-surface/80 backdrop-blur-sm border-gray-700 focus:border-launchlayer-violet focus:ring-1 focus:ring-launchlayer-violet transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            <Separator className="bg-gray-700/50 my-8" />
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center min-h-[300px] bg-launchlayer-surface/80 backdrop-blur-sm rounded-xl border border-gray-700/50 shadow-lg">
              <div className="flex flex-col items-center gap-6">
                <div className="relative w-16 h-16">
                  {/* Premium spinner with gradient */}
                  <div className="absolute inset-0 rounded-full border-4 border-t-launchlayer-violet border-r-launchlayer-accent border-b-launchlayer-mint border-l-transparent animate-spin"></div>
                </div>
                <p className="text-launchlayer-text-secondary text-lg font-medium">Loading raises...</p>
              </div>
            </div>
          ) : filteredRaises.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRaises.map((raise, index) => (
                <div 
                  key={raise.address} 
                  className="transform transition-all duration-500" 
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <RaiseCard raise={raise} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 bg-launchlayer-surface/80 backdrop-blur-sm rounded-xl border border-gray-700/50 shadow-lg">
              <div className="mb-6 relative">
                <div className="w-24 h-24 rounded-full bg-launchlayer-violet/10 flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-launchlayer-violet"
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
                </div>
                {/* Decorative gradient glow */}
                <div className="absolute inset-0 rounded-full bg-launchlayer-violet/30 blur-xl"></div>
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gradient-violet">No raises found</h3>
              <p className="text-launchlayer-text-secondary text-center max-w-md">
                There are currently no {filter !== "all" ? filter : ""} raises available. Check back soon or adjust your filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiscoveryPage;
