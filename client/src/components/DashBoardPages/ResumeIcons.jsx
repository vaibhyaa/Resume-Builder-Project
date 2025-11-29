import { PlusIcon, UploadCloudIcon } from "lucide-react";
import React from "react";

const ResumeIcons = ({ setshowcreateResume, setshowUploadResume }) => {
  return (
    <div className="flex gap-4">
      <button
        onClick={() => {
          setshowcreateResume(true);
        }}
        // value={createResume}
        // onClick={() => {}}
        // className="p-2 flex items-center justify-center hover:bg-gray-200 rounded-full cursor-pointer"
        className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
      >
        <PlusIcon className="size-11 transition-all duration-300 p-3 bg-linear-to-br from-indigo-400 text-white rounded-full" />
        <p className="text-sm group-hover:text-red-400 transition-all duration-300">
          Create Resume
        </p>
        {/* when click on this button only Shows popup form */}
      </button>

      <button
        onClick={() => {
          setshowUploadResume(true);
        }}
        // className="p-2 flex items-center justify-center hover:bg-gray-200 rounded-full cursor-pointer"
        className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
      >
        <UploadCloudIcon className="size-11 transition-all duration-300 p-3 bg-linear-to-br from-indigo-300 to-indigo-500 text-white rounded-full" />
        <p className="text-sm group-hover:text-red-400 transition-all duration-300">
          Upload Existing
        </p>
      </button>
    </div>
  );
};

export default ResumeIcons;
