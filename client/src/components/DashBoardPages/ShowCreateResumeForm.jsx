import { XIcon } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import api from "../../configs/api.js";
import toast from "react-hot-toast";

const ShowCreateResumeForm = ({
  titleName,
  showcreateResume,
  setshowcreateResume,
  settitleName,
  setallResumes,
  allResumes,
}) => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  return (
    <>
      {showcreateResume && (
        <form
          onSubmit={async (e) => {
            // e.preventDefault();
            // setshowcreateResume(false);
            // navigate("/app/resume-builder/new");

            try {
              e.preventDefault();
              const res = await fetch("/api/resumes/create", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`, // add Bearer
                },
                body: JSON.stringify({ title: titleName }), // POST body as JSON
              });

              if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || `Error ${res.status}`);
              }
              const data = await res.json();
              // console.log(data);
              setallResumes([...allResumes, data.resume]);
              settitleName("");
              setshowcreateResume(false);
              // Navigate to newly created resume (replace data.id with actual id from API)
              navigate(`/app/resume-builder/new/${data.resume._id}`);
            } catch (error) {
              toast.error(error?.response?.data?.message || error.message);
            } finally {
              setshowcreateResume(false);
            }
            // navigate("/app/resume-builder/new/123");
            // Prevents page refresh
            // Closes popup
            // Navigates to resume builder page
          }}
          // onClick={() => {
          //   setshowcreateResume(false);
          // }}
          className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50
            z-10 flex items-center justify-center"
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
          >
            <h2 className="text-xl font-bold mb-4">Create Resume</h2>
            <input
              onChange={(e) => {
                const value = e.target.value;
                // console.log(value);
                settitleName(value);
              }}
              value={titleName}
              type="text"
              placeholder="Enter Resume Title"
              className="w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600"
              required
            />
            <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-800 transition-colors">
              Create Resume
            </button>
            <XIcon
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
              onClick={() => {
                setshowcreateResume(false);
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

export default ShowCreateResumeForm;
