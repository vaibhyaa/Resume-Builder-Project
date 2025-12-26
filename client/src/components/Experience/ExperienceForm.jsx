import { Briefcase, Plus, Sparkles, Trash2 } from "lucide-react";
import React from "react";

const ExperienceForm = ({ data, onChange }) => {
  function addExperience() {
    const newExperience = {
      company: "",
      position: "",
      start_date: "",
      end_date: "",
      description: "",
      is_current: false,
    };

    onChange([...data, newExperience]);
  }

  function removeExperience(index) {
    const updatedExperience = data.filter((_, i) => i !== index);
    onChange(updatedExperience);
  }

  //   function updateExperience(index,field,value) {
  // 	const updatedExperience = data.map((exp, i) =>
  // 			  i === index ? { ...exp, [field]: value } : exp
  // 	);
  // 	onChange(updatedExperience);
  //   }

  function updateExperience(index, field, value) {
    const updatedExperience = [...data];
    updatedExperience[index] = { ...updatedExperience[index], [field]: value };
    onChange(updatedExperience);
  }
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Experience
          </h3>
          <p className="text-sm text-gray-400">Add your jobexperience</p>
        </div>
        <button
          onClick={addExperience}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
        >
          <Plus className="size-4" />
          ADD EXPERIENCE
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Briefcase className="w-12 h-12 mx-auto mb-3 text-gray-300 size-6 " />
          <p>No work experience added yet</p>
          <p className="text-sm">Click "Add Experience" to get started</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((exp, index) => {
            // console.log(exp, index);
            return (
              <div
                key={index}
                className="p-4 border border-gray-200 rounded-lg space-y-3"
              >
                <div className="flex justify-between items-center">
                  <h4>Experience #{index + 1}</h4>
                  <button onClick={() => removeExperience(index)}>
                    <Trash2 className="size-4" />
                  </button>
                </div>

                <div
                  className="grid
					 md:grid-cols-2 gap-3"
                >
                  <input
                    type="text"
                    value={exp.company || ""}
                    onChange={(e) =>
                      updateExperience(index, "company", e.target.value)
                    }
                    placeholder="Company Name"
                    className="px-3 py-2 text-sm rounded-lg"
                  />

                  <input
                    type="text"
                    value={exp.position || ""}
                    onChange={(e) =>
                      updateExperience(index, "position", e.target.value)
                    }
                    placeholder="Job Title/Position"
                    className="px-3 py-2 text-sm rounded-lg"
                  />

                  <input
                    type="month"
                    value={exp.start_date || ""}
                    onChange={(e) =>
                      updateExperience(index, "start_date", e.target.value)
                    }
                    className="px-3 py-2 text-sm rounded-lg"
                  />

                  {/* <div>
                    <label htmlFor="date">When did you go to {cityName}?</label>
                    <DatePicker
                      id="date"
                      className="px-3 py-2 text-sm rounded-lg"
                      selected={exp.startDate || ""}
                      onChange={(e) =>
                        updateExperience(index, "startDate", e.target.value)
                      }
                      dateFormat="dd/MM/yyyy"
                    />
                  </div> */}

                  <input
                    type="month"
                    value={exp.end_date || ""}
                    onChange={(e) =>
                      updateExperience(index, "end_date", e.target.value)
                    }
                    disabled={exp.is_current}
                    className="px-3 py-2 text-sm rounded-lg disabled:bg-gray-100"
                  />

                  {/* <input
                  type="text"
                  value={exp.description || ""}
                  onChange={(e) =>
                    updateExperience(index, "description", e.target.value)
                  }
                  placeholder="Company Name"
                  className="px-3 py-2 text-sm rounded-lg"
                /> */}
                </div>
                <label htmlFor="" className="flex items-center gap-2">
                  <input
                    className="rounded border-gray-300 text-blue-500 focus:ring-blue-400"
                    type="checkbox"
                    checked={exp.is_current}
                    onChange={(e) => {
                      updateExperience(
                        index,
                        "is_current",
                        e.target.checked ? true : false
                      );
                    }}
                  />

                  <span className="text-sm text-gray-700">
                    Currently Working Here
                  </span>
                </label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label
                      className="text-sm font-medium text-gray-600"
                      htmlFor=""
                    >
                      Job Description
                    </label>
                    <button className="flex items-center gap-1 px-2 py-1 text-xs bg-purple-600 rounded hover:bg-purple-200 transition-colors disabled:opacity-50">
                      <Sparkles className="w-3 h-3" />
                      Enhance with AI
                    </button>
                  </div>
                  <textarea
                    rows={4}
                    value={exp.description || ""}
                    onChange={(e) =>
                      updateExperience(index, "description", e.target.value)
                    }
                    className="w-full text-sm px-3 py-2 rounded-lg resize-none
             border border-gray-300 focus:ring-2 focus:ring-purple-400"
                    placeholder="Describe your responsibilities and achievements"
                  />

                  {/* <textarea
                    rows={4}
                    value={exp.description || ""}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      updateExperience(index, "description", e.target.value);
                      if (checked) {
                        updateExperience(index, "endDate", "");
                      }
                    }}
                    className="w-full text-sm px-3 py-2 rounded-lg resize-none"
                    placeholder="Describe and achievements"
                  /> */}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ExperienceForm;
