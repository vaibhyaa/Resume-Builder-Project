import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { dummyResumeData } from "../assets/assets";
import {
  ArrowLeftIcon,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  FileText,
  FolderIcon,
  GraduationCap,
  Sparkle,
  User,
} from "lucide-react";
import PersonalInfoForm from "../components/PersonalInfoForm";
import ResumePreview from "../components/ResumePreview";
import TemplateSelector from "../components/TemplateSelector";
import ColorPicker from "../components/ColorPicker";

const ResumeBuilder = () => {
  const { resumeId } = useParams();
  const [resumeData, setresumeData] = useState({
    _id: "",
    title: "",
    personal_info: {},
    perfessional_summery: "",
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

  const loadExistingResume = async () => {
    const resume = dummyResumeData.find((resume) => resume._id === resumeId);
    if (resume) {
      setresumeData(resume);
      document.title = resume.title;
    }
  };

  useEffect(() => {
    async function fetchData() {
      await loadExistingResume();
    }
    fetchData();
  }, []);

  const sections = [
    { id: "personal", name: "personal info", icon: User },
    { id: "summery", name: "summery", icon: FileText },
    { id: "Experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "education", icon: GraduationCap },
    { id: "projects", name: "projects", icon: FolderIcon },
    { id: "skills", name: "skills", icon: Sparkle },
  ];

  const activeSection = sections[activateSectionIndex];

  return (
    // <div>
    //   <div className="max-w-7xl mx-auto px-4 py-6">
    //     <Link
    //       to={"/app"}
    //       className="inline-flex gap-2 items-center text-slate-600 hover:text-slate-700 transition-all"
    //     >
    //       <ArrowLeftIcon className="size-4" /> Back to Dashboard
    //     </Link>
    //   </div>
    //   <div className="max-w-7xl mx-auto px-4 pb-8">
    //     <div className="grid lg:grid-cols-12 gap-8">
    //       {/* left panel --form */}
    //       <div className="relative lg:col-span-5 rounded-lg overflow-hidden">
    //         <div className="bg-white rounded-lg shadow-sm border border-gray-300 p-6 pt-1">
    //           {/* progreess bar using active section index */}
    //           <hr className="absolute top-0 left-0 right-0 border-2 border-gray-300" />
    //           <hr
    //             className="absolute top-0 left-0 h-1 bg-linear-to-r
    //           from-green-400 to-green-600 border-none transition-all duration-2000 "
    //             style={{
    //               width: `${
    //                 (activateSectionIndex * 100) / (sections.length - 1)
    //               }%`,
    //             }}
    //           />
    //           {/* section navigation */}
    //           <div
    //             className="flex
    //            justify-between items-center mb-6 border-b border-gray-300 py-1"
    //           >
    //             <div className="flex justify-between items-center mb-6 border-b border-gray-300 py-1">
    //               <TemplateSelector
    //                 selectedTemplate={resumeData.template}
    //                 onChange={(template) =>
    //                   setresumeData((preV) => ({ ...preV, template }))
    //                 }
    //               />
    //               <ColorPicker selectedColor={resumeData.accent_color} onChange={(color)=>setresumeData((preV)=>({...preV,accent_color:color}))}/>
    //             </div>
    //             <div className="flex items-center">
    //               {activateSectionIndex !== 0 && (
    //                 <button
    //                   onClick={() => {
    //                     return setactivateSectionIndex((previousState) => {
    //                       return Math.max(previousState - 1, 0);
    //                     });
    //                   }}
    //                   className="flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all ${}"
    //                   disabled={activateSectionIndex === 0}
    //                 >
    //                   <ChevronLeft className="size-4" />
    //                   Previous  buttttonnnnnnnnnnnnnn
    //                 </button>
    //               )}
    //               <button
    //                 onClick={() => {
    //                   return setactivateSectionIndex((previousState) => {
    //                     return Math.min(previousState + 1, sections.length - 1);
    //                   });
    //                 }}
    //                 className={`flex
    //                    items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover: bg-gray-100 transition-all ${
    //                      activateSectionIndex === sections.length - 1 &&
    //                      "opacity-50"
    //                    }`}
    //                 disabled={activateSectionIndex === sections.length - 1}
    //               >
    //                 <ChevronRight className="size-4" />
    //                 Next
    //               </button>
    //             </div>
    //           </div>
    //           {/* Form content */}
    //           <div className="space-y-6">
    //             {activeSection.id === "personal" && (
    //               <PersonalInfoForm
    //                 data={resumeData.personal_info}
    //                 onChange={(data) =>
    //                   setresumeData((preV) => ({
    //                     ...preV,
    //                     personal_info: data,
    //                   }))
    //                 }
    //                 // data={resumeData.personal_info}
    //                 // onChange={(data)=>setresumeData((prev) => ({ ...prev,personal_info: data,}))}
    //                 removeBackground={removeBackground}
    //                 setremoveBackground={setremoveBackground}
    //               />
    //             )}
    //           </div>
    //         </div>
    //       </div>
    //       {/* right panel --preview*/}
    //       <div className="lg:col-span-7 max-lg:mt-6">
    //         <div>{/* buttons */}</div>
    //         {/* resume Preview */}
    //         <ResumePreview
    //           data={resumeData}
    //           template={resumeData.template}
    //           accentColor={resumeData.accent_color}
    //         />
    //       </div>
    //     </div>
    //   </div>
    // </div>

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
                    onChange={(data) =>
                      setresumeData((preV) => ({
                        ...preV,
                        personal_info: data,
                      }))
                    }
                    removeBackground={removeBackground}
                    setremoveBackground={setremoveBackground}
                  />
                )}
              </div>
            </div>
          </div>

          {/* RIGHT PANEL — PREVIEW */}
          <div className="lg:col-span-7 max-lg:mt-6">
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
