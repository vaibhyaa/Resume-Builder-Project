import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";

const Layout = () => {
  return (
    <div>
      {/* this is layout page */}
      <div className="min-h-screen bg-[#E8F1FF] px-6 sm:px-12 py-10">
        <Navbar />
        <Outlet />
        {/* {/* When user visits /app (without anything after it),→ show Dashboard */}{" "}
      </div>
    </div>
  );
};

export default Layout;
