import { Plus, Trash2 } from "lucide-react";
import React from "react";

const ProjectForm = ({ data, onChange }) => {
  function AddProject() {
    const newProject = {
      name: "",
      type: "",
      description: "",
      projectLink: "",
    };
    onChange([...data, newProject]);
  }

  function removeProject(index) {
    const updatedProject = data.filter((_, i) => i !== index);
    onChange(updatedProject);
  }

  function updateProject(index, field, value) {
    const updatedProject = [...data];
    updatedProject[index] = { ...updatedProject[index], [field]: value };
    onChange(updatedProject);
  }
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Projects
          </h3>
          <p className="text-sm text-gray-400">Add your projects</p>
        </div>
        <button
          onClick={AddProject}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
        >
          <Plus className="size-4" />
          ADD PROJECT
        </button>
      </div>
      <div className="space-y-4 mt-6">
        {data.map((project, index) => {
          // console.log(education, index);
          return (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg space-y-3"
            >
              <div className="flex justify-between items-center">
                <h4>Project #{index + 1}</h4>
                <button onClick={() => removeProject(index)}>
                  <Trash2 className="size-4" />
                </button>
              </div>

              <div
                className="grid
					 md:grid-cols-2 gap-3"
              >
                <input
                  type="text"
                  value={project.name || ""}
                  onChange={(e) => updateProject(index, "name", e.target.value)}
                  placeholder="Project Name"
                  className="px-3 py-2 text-sm rounded-lg"
                />

                <input
                  type="text"
                  value={project.type || ""}
                  onChange={(e) => updateProject(index, "type", e.target.value)}
                  placeholder="Project Type"
                  className="px-3 py-2 text-sm rounded-lg"
                />

                <input
                  type="url"
                  value={project.projectLink || ""}
                  onChange={(e) =>
                    updateProject(index, "projectLink", e.target.value)
                  }
                  placeholder="Project Link (GitHub / Live URL)"
                  className="md:col-span-2 px-3 py-2 text-sm rounded-lg"
                />

                <textarea
                  rows={4}
                  value={project.description || ""}
                  onChange={(e) =>
                    updateProject(index, "description", e.target.value)
                  }
                  placeholder="Project Description"
                  className="
    md:col-span-2
    w-full
    px-3 py-2
    text-sm
    rounded-lg
    resize-none
    border border-gray-300
    focus:outline-none
    focus:ring-2
    focus:ring-purple-400
  "
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectForm;
