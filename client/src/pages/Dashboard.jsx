import React, { useEffect, useState } from "react";
import { FilePenLineIcon, PencilIcon, TrashIcon } from "lucide-react";
import { dummyResumeData } from "../assets/assets";
import { Form, Navigate, useNavigate } from "react-router-dom";
import ResumeIcons from "../components/DashBoardPages/ResumeIcons";
import ShowCreateResumeForm from "../components/DashBoardPages/ShowCreateResumeForm";
import UploadResumeForm from "../components/DashBoardPages/UploadResumeForm";
import EditResume from "../components/DashBoardPages/EditResume";

const Dashboard = () => {
  const navigate = useNavigate();
  const [showcreateResume, setshowcreateResume] = useState(false);
  const [showUploadResume, setshowUploadResume] = useState(false);
  const [allResumes, setallResumes] = useState([]);
  const [titleName, settitleName] = useState("");
  const [resume, setresume] = useState(null);
  const [editResumeId, seteditResumeId] = useState("");

  //   | State              | What It Does                               |
  // | ------------------ | ------------------------------------------ |
  // | `showcreateResume` | Controls visibility of Create Resume popup |
  // | `showUploadResume` | For future upload popup (not used now)     |
  // | `allResumes`       | Stores list of all resumes to show         |
  // | `titleName`        | Controlled input for resume title          |
  // | `resume`           | Used for giving uploading file a new name  later              |
  // | `editResumeId`     | For storing id of resume being edited      |

  const loadAllResumes = async (data) => {
    setallResumes(data);
  };

  useEffect(() => {
    loadAllResumes(dummyResumeData);
  }, []);
  // Runs only once when page loads.
  // Fills UI with dummy resumes.

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-3xl font-semibold mb-6 tracking-wide bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent drop-shadow-sm sm:hidden">
          Welcome, Joe Doe
        </p>
        {/* <h1>vaibhav shinde</h1> */}

        <ResumeIcons
          setshowcreateResume={setshowcreateResume}
          setshowUploadResume={setshowUploadResume}
        />
        {/* <div className="flex gap-4">
          <button
            onClick={() => {
              setshowcreateResume(true);
            }}
            value={createResume}
            onClick={() => {}}
            className="p-2 flex items-center justify-center hover:bg-gray-200 rounded-full cursor-pointer"
            className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <PlusIcon className="size-11 transition-all duration-300 p-3 bg-linear-to-br from-indigo-400 text-white rounded-full" />
            <p className="text-sm group-hover:text-red-400 transition-all duration-300">
              Create Resume
            </p>
            when click on this button only Shows popup form
          </button>

          <button
            onClick={() => {
              setshowUploadResume(true);
            }}
            className="p-2 flex items-center justify-center hover:bg-gray-200 rounded-full cursor-pointer"
            className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <UploadCloudIcon className="size-11 transition-all duration-300 p-3 bg-linear-to-br from-indigo-300 to-indigo-500 text-white rounded-full" />
            <p className="text-sm group-hover:text-red-400 transition-all duration-300">
              Upload Existing
            </p>
          </button>
        </div> */}

        <hr className="border-slate-400 my-6 sm:w-[305px]" />
        <div className="grid grid-cols-2 sm:flex flex-wrap gap-5">
          {/* renders dummy data */}
          {allResumes.map((eachresume) => {
            // console.log(allResumes);

            return (
              <button
                onClick={() =>
                  navigate(`/app/resume-builder/${eachresume._id}/edit`)
                }
                key={eachresume._id}
                className="relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer"
                style={{
                  backgroundColor: "whitesmoke",
                  // background:
                  // "url('https://i.imgur.com/aKQOg3G.png') center/cover no-repeat",
                  // "url('https://i.imgur.com/0Zf0JtW.jpg') center/cover no-repeat",
                  // "url('https://i.imgur.com/aKQOg3G.png') center/cover no-repeat",
                }}
              >
                <hr className="border-slate-400 my-1 sm:w-[90px]" />
                <FilePenLineIcon
                  className="size-7 group-hover:scale-110 transition-all text-blue-600"
                  style={{}}
                />
                <p className="text-sm group-hover:scale-105 transition-all px-2 text-center">
                  {eachresume.title}
                </p>
                <p className="absolute bottom-1 text-[11px] text-slate-950 group-hover:text-slate-900 transition-all duration-200 px-2.5 text-center">
                  Updated on {new Date(eachresume.updatedAt).toLocaleString()}
                </p>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="absolute top-0.5 right-1 group-hover:flex items-center hidden"
                >
                  <TrashIcon
                    // onClick={() => {
                    //   // console.log(eachresume._id);
                    //   const confirmDelete = window.confirm(
                    //     "Are you sure you want to delete this resume?"
                    //   );
                    //   if (!confirmDelete) return;

                    //   setallResumes((prevState) =>
                    //     prevState.filter((each) => each._id !== eachresume.id)
                    //   );
                    // }}
                    onClick={() => {
                      async function Delete(resumeId) {
                        // console.log(resumeId);

                        const confirm = window.confirm(
                          "want to delete resume ?"
                        );
                        if (confirm) {
                          setallResumes((previusStateofAllResumes) => {
                            return previusStateofAllResumes.filter(
                              (eachResume) => {
                                return eachResume._id !== resumeId;
                              }
                            );
                          });
                        }
                      }
                      return Delete(eachresume._id);
                    }}
                    className="size-9 p-2 hover:bg-white/55 rounded text-slate-800 transition-colors"
                  />
                  <PencilIcon
                    onClick={() => {
                      seteditResumeId(eachresume._id);
                      settitleName(eachresume.title);
                    }}
                    className="size-9 p-2 hover:bg-white/55 rounded text-slate-800 transition-colors"
                  />
                </div>
              </button>
              //             <button
              //               key={eachresume.id}
              //               className="
              //   relative w-full sm:max-w-40 h-52 flex flex-col items-center justify-center
              //   rounded-2xl gap-3 border border-slate-300 bg-white shadow-md
              //   hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer
              //   overflow-hidden group
              // "
              //               style={{
              //                 background: `
              //     linear-gradient(to bottom, rgba(255,255,255,0.35), rgba(255,255,255,0.75)),
              //     url('https://i.imgur.com/aKQOg3G.png') center/cover no-repeat
              //   `,
              //               }}
              //             >
              //               {/* Circular Profile Bg Image */}
              //               <div
              //                 className="
              //     absolute inset-0 flex justify-center items-start pt-4 opacity-20
              //     transition-all group-hover:opacity-30
              //   "
              //               >
              //                 <img
              //                   src="https://i.imgur.com/OCyjHNF.png"
              //                   alt="profile"
              //                   className="w-20 h-20 object-cover rounded-full shadow-md"
              //                 />
              //               </div>

              //               {/* Icon */}
              //               <FilePenLineIcon className="size-7 text-slate-800 drop-shadow group-hover:scale-110 transition-all z-10" />

              //               {/* Title */}
              //               <p
              //                 className="
              //     text-sm font-semibold text-slate-900 group-hover:text-blue-700
              //     group-hover:scale-105 transition-all px-2 text-center z-10
              //   "
              //               >
              //                 {eachresume.title}
              //               </p>

              //               {/* Updated Date */}
              //               <p className="absolute bottom-2 text-[11px] text-slate-600 font-medium z-10">
              //                 Updated on{" "}
              //                 {new Date(eachresume.updatedAt).toLocaleDateString()}
              //               </p>

              //               {/* Hover Buttons */}
              //               <div
              //                 className="
              //     absolute top-2 right-2 hidden group-hover:flex gap-1 items-center z-20
              //   "
              //               >
              //                 <TrashIcon className="size-8 p-2 bg-white/80 hover:bg-white rounded-lg text-red-600 shadow-sm transition" />
              //                 <PencilIcon className="size-8 p-2 bg-white/80 hover:bg-white rounded-lg text-blue-700 shadow-sm transition" />
              //               </div>
              //             </button>
            );
          })}
        </div>

        <ShowCreateResumeForm
          titleName={titleName}
          showcreateResume={showcreateResume}
          setshowcreateResume={setshowcreateResume}
          settitleName={settitleName}
        />
        {/* {showcreateResume && (
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setshowcreateResume(false);
              navigate("/app/resume-builder/123");
              // Prevents page refresh
              // Closes popup
              // Navigates to resume builder page
            }}
            onClick={() => {
              setshowcreateResume(false);
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
              <h2 className="text-xl font-bold mb-4">Create Resume</h2>
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
        )} */}

        <UploadResumeForm
          titleName={titleName}
          resume={resume}
          showUploadResume={showUploadResume}
          setshowUploadResume={setshowUploadResume}
          settitleName={settitleName}
          setresume={setresume}
        />

        <EditResume
          editResumeId={editResumeId}
          seteditResumeId={seteditResumeId}
          settitleName={settitleName}
          titleName={titleName}
        />

        {/* {editResumeId && (
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
        )} */}

        {/* {showUploadResume && (
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setshowUploadResume(false);
              navigate("/app/resume-builder/123/edit");
              // Prevents page refresh
              // Closes popup
              // Navigates to resume builder page
            }}
            onClick={() => {
              setshowUploadResume(false);
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
              <h2 className="text-xl font-bold mb-4">Upload Resume</h2>
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
                        <UploadCloud className="size-14 stroke-1" />
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
              <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-800 transition-colors">
                Upload Resume
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
        )} */}
      </div>
    </div>
  );
};

export default Dashboard;
