import React from "react";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ResourceCardProps {
  title: string;
  description: string;
  linkText: string;
  linkUrl: string;
}

const ResourceCard: React.FC<ResourceCardProps> = ({
  title,
  description,
  linkText,
  linkUrl,
}) => {
  return (
    <Card className="bg-cradle-surface border-cradle-surface-light">
      <CardContent className="p-6">
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-cradle-text-secondary mb-4">{description}</p>
        <a
          href={linkUrl}
          className="text-cradle-accent hover:text-cradle-accent/80 font-medium flex items-center gap-1"
        >
          {linkText} <ArrowRight size={16} />
        </a>
      </CardContent>
    </Card>
  );
};

export default ResourceCard;
