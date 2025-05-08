
import React from "react";

interface DetailCardProps {
  number: string;
  title: string;
  description: string;
}

const DetailCard: React.FC<DetailCardProps> = ({
  number,
  title,
  description,
}) => {
  return (
    <div className="p-6 bg-launchlayer-surface border border-launchlayer-surface-light rounded-lg shadow-sm">
      <div className="flex items-center mb-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-launchlayer-accent text-white font-bold mr-3">
          {number}
        </div>
        <h3 className="text-xl font-bold tracking-wider">{title}</h3>
      </div>
      <p className="text-launchlayer-text-secondary">{description}</p>
    </div>
  );
};

export default DetailCard;
