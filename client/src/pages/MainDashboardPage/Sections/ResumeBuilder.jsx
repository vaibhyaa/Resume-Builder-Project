import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
// import { dummyResumeData } from "../../../assets/assets";
import {
  ArrowLeftIcon,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  DownloadIcon,
  EyeIcon,
  EyeOffIcon,
  FileText,
  FolderIcon,
  GraduationCap,
  Share2Icon,
  Sparkle,
  User,
} from "lucide-react";
import PersonalInfoForm from "../../../components/PersonalInfo/PersonalInfoForm";
import ResumePreview from "../../../components/ResumePreview/ResumePreview";
import TemplateSelector from "../../../components/ResumeTemplateSelector/TemplateSelector";
import ColorPicker from "../../../components/ColorPickerforResume/ColorPicker";
import ProfessionalSummeryForm from "../../../components/professionalInfo/ProfessionalSummeryForm";
import ExperienceForm from "../../../components/Experience/ExperienceForm";
import EductionForm from "../../../components/Education/EductionForm";
import ProjectForm from "../../../components/Projects/ProjectForm";
import SkillsForm from "../../../components/Skills/SkillsForm";

const ResumeBuilder = () => {
  const navigate = useNavigate();
  const { resumeId } = useParams();
  const [resumeData, setresumeData] = useState({
    _id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    //     professional_summary: {
    //   original: "",
    //   enhanced: "",
    // },
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: "classic",
    accent_color: "#3B82f6",
    public: false,
  });

  const [activateSectionIndex, setactivateSectionIndex] = useState(0);
  const [removeBackground, setremoveBackground] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // const loadExistingResume = async () => {
  //   const resume = dummyResumeData.find((resume) => resume._id === resumeId);
  //   if (resume) {
  //     setresumeData(resume);
  //     document.title = resume.title;
  //   }
  // };

  useEffect(() => {
    if (!resumeId) return;

    const fetchResume = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const res = await fetch(`/api/resumes/get/${resumeId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message);

        setresumeData(data.resume);
        document.title = data.resume.title;
      } catch (error) {
        console.error(error.message);
        alert("Resume not found");
        navigate("/app");
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, [resumeId, navigate]);

  // save functionality
  const saveChanges = async () => {
    try {
      setSaving(true);

      const token = localStorage.getItem("token");

      const res = await fetch("/api/resumes/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          resumeId: resumeData._id,
          resumeData,
          removeBackground,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      alert("Resume saved successfully!");
    } catch (error) {
      // console.error(error.message);
      alert("Error saving resume");
    } finally {
      setSaving(false);
    }
  };

  // useEffect(() => {
  //   async function fetchData() {
  //     await loadExistingResume();
  //   }
  //   fetchData();
  // }, []);

  const sections = [
    { id: "personal", name: "personal info", icon: User },
    { id: "summary", name: "summary", icon: FileText },
    { id: "experience", name: "experience", icon: Briefcase },
    { id: "education", name: "education", icon: GraduationCap },
    { id: "projects", name: "projects", icon: FolderIcon },
    { id: "skills", name: "skills", icon: Sparkle },
  ];

  const activeSection = sections[activateSectionIndex];

  // async function changeResumeVisibility() {
  //   // API CALL TO CHANGE RESUME VISIBILITY
  //   setresumeData((prev) => ({ ...prev, public: !prev.public }));
  // }
  const changeResumeVisibility = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("/api/resumes/toggle-visibility", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          resumeId: resumeData._id,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setresumeData((prev) => ({
        ...prev,
        public: data.public,
      }));
    } catch (error) {
      console.error(error.message);
      alert("Error updating visibility");
    }
  };

  // async function handleShare() {
  //   const frontendURL = window.location.href.split("/app/")[0];
  //   const resumeURL = `${frontendURL}/view/${resumeData._id}`;
  //   if (navigator.share) {
  //     navigator
  //       .share({
  //         title: "Check out my resume",
  //         text: "Here is the link to my resume:",
  //         url: resumeURL,
  //       })
  //       .then(() => console.log("Successful share"))
  //       .catch((error) => console.log("Error sharing", error));
  //   } else {
  //     alert(
  //       "Sharing not supported on this browser. Copy this link: " + resumeURL,
  //     );
  //   }
  // }

  const handleShare = async () => {
    const resumeURL = `${window.location.origin}/view/${resumeData._id}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: "Check out my resume",
          url: resumeURL,
        });
      } else {
        await navigator.clipboard.writeText(resumeURL);
        alert("Resume link copied to clipboard!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  async function downloadResume() {
    // API CALL TO DOWNLOAD RESUME
    window.print();
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading Resume...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Top Back Bar */}
      <div className="max-w-7xl mx-auto px-4 py-5">
        <Link
          to={"/app"}
          className="inline-flex items-center gap-2 text-sm font-medium
                 text-slate-600 hover:text-slate-800 transition-colors"
        >
          <ArrowLeftIcon className="size-4" />
          Back to Dashboard
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-10">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* LEFT PANEL — FORM */}
          <div className="relative lg:col-span-5">
            <div className="relative bg-white rounded-xl shadow-sm border border-gray-200 p-6 pt-4 overflow-hidden">
              {/* Progress Bar */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gray-200" />
              <div
                className="absolute top-0 left-0 h-[3px]
                       bg-linear-to-r from-green-400 to-green-600
                       transition-all duration-500"
                style={{
                  width: `${
                    (activateSectionIndex * 100) / (sections.length - 1)
                  }%`,
                }}
              />

              {/* Header Controls */}
              <div
                className="flex flex-wrap justify-between items-center gap-4
                          border-b border-gray-200 pb-3 mb-6"
              >
                <div className="flex items-center gap-3">
                  <TemplateSelector
                    selectedTemplate={resumeData.template}
                    onChange={(template) =>
                      setresumeData((preV) => ({ ...preV, template }))
                    }
                  />

                  <ColorPicker
                    selectedColor={resumeData.accent_color}
                    onChange={(color) =>
                      setresumeData((preV) => ({
                        ...preV,
                        accent_color: color,
                      }))
                    }
                  />
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center gap-2">
                  {activateSectionIndex !== 0 && (
                    <button
                      onClick={() => {
                        return setactivateSectionIndex((previousState) => {
                          return Math.max(previousState - 1, 0);
                        });
                      }}
                      disabled={activateSectionIndex === 0}
                      className="flex items-center gap-1 px-3 py-2 rounded-lg
                             text-sm font-medium text-gray-600
                             hover:bg-gray-100 transition-colors"
                    >
                      <ChevronLeft className="size-4" />
                      Previous
                    </button>
                  )}

                  <button
                    onClick={() => {
                      return setactivateSectionIndex((previousState) => {
                        return Math.min(previousState + 1, sections.length - 1);
                      });
                    }}
                    disabled={activateSectionIndex === sections.length - 1}
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg
                            text-sm font-medium text-gray-600
                            hover:bg-gray-100 transition-colors
                            ${
                              activateSectionIndex === sections.length - 1
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                  >
                    Next
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>

              {/* FORM CONTENT */}
              <div className="space-y-6">
                {activeSection.id === "personal" && (
                  <PersonalInfoForm
                    data={resumeData.personal_info}
                    onChange={(value) => {
                      // console.log(value);
                      setresumeData((preV) => ({
                        ...preV,
                        personal_info: value,
                      }));
                    }}
                    removeBackground={removeBackground}
                    setremoveBackground={setremoveBackground}
                  />
                )}
                {activeSection.id === "summary" && (
                  <ProfessionalSummeryForm
                    data={resumeData.professional_summary}
                    onChange={(value) =>
                      setresumeData((prev) => ({
                        ...prev,
                        professional_summary: value,
                      }))
                    }
                    setresumeData={setresumeData}
                  />
                )}

                {activeSection.id === "experience" && (
                  <ExperienceForm
                    data={resumeData.experience}
                    onChange={(value) =>
                      setresumeData((prev) => ({
                        ...prev,
                        experience: value,
                      }))
                    }
                  />
                )}

                {activeSection.id === "education" && (
                  <EductionForm
                    data={resumeData.education}
                    onChange={(value) =>
                      setresumeData((prev) => ({
                        ...prev,
                        education: value,
                      }))
                    }
                  />
                )}

                {activeSection.id === "projects" && (
                  <ProjectForm
                    data={resumeData.project}
                    onChange={(value) =>
                      setresumeData((prev) => ({
                        ...prev,
                        project: value,
                      }))
                    }
                  />
                )}

                {activeSection.id === "skills" && (
                  <SkillsForm
                    data={resumeData.skills}
                    onChange={(value) =>
                      setresumeData((prev) => ({
                        ...prev,
                        skills: value,
                      }))
                    }
                  />
                )}
              </div>
              {/* <button className="bg-linear-to-br from-green-100 to-green-200 ring-green-300 text-green-600 ring hover:ring-green-400 transition-all rounded-md px-6 py-2 mt-6 text-sm">
                SAVE CHANGES
              </button> */}
              <button
                onClick={saveChanges}
                disabled={saving}
                className="bg-linear-to-br from-green-100 to-green-200 ring-green-300 
             text-green-600 ring hover:ring-green-400 transition-all 
             rounded-md px-6 py-2 mt-6 text-sm disabled:opacity-50"
              >
                {saving ? "Saving..." : "SAVE CHANGES"}
              </button>
            </div>
          </div>

          {/* RIGHT PANEL — PREVIEW */}
          <div className="lg:col-span-7 max-lg:mt-6">
            <div className="relative w-full">
              <div className="absolute bottom-3 left-0 right-0 flex items-center justify-end gap-2">
                {resumeData.public && (
                  <button
                    onClick={handleShare}
                    className="flex items-center p-2 gap-2 px-4 py-2 text-xs bg-linear-to-r from-blue-100 to-blue-200 text-blue-500  rounded-lg ring-blue-200 hover:ring transition-colors"
                  >
                    <Share2Icon className="size-4" />
                    Share
                  </button>
                )}
                <button
                  onClick={changeResumeVisibility}
                  className="flex items-center p-2 gap-2 px-4 py-2 text-xs bg-linear-to-r from-purple-100 to-purple-200 text-purple-500  rounded-lg ring-purple-200 hover:ring transition-colors"
                >
                  {resumeData.public ? (
                    <EyeIcon className="size-4" />
                  ) : (
                    <EyeOffIcon className="size-4" />
                  )}
                  {resumeData.public ? ` Public Resume` : ` Private Resume`}
                </button>
                <button
                  onClick={downloadResume}
                  className="flex items-center p-2 gap-2 px-4 py-2 text-xs bg-linear-to-r from-green-100 to-green-200 text-green-500  rounded-lg ring-green-200 hover:ring transition-colors"
                >
                  <DownloadIcon />
                  Download
                </button>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <ResumePreview
                data={resumeData}
                template={resumeData.template}
                accentColor={resumeData.accent_color}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;

// /* ===========================
//    FETCH RESUME FROM BACKEND
// ============================ */
// useEffect(() => {
//   const fetchResume = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         navigate("/login");
//         return;
//       }

//       const res = await fetch(`/api/resumes/get/${resumeId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.message || "Failed to fetch resume");
//       }

//       setresumeData(data.resume);
//       document.title = data.resume.title;
//     } catch (error) {
//       console.error(error.message);
//       alert("Resume not found");
//       navigate("/app");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (resumeId) {
//     fetchResume();
//   }
// }, [resumeId, navigate]);

// /* ===========================
//    SAVE RESUME
// ============================ */
// const saveChanges = async () => {
//   try {
//     setSaving(true);

//     const token = localStorage.getItem("token");

//     const res = await fetch("/api/resumes/update", {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         resumeId: resumeData._id,
//         resumeData,
//         removeBackground,
//       }),
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       throw new Error(data.message || "Update failed");
//     }

//     alert("Resume saved successfully");
//   } catch (error) {
//     console.error(error.message);
//     alert("Error saving resume");
//   } finally {
//     setSaving(false);
//   }
// };

// /* ===========================
//    TOGGLE PUBLIC
// ============================ */
// const changeResumeVisibility = async () => {
//   setresumeData((prev) => ({ ...prev, public: !prev.public }));
// };

// /* ===========================
//    SHARE
// ============================ */
// const handleShare = () => {
//   const frontendURL = window.location.origin;
//   const resumeURL = `${frontendURL}/view/${resumeData._id}`;

//   navigator.clipboard.writeText(resumeURL);
//   alert("Resume link copied to clipboard!");
// };

// /* ===========================
//    DOWNLOAD
// ============================ */
// const downloadResume = () => {
//   window.print();
// };

// if (loading) {
//   return <div className="text-center py-20">Loading...</div>;
// }
