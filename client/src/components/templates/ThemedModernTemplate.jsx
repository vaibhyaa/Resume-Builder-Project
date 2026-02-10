import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ThemedModernTemplate = ({ data, accentColor = "#2563eb" }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-white text-gray-800 shadow-lg rounded-lg overflow-hidden print-container">
      {/* HEADER */}
      <header className="px-10 py-8 bg-gray-900 text-white relative">
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundColor: accentColor }}
        />
        <div className="relative z-10">
          <h1 className="text-4xl font-bold tracking-wide">
            {data.personal_info?.full_name || "Your Name"}
          </h1>
          <p className="uppercase tracking-widest text-sm text-gray-300 mt-1">
            {data.personal_info?.profession || "Profession"}
          </p>

          {/* CONTACT */}
          <div className="flex flex-wrap gap-6 mt-5 text-sm">
            {data.personal_info?.email && (
              <div className="flex items-center gap-2">
                <Mail size={14} /> {data.personal_info.email}
              </div>
            )}
            {data.personal_info?.phone && (
              <div className="flex items-center gap-2">
                <Phone size={14} /> {data.personal_info.phone}
              </div>
            )}
            {data.personal_info?.location && (
              <div className="flex items-center gap-2">
                <MapPin size={14} /> {data.personal_info.location}
              </div>
            )}
            {data.personal_info?.website && (
              <div className="flex items-center gap-2">
                <Globe size={14} /> {data.personal_info.website}
              </div>
            )}
            {data.personal_info?.linkedin && (
              <div className="flex items-center gap-2 break-all">
                <Linkedin size={14} /> {data.personal_info.linkedin}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* BODY */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-10 p-10">
        {/* LEFT SIDEBAR */}
        <aside className="space-y-8 md:border-r pr-0 md:pr-6">
          {/* SUMMARY */}
          {data.professional_summary && (
            <div>
              <h2
                className="text-lg font-semibold border-b pb-2 mb-3"
                style={{ borderColor: accentColor, color: accentColor }}
              >
                Profile
              </h2>
              <p className="text-sm leading-relaxed text-gray-700">
                {data.professional_summary}
              </p>
            </div>
          )}

          {/* SKILLS */}
          {data.skills?.length > 0 && (
            <div>
              <h2
                className="text-lg font-semibold border-b pb-2 mb-3"
                style={{ borderColor: accentColor, color: accentColor }}
              >
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                    style={{ backgroundColor: accentColor }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* EDUCATION */}
          {data.education?.length > 0 && (
            <div>
              <h2
                className="text-lg font-semibold border-b pb-2 mb-3"
                style={{ borderColor: accentColor, color: accentColor }}
              >
                Education
              </h2>
              <ul className="space-y-4">
                {data.education.map((edu, i) => (
                  <li key={i}>
                    <p className="font-semibold text-sm">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </p>
                    <p className="text-xs text-gray-500">{edu.institution}</p>
                    <p className="text-[11px] text-gray-500 mt-1">
                      {formatDate(edu.graduation_date)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>

        {/* RIGHT MAIN CONTENT */}
        <main className="md:col-span-2 space-y-10">
          {/* EXPERIENCE */}
          {data.experience?.length > 0 && (
            <section>
              <h2
                className="text-xl font-semibold mb-6 tracking-wide"
                style={{ color: accentColor }}
              >
                Experience
              </h2>

              <div className="space-y-6">
                {data.experience.map((exp, i) => (
                  <div key={i} className="relative border-l pl-6">
                    <span
                      className="absolute left-0 top-2 w-3 h-3 rounded-full"
                      style={{ backgroundColor: accentColor }}
                    />
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{exp.position}</h3>
                        <p className="text-sm text-gray-600">{exp.company}</p>
                      </div>
                      <span className="text-xs text-gray-500">
                        {formatDate(exp.start_date)} –{" "}
                        {exp.is_current ? "Present" : formatDate(exp.end_date)}
                      </span>
                    </div>
                    {exp.description && (
                      <p className="text-sm text-gray-700 whitespace-pre-line mt-2">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* PROJECTS */}
          {data.project?.length > 0 && (
            <section>
              <h2
                className="text-xl font-semibold mb-6 tracking-wide"
                style={{ color: accentColor }}
              >
                Projects
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {data.project.map((p, i) => (
                  <div
                    key={i}
                    className="bg-white p-5 rounded-lg shadow-sm border-t-4"
                    style={{ borderColor: accentColor }}
                  >
                    <h3 className="font-semibold">{p.name}</h3>
                    <p className="text-sm text-gray-600 mt-2">{p.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </section>
    </div>
  );
};

export default ThemedModernTemplate;
