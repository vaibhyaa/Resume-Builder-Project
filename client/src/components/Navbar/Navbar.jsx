import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/features/authSlice.js";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <div className="shadow bg-[#9ebaf8]">
      <nav className="w-full flex items-center justify-between max-w-7xl mx-auto px-4 py-3 text-white">
        <Link to={"/"}>
          <img
            src="/logo.svg"
            alt="logo"
            className="h-11 w-auto brightness-200"
          />
        </Link>

        <div className="flex items-center gap-6 text-sm font-medium">
          <p className="max-sm:hidden opacity-90">Hi, {user?.name}</p>

          <button
            onClick={async () => {
              await dispatch(logout());
              navigate("/");
            }}
            className="bg-white text-[#3b5998] px-6 py-1.5 rounded-full 
                   hover:bg-slate-100 active:scale-95 transition-all shadow-sm"
          >
            Log Out
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
