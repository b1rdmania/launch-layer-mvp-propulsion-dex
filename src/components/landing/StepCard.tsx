
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface StepCardProps {
  number: string;
  title: string;
  description: string;
}

const StepCard: React.FC<StepCardProps> = ({ number, title, description }) => {
  return (
    <Card className="bg-cradle-surface border-cradle-surface-light hover:border-cradle-accent/50 transition-colors">
      <CardContent className="p-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-cradle-accent text-white font-bold mb-4">
          {number}
        </div>
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-cradle-text-secondary text-sm">{description}</p>
      </CardContent>
    </Card>
  );
};

export default StepCard;
