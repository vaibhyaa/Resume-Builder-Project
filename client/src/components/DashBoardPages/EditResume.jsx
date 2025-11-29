import { XIcon } from "lucide-react";
import React from "react";

const EditResume = ({
  editResumeId,
  seteditResumeId,
  settitleName,
  titleName,
}) => {
  return (
    <div>
      {editResumeId && (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            // seteditResumeId(false);
            // navigate("/app/resume-builder/new");
            // navigate("/app/resume-builder/new/123");
            // Prevents page refresh
            // Closes popup
            // Navigates to resume builder page
          }}
          onClick={() => {
            seteditResumeId("");
          }}
          action=""
          className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50
            z-10 flex items-center justify-center"
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
          >
            <h2 className="text-xl font-bold mb-4">Edit Resume Iitle</h2>
            <input
              onChange={(e) => {
                const value = e.target.value;
                console.log(value);
                settitleName(value);
              }}
              value={titleName}
              type="text"
              placeholder="Enter Resume Title"
              className="w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600"
              required
            />
            <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-800 transition-colors">
              Update
            </button>
            <XIcon
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
              onClick={() => {
                seteditResumeId("");
                settitleName("");
                // Closes modal
                // Clears title
              }}
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default EditResume;
