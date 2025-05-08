
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
    <div className="p-6 bg-launchlayer-surface border border-launchlayer-surface-light rounded-lg shadow-card hover:translate-y-[-2px] hover:shadow-[0_2px_10px_rgba(50,119,245,0.12)] transition-all duration-300">
      <div className="flex items-center mb-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-launchlayer-accent text-white font-bold mr-3">
          {number}
        </div>
        <h3 className="text-xl font-bold tracking-wider">{title}</h3>
      </div>
      <p className="text-launchlayer-text-secondary text-[0.95rem] leading-[1.6]">{description}</p>
    </div>
  );
};

export default DetailCard;
