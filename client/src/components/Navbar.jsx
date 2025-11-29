import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = {
    name: "John Doe",
  };
  return (
    // <div className="shadow bg-white">
    //   <nav className="w-full flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5 text-slate-800">
    //     <Link to={"/"}>
    //       <img src="/logo.svg" alt="logo" className="h-11 w-auto" />
    //     </Link>
    //     <div className="flex items-center gap-4 text-sm">
    //       <p className="max-sm:hidden">Hi, {user?.name}</p>
    //       <button
    //         onClick={() => {
    //           navigate("/");
    //         }}
    //         className="bg-white hover:bg-slate-50 border-gray-300 px-7 py-2 rounded-full active:scale-95 transition-all"
    //       >
    //         Log Out
    //       </button>
    //     </div>
    //   </nav>
    // </div>
    // <div className="bg-white/70 backdrop-blur-lg border-b border-white/40 shadow-sm">
    //   <nav className="w-full flex items-center justify-between max-w-7xl mx-auto px-6 py-4 text-slate-800">
    //     <Link to={"/"}>
    //       <img
    //         src="/logo.svg"
    //         alt="logo"
    //         className="h-10 w-auto hover:opacity-80 transition"
    //       />
    //     </Link>

    //     <div className="flex items-center gap-6 text-sm font-medium">
    //       <p className="max-sm:hidden text-slate-700 tracking-wide">
    //         Hi, {user?.name}
    //       </p>

    //       <button
    //         onClick={() => navigate("/")}
    //         className="px-6 py-2.5 rounded-full border border-slate-300 bg-white/80
    //                hover:bg-slate-100 hover:border-slate-400 active:scale-95
    //                transition-all shadow-sm"
    //       >
    //         Log Out
    //       </button>
    //     </div>
    //   </nav>
    // </div>

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
            onClick={() => navigate("/")}
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
