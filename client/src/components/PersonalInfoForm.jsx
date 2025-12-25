
import {
  BriefcaseBusiness,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  User,
  UserIcon,
} from "lucide-react";
import React from "react";

const PersonalInfoForm = ({
  data,
  onChange,
  removeBackground,
  setremoveBackground,
}) => {
  const handleChange = (fieldkey, value) => {
    // console.log(data);
    onChange({ ...data, [fieldkey]: value });
  };

  const fields = [
    {
      key: "full_name",
      label: "Full Name",
      icon: User,
      type: "text",
      required: true,
    },
    {
      key: "email",
      label: "Email Address",
      icon: Mail,
      type:'email',
      required: true,
    },

    {
      key: "phone",
      label: "Phone Number",
      icon: Phone,
      type: "tel",
      required: true,
    },
    {
      key: "location",
      label: "Location",
      icon: MapPin,
      type: "text",
      required: true,
    },
    {
      key: "profession",
      label: "Profession",
      icon: BriefcaseBusiness,
      type: "text",
      required: true,
    },
    {
      key: "linkedin",
      label: "LinkedIn Profile",
      icon: Linkedin,
      type: "url",
    },
    {
      key: "website",
      label: "Personal Website",
      icon: Globe,
      type: "url",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800">
          Personal Information
        </h3>
        <p className="text-sm text-gray-500">
          Provide your basic details to get started
        </p>
      </div>

      {/* Profile Image */}
      <div className="flex items-start gap-5">
        <label className="cursor-pointer group">
          {data.image ? (
            <img
              src={
                typeof data.image === "string"
                  ? data.image
                  : URL.createObjectURL(data.image)
              }
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover
                         ring-2 ring-gray-300
                         group-hover:opacity-90 transition"
            />
          ) : (
            <div
              className="w-16 h-16 flex items-center justify-center
                         rounded-full border border-dashed
                         text-gray-500 group-hover:text-gray-700
                         transition"
            >
              <UserIcon className="size-7" />
            </div>
          )}
          <input
            type="file"
            accept="image/png, image/jpeg"
            className="hidden"
            onChange={(e) => handleChange("image", e.target.files[0])}
          />
          <p className="mt-1 text-xs text-center text-gray-500">Upload photo</p>
        </label>

        {/* Remove Background Toggle */}
        {typeof data.image === "object" && (
          <div className="flex flex-col gap-2 text-sm">
            <span className="font-medium text-gray-700">Remove Background</span>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={removeBackground}
                onChange={() => setremoveBackground((prev) => !prev)}
              />
              <div
                className="w-10 h-5 bg-gray-300 rounded-full
                           peer-checked:bg-blue-500 transition-colors"
              />
              <span
                className="absolute left-1 top-1 w-3 h-3 bg-white
                           rounded-full transition-transform
                           peer-checked:translate-x-5"
              />
            </label>
          </div>
        )}
      </div>

      {/* Inputs */}
      <div className="space-y-5">
        {fields.map((field) => {
          const Icon = field.icon;
          

          return (
            <div key={field.key} className="space-y-1">
              <label
                htmlFor={field.key}
                className="flex items-center gap-2 text-sm font-medium text-gray-700"
              >
                <Icon className="size-4 text-gray-500" />
                {field.label}
                {field.required && <span className="text-red-500">*</span>}
              </label>

              <input
                id={field.key}
                type={field.type}
                required={field.required}
                value={data[field.key] || ""}
                placeholder={`Enter your ${field.label.toLowerCase()}`}
                onChange={(e) => handleChange(field.key, e.target.value)}
                className="w-full px-3 py-2 text-sm
                           border border-gray-300 rounded-lg
                           focus:ring-2 focus:ring-blue-500
                           focus:border-blue-500
                           outline-none transition"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PersonalInfoForm;
