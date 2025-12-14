
const MinimalTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short"
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white text-gray-900 font-light">
            {/* Header */}
            <header className="mb-10">
                <h1 className="text-4xl font-thin mb-4 tracking-wide">
                    {data.personal_info?.full_name || "Your Name"}
                </h1>

                <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                    {data.personal_info?.email && <span>{data.personal_info.email}</span>}
                    {data.personal_info?.phone && <span>{data.personal_info.phone}</span>}
                    {data.personal_info?.location && <span>{data.personal_info.location}</span>}
                    {data.personal_info?.linkedin && (
                        <span className="break-all">{data.personal_info.linkedin}</span>
                    )}
                    {data.personal_info?.website && (
                        <span className="break-all">{data.personal_info.website}</span>
                    )}
                </div>
            </header>

            {/* Professional Summary */}
            {data.professional_summary && (
                <section className="mb-10">
                    <p className=" text-gray-700">
                        {data.professional_summary}
                    </p>
                </section>
            )}

            {/* Experience */}
            {data.experience && data.experience.length > 0 && (
                <section className="mb-10">
                    <h2 className="text-sm uppercase tracking-widest mb-6 font-medium" style={{ color: accentColor }}>
                        Experience
                    </h2>

                    <div className="space-y-6">
                        {data.experience.map((exp, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="text-lg font-medium">{exp.position}</h3>
                                    <span className="text-sm text-gray-500">
                                        {formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                    </span>
                                </div>
                                <p className="text-gray-600 mb-2">{exp.company}</p>
                                {exp.description && (
                                    <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                                        {exp.description}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects */}
            {data.project && data.project.length > 0 && (
                <section className="mb-10">
                    <h2 className="text-sm uppercase tracking-widest mb-6 font-medium" style={{ color: accentColor }}>
                        Projects
                    </h2>

                    <div className="space-y-4">
                        {data.project.map((proj, index) => (
                            <div key={index} className="flex flex-col gap-2 justify-between items-baseline">
                                <h3 className="text-lg font-medium ">{proj.name}</h3>
                                <p className="text-gray-600">{proj.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {data.education && data.education.length > 0 && (
                <section className="mb-10">
                    <h2 className="text-sm uppercase tracking-widest mb-6 font-medium" style={{ color: accentColor }}>
                        Education
                    </h2>

                    <div className="space-y-4">
                        {data.education.map((edu, index) => (
                            <div key={index} className="flex justify-between items-baseline">
                                <div>
                                    <h3 className="font-medium">
                                        {edu.degree} {edu.field && `in ${edu.field}`}
                                    </h3>
                                    <p className="text-gray-600">{edu.institution}</p>
                                    {edu.gpa && <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>}
                                </div>
                                <span className="text-sm text-gray-500">
                                    {formatDate(edu.graduation_date)}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {data.skills && data.skills.length > 0 && (
                <section>
                    <h2 className="text-sm uppercase tracking-widest mb-6 font-medium" style={{ color: accentColor }}>
                        Skills
                    </h2>

                    <div className="text-gray-700">
                        {data.skills.join(" • ")}
                    </div>
                </section>
            )}
        </div>
    );
}
export default MinimalTemplate;





// const MinimalTemplate = ({ data, accentColor }) => {
//   const formatDate = (dateStr) => {
//     if (!dateStr) return "";
//     const [year, month] = dateStr.split("-");
//     return new Date(year, month - 1).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//     });
//   };

//   return (
//     <div className="max-w-4xl mx-auto px-10 py-12 bg-white text-gray-900 font-light leading-relaxed">
//       {/* Header */}
//       <header className="mb-12">
//         <h1 className="text-4xl font-normal tracking-wide mb-4">
//           {data.personal_info?.full_name || "Your Name"}
//         </h1>

//         <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-600">
//           {data.personal_info?.email && <span>{data.personal_info.email}</span>}
//           {data.personal_info?.phone && <span>{data.personal_info.phone}</span>}
//           {data.personal_info?.location && <span>{data.personal_info.location}</span>}
//           {data.personal_info?.linkedin && (
//             <span className="break-all">{data.personal_info.linkedin}</span>
//           )}
//           {data.personal_info?.website && (
//             <span className="break-all">{data.personal_info.website}</span>
//           )}
//         </div>
//       </header>

//       {/* Professional Summary */}
//       {data.professional_summary && (
//         <section className="mb-12">
//           <p className="text-gray-700 text-[15px]">
//             {data.professional_summary}
//           </p>
//         </section>
//       )}

//       {/* Experience */}
//       {data.experience?.length > 0 && (
//         <section className="mb-12">
//           <h2
//             className="text-xs uppercase tracking-widest font-medium mb-6 pb-1 border-b"
//             style={{ borderColor: accentColor, color: accentColor }}
//           >
//             Experience
//           </h2>

//           <div className="space-y-8">
//             {data.experience.map((exp, index) => (
//               <div key={index}>
//                 <div className="flex justify-between items-baseline mb-1">
//                   <h3 className="text-lg font-medium text-gray-900">
//                     {exp.position}
//                   </h3>
//                   <span className="text-sm text-gray-500">
//                     {formatDate(exp.start_date)} –{" "}
//                     {exp.is_current ? "Present" : formatDate(exp.end_date)}
//                   </span>
//                 </div>

//                 <p className="text-gray-600 mb-2">{exp.company}</p>

//                 {exp.description && (
//                   <div className="text-gray-700 text-sm whitespace-pre-line">
//                     {exp.description}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </section>
//       )}

//       {/* Projects */}
//       {data.project?.length > 0 && (
//         <section className="mb-12">
//           <h2
//             className="text-xs uppercase tracking-widest font-medium mb-6 pb-1 border-b"
//             style={{ borderColor: accentColor, color: accentColor }}
//           >
//             Projects
//           </h2>

//           <div className="space-y-6">
//             {data.project.map((proj, index) => (
//               <div key={index}>
//                 <h3 className="text-lg font-medium text-gray-900 mb-1">
//                   {proj.name}
//                 </h3>
//                 <p className="text-gray-700 text-sm">
//                   {proj.description}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </section>
//       )}

//       {/* Education */}
//       {data.education?.length > 0 && (
//         <section className="mb-12">
//           <h2
//             className="text-xs uppercase tracking-widest font-medium mb-6 pb-1 border-b"
//             style={{ borderColor: accentColor, color: accentColor }}
//           >
//             Education
//           </h2>

//           <div className="space-y-6">
//             {data.education.map((edu, index) => (
//               <div key={index} className="flex justify-between items-baseline">
//                 <div>
//                   <h3 className="font-medium text-gray-900">
//                     {edu.degree} {edu.field && `in ${edu.field}`}
//                   </h3>
//                   <p className="text-gray-600">{edu.institution}</p>
//                   {edu.gpa && (
//                     <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>
//                   )}
//                 </div>

//                 <span className="text-sm text-gray-500">
//                   {formatDate(edu.graduation_date)}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </section>
//       )}

//       {/* Skills */}
//       {data.skills?.length > 0 && (
//         <section>
//           <h2
//             className="text-xs uppercase tracking-widest font-medium mb-6 pb-1 border-b"
//             style={{ borderColor: accentColor, color: accentColor }}
//           >
//             Skills
//           </h2>

//           <div className="flex flex-wrap gap-2">
//             {data.skills.map((skill, index) => (
//               <span
//                 key={index}
//                 className="text-sm px-3 py-1 rounded-full border text-gray-700"
//                 style={{ borderColor: accentColor }}
//               >
//                 {skill}
//               </span>
//             ))}
//           </div>
//         </section>
//       )}
//     </div>
//   );
// };

// export default MinimalTemplate;
