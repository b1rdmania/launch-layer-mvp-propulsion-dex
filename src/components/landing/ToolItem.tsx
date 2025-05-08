
import React from "react";
import { Check } from "lucide-react";

interface ToolItemProps {
  text: string;
}

const ToolItem: React.FC<ToolItemProps> = ({ text }) => {
  return (
    <li className="flex items-start">
      <Check size={20} className="text-launchlayer-accent mr-2 mt-1 flex-shrink-0" />
      <span>{text}</span>
    </li>
  );
};

export default ToolItem;
