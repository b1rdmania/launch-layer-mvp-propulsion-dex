
import React from "react";
import LandingLayout from "./LandingLayout";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LandingLayout>
      {children}
    </LandingLayout>
  );
};

export default Layout;
