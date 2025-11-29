import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <div>
      {/* this is layout page */}
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
