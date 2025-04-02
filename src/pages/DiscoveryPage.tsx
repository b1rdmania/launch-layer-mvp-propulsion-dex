
import React, { useState, useEffect } from 'react';
import { RaiseData, fetchAllRaises, RaiseStatus } from '@/services/api';
import RaiseCard from '@/components/raise/RaiseCard';
import { Button } from '@/components/ui/button';

const DiscoveryPage: React.FC = () => {
  const [raises, setRaises] = useState<RaiseData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<RaiseStatus | 'all'>('all');

  useEffect(() => {
    const loadRaises = async () => {
      try {
        setIsLoading(true);
        const data = await fetchAllRaises();
        setRaises(data);
      } catch (error) {
        console.error('Failed to load raises:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadRaises();
  }, []);

  const filteredRaises = filter === 'all' 
    ? raises 
    : raises.filter(raise => raise.status === filter);

  const statusFilters: Array<{ value: RaiseStatus | 'all'; label: string }> = [
    { value: 'all', label: 'All' },
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'presale', label: 'Presale' },
    { value: 'public', label: 'Public' },
    { value: 'finalized', label: 'Finalized' },
    { value: 'cancelled', label: 'Cancelled' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Discover Raises</h1>
        <p className="text-cradle-text-secondary max-w-2xl mb-6">
          Browse active and upcoming token sales on Sonic Network. Connect your wallet to participate in raises.
        </p>
        
        <div className="flex flex-wrap gap-2">
          {statusFilters.map((statusFilter) => (
            <Button
              key={statusFilter.value}
              variant={filter === statusFilter.value ? "default" : "outline"}
              onClick={() => setFilter(statusFilter.value)}
              className={filter === statusFilter.value 
                ? "bg-cradle-accent hover:bg-cradle-accent/90" 
                : "bg-transparent border-cradle-surface-light"
              }
              size="sm"
            >
              {statusFilter.label}
            </Button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cradle-accent"></div>
        </div>
      ) : filteredRaises.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRaises.map((raise) => (
            <RaiseCard key={raise.address} raise={raise} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-cradle-text-secondary">
          <svg className="w-16 h-16 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <p className="text-xl">No raises found</p>
          <p className="mt-2">There are no {filter !== 'all' ? filter : ''} raises at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default DiscoveryPage;
