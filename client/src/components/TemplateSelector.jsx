import { Check, Layout } from "lucide-react";
import React from "react";
import { useState } from "react";

const TemplateSelector = ({ selectedTemplate, onChange }) => {
  const [isOpen, setisOpen] = useState(false);
  const templates = [
    {
      id: "classic",
      name: "classic",
      preview:
        "Ac clean, traditional resume format with clear sections and professional typography",
    },
    {
      id: "modern",
      name: "Modern",
      preview:
        "Sleek design with strategic use of color and modern fonr choices",
    },
    {
      id: "minimalImage",
      name: "Minimal Image",
      preview: "Minimal design with a single image and clean typography",
    },
    {
      id: "minimal",
      name: "Minimal",
      preview: "Ultra-clean design that puts your content front and center ",
    },
        {
      id: "themed modern ",
      name: "Themed Modern Template",
      preview: "Ultra-Modern design that creted your dream resume",
    },
  ];
  return (
    <div className="relative">
      <button
        onClick={() => setisOpen(!isOpen)}
        className="flex items-center gap-1 text-sm text-blue-600 bg-linear-to-br from-blue-100 ring-blue-300 hover:ring transition-all px-3 py-2 rounded-lg"
      >
        <Layout size={14} /> <span className="max-sm:hidden">Template</span>
      </button>
      {isOpen && (
        <div className="absolute top-full w-xs p-3 mt-2 space-y-3 z-10 bg-white rounded-md border border-gray-200 shadow-sm">
          {/* {templates.map((eachTemplate) => {
            <div
              key={eachTemplate.id}
              onClick={() => {
                onchange(eachTemplate.id);
                setisOpen(false);
              }}
              className={`relative p-3 border rounded-md cursor-pointer transition-all ${
                selectedTemplate == eachTemplate.id
                  ? "border-blue-300 bg-blue-100"
                  : "border-gray-400 hover:bg-gray-200"
              }`}
            >
              {selectedTemplate === eachTemplate.id && (
                <div className="absolute top-2 right-2">
                  <div className="size-5 bg-blue-400 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                </div>
              )}
              <div className="space-y-1">
                <h4 className="font-medium text-gray-800">
                  {eachTemplate.name}
                </h4>
                <div className="mt-2 p-2 bg-blue-50 rounded text-xs text-gray-500 italic">
                  {eachTemplate.preview}
                </div>
              </div>
            </div>;
          })} */}
          {templates.map((eachTemplate) => (
            <div
              key={eachTemplate.id}
              onClick={() => {
                onChange(eachTemplate.id);
                setisOpen(false);
              }}
              className={`relative p-3 border rounded-md cursor-pointer transition-all ${
                selectedTemplate === eachTemplate.id
                  ? "border-blue-300 bg-blue-100"
                  : "border-gray-400 hover:bg-gray-200"
              }`}
            >
              {selectedTemplate === eachTemplate.id && (
                <div className="absolute top-2 right-2">
                  <div className="size-5 bg-blue-400 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <h4 className="font-medium text-gray-800">
                  {eachTemplate.name}
                </h4>
                <div className="mt-2 p-2 bg-blue-50 rounded text-xs text-gray-500 italic">
                  {eachTemplate.preview}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;



