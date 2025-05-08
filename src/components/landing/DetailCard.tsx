
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
    <div className="p-6 bg-launchlayer-surface border border-launchlayer-surface-light rounded-xl shadow-card hover:translate-y-[-4px] hover:shadow-[0_4px_20px_rgba(112,99,248,0.2)] transition-all duration-300 group">
      <div className="flex items-center mb-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-launchlayer-accent to-launchlayer-violet text-white font-bold mr-3 shadow-[0_2px_10px_rgba(112,99,248,0.25)] group-hover:shadow-[0_2px_15px_rgba(112,99,248,0.4)] transition-all duration-300">
          {number}
        </div>
        <h3 className="text-xl font-bold tracking-wider">{title}</h3>
      </div>
      <p className="text-launchlayer-text-secondary text-[0.95rem] leading-[1.6]">{description}</p>
    </div>
  );
};

export default DetailCard;
