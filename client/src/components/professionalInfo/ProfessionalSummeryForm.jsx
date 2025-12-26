import { Sparkle } from "lucide-react";
import React from "react";

const ProfessionalSummeryForm = ({ data, onChange, setresumeData }) => {
  // console.log(data);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-950">
            Professional Summery
          </h3>
          <p className="text-sm text-gray-600">
            Add Summery For Your Resume Page
          </p>
        </div>
        <button className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-200 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-55">
          <Sparkle size={4} />
          AI Enhance
        </button>
      </div>
      <div className="mt-7">
        <textarea
          value={data || ""}
          onChange={
            (e) => onChange(e.target.value)
          }
          rows={7}
          className="w-full p-3 px-4 mt-2 border text-sm border-gray-300 rounded-lg focus:ring focus:ring-blue-500 outline-none transition-colors resize-none"
          placeholder="Write a compelling professional summary..."
        />

        <p className="mt-2 text-xs text-gray-500 max-w-[80%] mx-auto text-center">
          Tip: Keep it concise (3–4 sentences) and focus on your most relevant
          achievements and skills.
        </p>
      </div>
    </div>
  );
};

export default ProfessionalSummeryForm;
