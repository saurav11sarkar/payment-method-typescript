import Navbar from "@/components/shared/Navbar";
import React from "react";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <main className="min-h-screen container mx-auto mt-20">{children}</main>
    </div>
  );
};

export default CommonLayout;
