// import { Check, Palette } from "lucide-react";
// import React, { useState } from "react";

// const ColorPicker = ({ selectedColor, onChange }) => {
//   const colors = [
//     { name: "Blue", value: "#3B82F6" }, // blue-500
//     { name: "Indigo", value: "#6366F1" }, // indigo-500
//     { name: "Purple", value: "#8B5CF6" }, // purple-500
//     { name: "Green", value: "#22C55E" }, // green-500
//     { name: "Red", value: "#EF4444" }, // red-500
//     { name: "Orange", value: "#F97316" }, // orange-500
//     { name: "Teal", value: "#14B8A6" }, // teal-500
//     { name: "Pink", value: "#EC4899" }, // pink-500
//     { name: "Gray", value: "#6B7280" }, // gray-500
//     { name: "Black", value: "#111827" }, // gray-900 (better than pure black)
//   ];

//   const [isOPen, setisOpen] = useState(false);

//   return (
//     // <div className="relative">
//     //   <button
//     //     onClick={() => setisOpen((preV) => !preV)}
//     //     className="flex items-center gap-1 text-sm text-purple-600 bg-gradient-to-br from-purple-50 to-purple-100 ring-purple-300 hover:ring transition-all px-3 rounded-lg"
//     //   >
//     //     <Palette size={16} /> <span className="max-sm:hidden">Accent</span>
//     //   </button>
//     //   {isOPen && (
//     //     <div className="grid grid-cols-4 w-60 gap-2 absolute top-full left-0 ring-0 p-3 mt-2 z-10 bg-white rounded-md border border-gray-200 shadow-sm">
//     //       {colors.map((eachColor) => (
//     //         <div
//     //           key={eachColor.value}
//     //           onClick={() => onChange(eachColor.value)}
//     //           className="relative cursor-pointer group flex flex-col"
//     //         >
//     //           <div
//     //             className={`w-12 h-12 rounded-full border-2 border-transparent group-hover:border-black/25 transition-colors`}
//     //             style={{ backgroundColor: eachColor.value }}
//     //           >
//     //             {selectedColor === eachColor.value && (
//     //               <div className="absolute top-0 left-0 right-0 bottom-4 flex flex-items justify-center">
//     //                 <Check className="size-5 text-white" />
//     //               </div>
//     //             )}
//     //             <p className="text-xs text-center mt-1 text-gray-600">
//     //               {eachColor.name}
//     //             </p>
//     //           </div>
//     //         </div>
//     //       ))}
//     //     </div>
//     //   )}
//     // </div>

//     <div className="relative">
//       <button
//         onClick={() => setisOpen((preV) => !preV)}
//         className="flex items-center gap-2 text-sm font-medium
//                text-purple-700
//                bg-gradient-to-br from-purple-50 to-purple-100
//                hover:from-purple-100 hover:to-purple-200
//                ring-1 ring-purple-200 hover:ring-purple-300
//                transition-all duration-200
//                px-3 py-2 rounded-lg shadow-sm"
//       >
//         <Palette size={16} />
//         <span className="max-sm:hidden">Accent</span>
//       </button>

//       {isOPen && (
//         <div
//           className="absolute top-full left-0 mt-2 z-10
//                     grid grid-cols-4 gap-3 w-64
//                     bg-white rounded-xl
//                     border border-gray-200
//                     shadow-lg p-4"
//         >
//           {colors.map((eachColor) => (
//             <div
//               key={eachColor.value}
//               onClick={() => {
//                 onChange(eachColor.value);
//                 setisOpen(false);
//               }}
//               className="relative cursor-pointer group flex flex-col items-center"
//             >
//               <div
//                 onClick={() => setisOpen((preV) => !preV)}
//                 className={`w-11 h-11 rounded-full
//                         border-2
//                         transition-all duration-200
//                         ${
//                           selectedColor === eachColor.value
//                             ? "border-gray-900 scale-105"
//                             : "border-transparent group-hover:border-gray-400"
//                         }`}
//                 style={{ backgroundColor: eachColor.value }}
//               >
//                 {selectedColor === eachColor.value && (
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <Check className="size-5 text-white drop-shadow" />
//                   </div>
//                 )}
//               </div>

//               <p className="mt-1 text-[11px] text-gray-600 group-hover:text-gray-800 transition-colors">
//                 {eachColor.name}
//               </p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ColorPicker;



import { Check, Palette } from "lucide-react";
import React, { useState } from "react";

const ColorPicker = ({ selectedColor, onChange }) => {
  const colors = [
    { name: "Blue", value: "#3B82F6" },
    { name: "Indigo", value: "#6366F1" },
    { name: "Purple", value: "#8B5CF6" },
    { name: "Green", value: "#22C55E" },
    { name: "Red", value: "#EF4444" },
    { name: "Orange", value: "#F97316" },
    { name: "Teal", value: "#14B8A6" },
    { name: "Pink", value: "#EC4899" },
    { name: "Gray", value: "#6B7280" },
    { name: "Black", value: "#111827" },
  ];

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 text-sm font-medium
                   text-purple-700
                   bg-gradient-to-br from-purple-50 to-purple-100
                   hover:from-purple-100 hover:to-purple-200
                   ring-1 ring-purple-200 hover:ring-purple-300
                   transition-all duration-200
                   px-3 py-2 rounded-lg shadow-sm"
      >
        <Palette size={16} />
        <span className="max-sm:hidden">Accent</span>

        {/* Selected color indicator */}
        <span
          className="w-4 h-4 rounded-full border border-gray-300"
          style={{ backgroundColor: selectedColor }}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="absolute top-full left-0 mt-2 z-10
                     grid grid-cols-4 gap-3 w-64
                     bg-white rounded-xl
                     border border-gray-200
                     shadow-lg p-4"
        >
          {colors.map((eachColor) => (
            <button
              key={eachColor.value}
              onClick={() => {
                onChange(eachColor.value);
                setIsOpen(false);
              }}
              className="relative flex flex-col items-center gap-1
                         focus:outline-none group"
            >
              <div
                className={`w-11 h-11 rounded-full border-2
                            transition-all duration-200
                            ${
                              selectedColor === eachColor.value
                                ? "border-gray-900 scale-105"
                                : "border-transparent group-hover:border-gray-400"
                            }`}
                style={{ backgroundColor: eachColor.value }}
              >
                {selectedColor === eachColor.value && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Check className="size-5 text-white drop-shadow" />
                  </div>
                )}
              </div>

              <span className="text-[11px] text-gray-600 group-hover:text-gray-800">
                {eachColor.name}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorPicker;

