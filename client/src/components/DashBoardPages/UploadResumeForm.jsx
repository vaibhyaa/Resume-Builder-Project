import { LoaderCircleIcon, UploadCloudIcon, XIcon } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import api from "../../configs/api.js";
import { useSelector } from "react-redux";
import pdfToText from "react-pdftotext";

const UploadResumeForm = ({
  titleName,
  resume,
  showUploadResume,
  setshowUploadResume,
  settitleName,
  setresume,
}) => {
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);

  return (
    <>
      {showUploadResume && (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (!resume) {
              toast.error("Please upload a PDF resume");
              return;
            }
            setisLoading(true);
            try {
              const resumeText = await pdfToText(resume); // extract text
              //   console.log("Resume text length:", resumeText.length);

              const res = await fetch("/api/ai/upload-resume", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ title: titleName, resumeText }),
              });

              if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || `Error ${res.status}`);
              }
              const data = await res.json();
              setshowUploadResume(false);
              settitleName("");
              setresume(null);
              navigate(`/app/resume-builder/${data.resumeId}/edit`);
            } catch (error) {
              console.log(error);

              toast.error(error?.response?.data?.message || error.message);
            } finally {
              setisLoading(false);
            }
            // navigate(`/app/resume-builder/${resumeId}/edit`);
            // Prevents page refresh
            // Closes popup
            // Navigates to resume builder page
          }}
          className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50
            z-10 flex items-center justify-center"
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
          >
            <h2 className="text-xl font-bold mb-4">Upload Resume</h2>
            <input
              onChange={(e) => {
                const value = e.target.value;
                settitleName(value);
              }}
              value={titleName}
              type="text"
              placeholder="Enter Resume Title"
              className="w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600"
              required
            />
            <div>
              <label
                htmlFor="Resume input"
                className="block text-sm text-slate-600"
              >
                Select Resume File
                <div className="flex flex-col items-center justify-center gap-2 border group text-slate-300 border-slate-300 border-dashed rounded-md p-4 py-10 my-4 hover:border-green-500 hover:text-green-600 cursor-pointer transition-colors">
                  {resume ? (
                    <p className="text-green-800">{resume.name}</p>
                  ) : (
                    <>
                      <UploadCloudIcon className="size-14 stroke-1" />
                      <p>Upload Resume</p>
                    </>
                  )}
                </div>
              </label>
              <input
                // className=""
                className="hidden"
                type="file"
                id="Resume input"
                accept=".pdf"
                onChange={(e) => setresume(e.target.files[0])}
              />
            </div>
            <button
              disabled={isLoading}
              className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-800 transition-colors"
            >
              {isLoading && (
                <LoaderCircleIcon className="animate-spin size-4 text-white" />
              )}
              {isLoading ? "Uploading" : "Upload Resume"}
            </button>
            <XIcon
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
              onClick={() => {
                setshowUploadResume(false);
                settitleName("");
                // Closes modal
                // Clears title
              }}
            />
          </div>
        </form>
      )}
    </>
  );
};

export default UploadResumeForm;
