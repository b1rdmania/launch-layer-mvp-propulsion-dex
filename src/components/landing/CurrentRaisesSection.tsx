
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { RaiseData, fetchAllRaises } from '@/services/api';
import RaiseCard from '@/components/raise/RaiseCard';
import { ArrowRight } from 'lucide-react';

const CurrentRaisesSection: React.FC = () => {
  const [raises, setRaises] = useState<RaiseData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadRaises = async () => {
      try {
        setIsLoading(true);
        const data = await fetchAllRaises();
        // Filter to show only active raises (presale or public)
        const activeRaises = data.filter(raise => 
          raise.status === 'presale' || raise.status === 'public'
        ).slice(0, 2); // Limit to exactly 2 raises
        
        // If there's only one raise, duplicate it to maintain symmetry
        if (activeRaises.length === 1) {
          setRaises([activeRaises[0], {...activeRaises[0], address: `${activeRaises[0].address}-copy`}]);
        } else if (activeRaises.length >= 2) {
          // If we have 2 or more raises, just take the first 2
          setRaises(activeRaises.slice(0, 2));
        } else {
          // No active raises
          setRaises([]);
        }
      } catch (error) {
        console.error('Failed to load raises:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadRaises();
  }, []);

  return (
    <section className="py-16 bg-cradle-surface">
      <div className="container mx-auto px-8 max-w-[1280px]">
        <h2 className="text-3xl font-bold mb-4">Current Raises on Cradle</h2>
        <p className="text-cradle-text-secondary mb-8">
          Discover active token launches happening right now on Sonic
        </p>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cradle-accent"></div>
          </div>
        ) : raises.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {raises.map((raise) => (
              <RaiseCard key={raise.address} raise={raise} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-cradle-background rounded-lg mb-8">
            <p className="text-lg mb-4">No active raises at the moment</p>
            <p className="text-cradle-text-secondary">Check back soon for upcoming token sales</p>
          </div>
        )}
        
        <div className="text-center">
          <Link to="/app">
            <Button className="bg-cradle-accent hover:bg-cradle-accent/90 text-white px-6">
              View All Raises <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CurrentRaisesSection;
