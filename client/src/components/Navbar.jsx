import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = {
    name: "John Doe",
  };
  return (
    <div className="shadow bg-white">
      <nav className="w-full flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5 text-slate-800">
        <Link to={"/"}>
          <img src="/logo.svg" alt="logo" className="h-11 w-auto" />
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <p className="max-sm:hidden">Hi, {user?.name}</p>
          <button
            onClick={() => {
              navigate("/");
            }}
            className="bg-white hover:bg-slate-50 border-gray-300 px-7 py-2 rounded-full active:scale-95 transition-all"
          >
            Log Out
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
