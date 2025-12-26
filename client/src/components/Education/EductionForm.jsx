import { GraduationCap, Plus, Trash2 } from "lucide-react";
import React from "react";

const EductionForm = ({ data, onChange }) => {
  function AddEduction() {
    const newEduction = {
      institution: "",
      degreee: "",
      field: "",
      graduation_date: "",
      gpa: "",
    };

    onChange([...data, newEduction]);
  }

  function removeEduction(index) {
    const updatedEducation = data.filter((_, i) => i !== index);
    onChange(updatedEducation);
  }

  //   function updateExperience(index,field,value) {
  // 	const updatedExperience = data.map((exp, i) =>
  // 			  i === index ? { ...exp, [field]: value } : exp
  // 	);
  // 	onChange(updatedExperience);
  //   }

  function updateEducation(index, field, value) {
    const updatedEduction = [...data];
    updatedEduction[index] = { ...updatedEduction[index], [field]: value };
    onChange(updatedEduction);
  }
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Education
          </h3>
          <p className="text-sm text-gray-400">Add your education details</p>
        </div>
        <button
          onClick={AddEduction}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
        >
          <Plus className="size-4" />
          ADD EDUCATION
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <GraduationCap className="w-12 h-12 mx-auto mb-3 text-gray-300 size-6 " />
          <p>No education added yet</p>
          <p className="text-sm">Click "Add Education" to get started</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((education, index) => {
            // console.log(education, index);
            return (
              <div
                key={index}
                className="p-4 border border-gray-200 rounded-lg space-y-3"
              >
                <div className="flex justify-between items-center">
                  <h4>Education #{index + 1}</h4>
                  <button onClick={() => removeEduction(index)}>
                    <Trash2 className="size-4" />
                  </button>
                </div>

                <div
                  className="grid
					 md:grid-cols-2 gap-3"
                >
                  <input
                    type="text"
                    value={education.institution || ""}
                    onChange={(e) =>
                      updateEducation(index, "institution", e.target.value)
                    }
                    placeholder="Institution Name"
                    className="px-3 py-2 text-sm rounded-lg"
                  />

                  <input
                    type="text"
                    value={education.degree || ""}
                    onChange={(e) =>
                      updateEducation(index, "degree", e.target.value)
                    }
                    placeholder="Degree"
                    className="px-3 py-2 text-sm rounded-lg"
                  />

                  <input
                    value={education.field || ""}
                    type="text"
                    onChange={(e) =>
                      updateEducation(index, "field", e.target.value)
                    }
                    placeholder="Field of Study"
                    className="px-3 py-2 text-sm rounded-lg"
                  />
                  <input
                    type="month"
					placeholder=""
                    value={education.graduation_date || ""}
                    onChange={(e) =>
                      updateEducation(index, "graduation_date", e.target.value)
                    }
                    className="px-3 py-2 text-sm rounded-lg disabled:bg-gray-100"
                  />

                  <input
                    value={education.gpa || ""}
                    type="text"
                    onChange={(e) =>
                      updateEducation(index, "gpa", e.target.value)
                    }
                    placeholder="GPA"
                    className="px-3 py-2 text-sm rounded-lg"
                  />
                </div>

                {/* <label htmlFor="" className="flex items-center gap-2">
                  <input
                    className="rounded border-gray-300 text-blue-500 focus:ring-blue-400"
                    type="checkbox"
                    checked={education.is_current}
                    onChange={(e) => {
                      updateEducation(
                        index,
                        "is_current",
                        e.target.checked ? true : false
                      );
                    }}
                  />

                  <span className="text-sm text-gray-700">
                    Currently Working Here
                  </span>
                </label> */}
                {/* <div className="space-y-2">
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

                </div> */}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default EductionForm;
