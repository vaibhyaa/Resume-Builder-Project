// import { UploadCloudIcon, XIcon } from "lucide-react";
// import React, { useState } from "react";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// const UploadResumeForm = ({
//   titleName,
//   resume,
//   showUploadResume,
//   setshowUploadResume,
//   settitleName,
//   setresume,
// }) => {
//   const navigate = useNavigate();
//   const [isLoading, setisLoading] = useState(false);
//   const { token } = useSelector((state) => state.auth);

//   return (
//     <>
//       {showUploadResume && (
//         <form
//           onSubmit={async (e) => {
//             e.preventDefault();

//             if (!resume) {
//               toast.error("Please upload a PDF resume");
//               return;
//             }

//             if (!titleName.trim()) {
//               toast.error("Resume title is required");
//               return;
//             }

//             try {
//               setisLoading(true);

//               const formData = new FormData();
//               formData.append("title", titleName);
//               formData.append("resume", resume);

//               const res = await fetch("/api/ai/upload-resume", {
//                 method: "POST",
//                 headers: {
//                   Authorization: `Bearer ${token}`,
//                 },
//                 body: formData,
//               });

//               const data = await res.json();

//               if (!res.ok) {
//                 throw new Error(data.message || "Upload failed");
//               }

//               toast.success("Resume uploaded successfully");

//               setshowUploadResume(false);
//               settitleName("");
//               setresume(null);

//               navigate(`/app/resume-builder/${data.resumeId}/edit`);
//             } catch (error) {
//               console.error(error);
//               toast.error(error.message);
//             } finally {
//               setisLoading(false);
//             }
//           }}
//           className="fixed inset-0 bg-black/70 backdrop-blur z-10 flex items-center justify-center"
//         >
//           <div
//             onClick={(e) => e.stopPropagation()}
//             className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
//           >
//             <h2 className="text-xl font-bold mb-4">Upload Resume</h2>

//             <input
//               value={titleName}
//               onChange={(e) => settitleName(e.target.value)}
//               type="text"
//               placeholder="Enter Resume Title"
//               className="w-full px-4 py-2 mb-4 border rounded"
//               required
//             />

//             <label className="block text-sm text-slate-600">
//               Select Resume File
//               <div className="flex flex-col items-center justify-center gap-2 border border-dashed rounded-md p-4 py-10 my-4 cursor-pointer">
//                 {resume ? (
//                   <p className="text-green-700">{resume.name}</p>
//                 ) : (
//                   <>
//                     <UploadCloudIcon className="size-14" />
//                     <p>Upload Resume</p>
//                   </>
//                 )}
//               </div>
//             </label>

//             <input
//               type="file"
//               accept="application/pdf"
//               className="hidden"
//               onChange={(e) => setresume(e.target.files[0])}
//             />

//             <button
//               disabled={isLoading}
//               className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-800 transition-colors"
//             >
//               {isLoading ? "Uploading..." : "Upload Resume"}
//             </button>

//             <XIcon
//               className="absolute top-4 right-4 cursor-pointer"
//               onClick={() => {
//                 setshowUploadResume(false);
//                 settitleName("");
//               }}
//             />
//           </div>
//         </form>
//       )}
//     </>
//   );
// };

// export default UploadResumeForm;
