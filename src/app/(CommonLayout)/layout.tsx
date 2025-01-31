import NavBar from "@/srcshared/NavBar/NavBar";
import ProfileSidebar from "@/srcshared/SideBar/ProfileSideBar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
};

export default layout;
