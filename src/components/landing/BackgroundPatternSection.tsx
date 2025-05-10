
import React from "react";

const BackgroundPatternSection: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Top-right gradient blob */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-launchlayer-accent/5 blur-[100px] rounded-full -translate-y-1/4 translate-x-1/4" />
      
      {/* Mid-left gradient blob */}
      <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-launchlayer-violet/5 blur-[120px] rounded-full -translate-x-1/2" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(50,119,245,0.03)_1px,transparent_1px),linear-gradient(to_right,rgba(50,119,245,0.03)_1px,transparent_1px)] bg-[length:50px_50px]" />
    </div>
  );
};

export default BackgroundPatternSection;
