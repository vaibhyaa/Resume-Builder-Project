import React, { useEffect, useState } from "react";
import { FilePenLineIcon, PencilIcon, TrashIcon } from "lucide-react";
// import { dummyResumeData } from "../../assets/assets";
import { Form, Navigate, useNavigate } from "react-router-dom";
import ResumeIcons from "../../components/DashBoardPages/ResumeIcons";
import ShowCreateResumeForm from "../../components/DashBoardPages/ShowCreateResumeForm";
import UploadResumeForm from "../../components/DashBoardPages/UploadResumeForm";
import EditResume from "../../components/DashBoardPages/EditResume";
import { AiOutlineFileText } from "react-icons/ai";
import { useSelector } from "react-redux";
// import api from "../../configs/api.js";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { token } = useSelector((state) => state.auth);
  const [showcreateResume, setshowcreateResume] = useState(false);
  const [showUploadResume, setshowUploadResume] = useState(false);
  const [allResumes, setallResumes] = useState([]);
  const [titleName, settitleName] = useState("");
  const [resume, setresume] = useState(null);
  const [editResumeId, seteditResumeId] = useState("");

  const navigate = useNavigate();
  //   | State              | What It Does                               |
  // | ------------------ | ------------------------------------------ |
  // | `showcreateResume` | Controls visibility of Create Resume popup |
  // | `showUploadResume` | For future upload popup (not used now)     |
  // | `allResumes`       | Stores list of all resumes to show         |
  // | `titleName`        | Controlled input for resume title          |
  // | `resume`           | Used for giving uploading file a new name  later              |
  // | `editResumeId`     | For storing id of resume being edited      |

  // const loadAllResumes = async () => {
  //   // setallResumes(data);
  //   try {
  //     const res = await fetch("/api/users/resumes", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({ title: titleName }),
  //     });

  //     const data = await res.json();
  //     console.log(data);
  //     // const { data } = await api.get(
  //     //   "/api/users/resumes",
  //     //   { title: titleName },
  //     //   { headers: { Authorization: token } }
  //     // );

  //     setallResumes(data.resume);
  //   } catch (error) {
  //     toast.error(error?.response?.data?.message || error.message);
  //   }
  // };

  const loadAllResumes = async () => {
    try {
      const res = await fetch("/api/users/resumes", {
        headers: { Authorization: `Bearer ${token}` }, // include Bearer
      });

      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }
      const data = await res.json();
      // console.log(data);
      setallResumes(data.resumes); // note 'resumes' not 'resume'
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      loadAllResumes();
    }
  }, [token]);
  // Runs only once when page loads.
  // Fills UI with dummy resumes.

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* <h1 className="text-3xl font-semibold mb-6 tracking-wide bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent drop-shadow-sm sm:hidden">
          Welcome, Joe Doe
        </h1> */}

        <ResumeIcons
          setshowcreateResume={setshowcreateResume}
          setshowUploadResume={setshowUploadResume}
        />

        <hr className="border-slate-400 my-6 sm:w-[305px]" />
        <div className="grid grid-cols-2 sm:flex flex-wrap gap-5">
          {/* renders dummy data */}
          {allResumes.map((eachresume) => {
            // console.log(eachresume);
            return (
              <button
                key={eachresume._id}
                className="relative group w-full sm:w-44 h-52 rounded-xl 
             bg-white border border-slate-200 shadow-sm 
             hover:shadow-md hover:border-slate-300 
             transition-all duration-300 cursor-pointer 
             flex flex-col items-center justify-center px-3"
              >
                {/* Top Action Icons */}
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-2 right-2 hidden group-hover:flex gap-1"
                >
                  {/* DELETE */}
                  <TrashIcon
                    onClick={() => {
                      toast((t) => (
                        <div className="flex flex-col gap-3">
                          <p className="font-medium">Delete this resume?</p>

                          <div className="flex gap-2 justify-end">
                            <button
                              onClick={() => toast.dismiss(t.id)}
                              className="px-3 py-1 bg-gray-300 rounded"
                            >
                              Cancel
                            </button>

                            <button
                              onClick={async () => {
                                try {
                                  // 🔥 Call backend delete API here
                                  await fetch(
                                    `/api/resumes/delete/${eachresume._id}`,
                                    {
                                      method: "DELETE",
                                      headers: {
                                        Authorization: `Bearer ${token}`,
                                      },
                                    },
                                  );

                                  setallResumes((prev) =>
                                    prev.filter(
                                      (item) => item._id !== eachresume._id,
                                    ),
                                  );

                                  toast.success("Resume deleted");
                                } catch (err) {
                                  toast.error("Delete failed");
                                }

                                toast.dismiss(t.id);
                              }}
                              className="px-3 py-1 bg-red-600 text-white rounded"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ));
                    }}
                    // onClick={() => {
                    //   async function Delete(resumeId) {
                    //     const confirmDelete = window.confirm(
                    //       "Want to delete this resume?",
                    //     );
                    //     if (confirmDelete) {
                    //       setallResumes((prev) =>
                    //         prev.filter((item) => item._id !== resumeId),
                    //       );
                    //     }
                    //   }
                    //   Delete(eachresume._id);
                    // }}
                    className="size-8 p-2 rounded-md bg-white/80 
                 hover:bg-red-50 text-slate-700 hover:text-red-600 
                 border border-slate-200 hover:border-red-300 
                 transition-all"
                  />

                  {/* EDIT */}
                  <PencilIcon
                    onClick={() => {
                      seteditResumeId(eachresume._id);
                      settitleName(eachresume.title);
                      // navigate(`/app/resume-builder/${eachresume._id}/edit`);
                    }}
                    className="size-8 p-2 rounded-md bg-white/80 
                 hover:bg-blue-50 text-slate-700 hover:text-blue-600 
                 border border-slate-200 hover:border-blue-300 
                 transition-all"
                  />
                </div>

                {/* Divider */}
                <div className="w-16 border-t border-slate-300 my-4"></div>

                {/* Main Icon */}
                <AiOutlineFileText
                  onClick={() =>
                    // navigate(`/app/resume-builder/${eachresume._id}/edit`);
                    // this is for just seeing of view of existing resume
                    navigate(`/view/${eachresume._id}`)
                  }
                  className="size-8 text-blue-600 
               group-hover:scale-110 
               transition-transform duration-300"
                />
                <p
                  className="mt-3 text-sm font-medium leading-tight text-center text-slate-800 
                group-hover:text-blue-700 group-hover:scale-[1.03] transition-all"
                >
                  {eachresume.title}
                </p>

                {/* Updated time */}
                <p className="absolute bottom-2 text-[11px] text-slate-500 text-center px-2">
                  Updated on {new Date(eachresume.updatedAt).toLocaleString()}
                </p>
              </button>
            );
          })}
        </div>

        <ShowCreateResumeForm
          titleName={titleName}
          showcreateResume={showcreateResume}
          setshowcreateResume={setshowcreateResume}
          settitleName={settitleName}
          setallResumes={setallResumes}
          allResumes={allResumes}
        />

        <UploadResumeForm
          titleName={titleName}
          resume={resume}
          showUploadResume={showUploadResume}
          setshowUploadResume={setshowUploadResume}
          settitleName={settitleName}
          setresume={setresume}
          setallResumes={setallResumes}
          allResumes={allResumes}
        />

        <EditResume
          editResumeId={editResumeId}
          seteditResumeId={seteditResumeId}
          settitleName={settitleName}
          titleName={titleName}
          setallResumes={setallResumes}
          allResumes={allResumes}
          updateResumeTitle={async (editResumeId, titleName) => {
            setallResumes((prevState) =>
              prevState.map((resumEeachData) => {
                if (resumEeachData._id === editResumeId) {
                  return {
                    ...resumEeachData,
                    title: titleName,
                    updatedAt: new Date(),
                  };
                } else {
                  return resumEeachData;
                }
              }),
            );
          }}
        />
      </div>
    </div>
  );
};

export default Dashboard;
