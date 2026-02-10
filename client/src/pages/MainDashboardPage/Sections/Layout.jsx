import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";

import { useSelector } from "react-redux";
import Loader from "../../../components/templates/Loader";

const Layout = () => {
  const { user, loading } = useSelector((state) => state.auth);

  // 1️⃣ Wait for auth check to finish
  if (loading) {
    return <Loader />;
  }

  // 2️⃣ If not logged in → redirect
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 3️⃣ Logged in → show dashboard layout
  return (
    <div className="min-h-screen bg-[#E8F1FF] px-6 sm:px-12 py-10">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
