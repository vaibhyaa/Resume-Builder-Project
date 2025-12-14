import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ModernTemplate = ({ data, accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="max-w-5xl mx-auto bg-zinc-50 text-zinc-800 shadow-lg rounded-xl overflow-hidden">
      {/* HERO HEADER */}
      <div className="relative px-10 py-12 bg-linear-to-r from-zinc-900 to-zinc-800 text-white">
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundColor: accentColor }}
        />

        <h1 className="text-4xl font-semibold tracking-wide relative z-10">
          {data.personal_info?.full_name || "Your Name"}
        </h1>
        <p className="text-sm uppercase tracking-widest mt-2 text-zinc-300 relative z-10">
          {data.personal_info?.profession || "Profession"}
        </p>

        {/* CONTACT STRIP */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm relative z-10">
          {data.personal_info?.email && (
            <div className="flex items-center gap-2">
              <Mail size={14} />
              <span>{data.personal_info.email}</span>
            </div>
          )}
          {data.personal_info?.phone && (
            <div className="flex items-center gap-2">
              <Phone size={14} />
              <span>{data.personal_info.phone}</span>
            </div>
          )}
          {data.personal_info?.location && (
            <div className="flex items-center gap-2">
              <MapPin size={14} />
              <span>{data.personal_info.location}</span>
            </div>
          )}
          {data.personal_info?.website && (
            <div className="flex items-center gap-2">
              <Globe size={14} />
              <span>{data.personal_info.website}</span>
            </div>
          )}
          {data.personal_info?.linkedin && (
            <div className="flex items-center gap-2">
              <Linkedin size={14} />
              <span className="break-all">
                {data.personal_info.linkedin.replace("https://", "")}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* BODY */}
      <div className="p-10 space-y-10">
        {/* SUMMARY CARD */}
        {data.professional_summary && (
          <section className="bg-white rounded-lg p-6 shadow-sm border-l-4"
            style={{ borderColor: accentColor }}
          >
            <h2 className="text-lg font-semibold mb-3">Profile</h2>
            <p className="text-sm leading-relaxed text-zinc-700">
              {data.professional_summary}
            </p>
          </section>
        )}

        {/* EXPERIENCE TIMELINE */}
        {data.experience?.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold mb-6">Experience</h2>

            <div className="space-y-8">
              {data.experience.map((exp, index) => (
                <div key={index} className="relative pl-8">
                  <span
                    className="absolute left-0 top-2 w-3 h-3 rounded-full"
                    style={{ backgroundColor: accentColor }}
                  />

                  <div className="bg-white rounded-lg p-5 shadow-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-zinc-900">
                          {exp.position}
                        </h3>
                        <p
                          className="text-sm font-medium"
                          style={{ color: accentColor }}
                        >
                          {exp.company}
                        </p>
                      </div>
                      <span className="text-xs text-zinc-500">
                        {formatDate(exp.start_date)} –{" "}
                        {exp.is_current ? "Present" : formatDate(exp.end_date)}
                      </span>
                    </div>

                    {exp.description && (
                      <p className="text-sm text-zinc-700 mt-3 whitespace-pre-line">
                        {exp.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* PROJECTS */}
        {data.project?.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold mb-6">Projects</h2>

            <div className="grid sm:grid-cols-2 gap-6">
              {data.project.map((p, index) => (
                <div
                  key={index}
                  className="bg-white p-5 rounded-lg shadow-sm border-t-4"
                  style={{ borderColor: accentColor }}
                >
                  <h3 className="font-semibold text-zinc-900">{p.name}</h3>
                  {p.description && (
                    <p className="text-sm text-zinc-700 mt-2">
                      {p.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* EDUCATION + SKILLS */}
        <div className="grid sm:grid-cols-2 gap-10">
          {data.education?.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold mb-4">Education</h2>
              <div className="space-y-4">
                {data.education.map((edu, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="font-semibold">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </h3>
                    <p
                      className="text-sm font-medium"
                      style={{ color: accentColor }}
                    >
                      {edu.institution}
                    </p>
                    <p className="text-xs text-zinc-500 mt-1">
                      {formatDate(edu.graduation_date)}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.skills?.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full text-xs font-medium text-white"
                    style={{ backgroundColor: accentColor }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;
