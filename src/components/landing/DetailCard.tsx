
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
    <div className="p-6 bg-launchlayer-surface-light rounded-xl">
      <div className="flex items-center mb-3">
        <span className="text-launchlayer-accent font-mono font-bold mr-2">
          {number}
        </span>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <p className="text-launchlayer-text-secondary">{description}</p>
    </div>
  );
};

export default DetailCard;
