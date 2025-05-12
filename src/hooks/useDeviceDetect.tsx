
import React from "react";

export function useDeviceDetect() {
  const [isMobile, setIsMobile] = React.useState(false);
  const [isIOS, setIsIOS] = React.useState(false);
  
  React.useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor;
    
    const checkMobile = () => {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    };
    
    const checkIOS = () => {
      return /iPhone|iPad|iPod/i.test(userAgent) || 
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    };
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768 || checkMobile());
      setIsIOS(checkIOS());
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  return { isMobile, isIOS };
}
