
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

