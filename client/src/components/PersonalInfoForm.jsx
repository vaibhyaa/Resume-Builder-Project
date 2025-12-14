// import {
//   BriefcaseBusiness,
//   Globe,
//   Key,
//   Linkedin,
//   Mail,
//   MapPin,
//   Phone,
//   User,
//   UserIcon,
// } from "lucide-react";
// import React from "react";

// const PersonalInfoForm = ({
//   data,
//   onChange,
//   removeBackground,
//   setremoveBackground,
// }) => {
//   console.log(data);

//   function handleChange(field, value) {
//     onChange({ ...data, [field]: value });
//   }

//   const fields = [
//     {
//       Key: "full_name",
//       label: "Full Name",
//       icon: User,
//       type: "text",
//       required: true,
//     },
//     {
//       Key: "email",
//       label: "Email Address",
//       icon: Mail,
//       type: "email",
//       required: true,
//     },
//     {
//       Key: "phone",
//       label: "Phone Naumber",
//       icon: Phone,
//       type: "tel",
//       required: true,
//     },
//     {
//       Key: "location",
//       label: "Location",
//       icon: MapPin,
//       type: "text",
//       required: true,
//     },
//     {
//       Key: "profession",
//       label: "Profession",
//       icon: BriefcaseBusiness,
//       type: "text",
//       required: true,
//     },
//     { Key: "linkedin", label: "Linkedin Profile", icon: Linkedin, type: "url" },
//     { Key: "website", label: "Personal Website", icon: Globe, type: "url" },
//   ];
//   return (
//     <div>
//       <h3 className="text-lg fonr-semibold text-gray-800">
//         Personal Information
//       </h3>
//       <p className="text-sm text-gray-700">
//         Get Started with the personal Information
//       </p>
//       <div className="flex items-center gap-2">
//         <label>
//           {data.image ? (
//             <img
//               src={
//                 typeof data.image == "string"
//                   ? data.image
//                   : URL.createObjectURL(data.image)
//               }
//               alt="user-image"
//               className="w-16 h-16 rounded-full object-cover mt-5 ring ring-slate-300 hover:opacity-85"
//             />
//           ) : (
//             <div className="inline-flex items-center gap-2 mt-5 text-slate-600 hover:text-slate-700 cursor-pointer">
//               <UserIcon className="size-10 p-2.5 border rounded-full" />
//               Upload use Image
//             </div>
//           )}
//           <input
//             type="file"
//             accept="image/jpeg, image/png"
//             className="hidden"
//             onChange={(e) => handleChange("image", e.target.files[0])}
//           />
//         </label>
//         {typeof data.image === "object" && (
//           <div className="flex flex-col gap-1 pl-4 text-sm">
//             <p>Remove Background</p>
//             <label className="relative inline-flex items-center cursor-pointer text-gray-800 gap-3">
//               <input
//                 type="checkbox"
//                 className="sr-only peer"
//                 checked={removeBackground}
//                 onChange={() => {
//                   setremoveBackground((preV) => !preV);
//                 }}
//               />
//               <div className="w-9 h-5 bg-gray-300 rounded-full peer-checked:bg-blue-500 transition-colors"></div>
//               <span className="dot absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-4"></span>
//             </label>
//           </div>
//         )}
//       </div>
//       {fields.map((eachField) => {
//         const Icon = eachField.icon;
//         return (
//           <div key={eachField.Key} className="space-y-2 mt-5">
//             <label
//               htmlFor=""
//               className="flex items-center gap-2.5 text-sm font-medium text-gray-600"
//             >
//               <Icon className="size-4" />
//               {eachField.label}
//               {eachField.required && <span className="text-red-500">*</span>}
//             </label>
//             <input
//               className="mt-1 w-full px-3 py-2 border border-gray-400 rounded-lg focus:ring focus:ring-blue-400 outline-none transition-colors text-sm"
//               placeholder={`Enter Your ${eachField.label.toLowerCase()}`}
//               required={eachField.required}
//               type={eachField.type}
//               value={data[eachField.Key] || ""}
//               onChange={(e) => {
//                 handleChange(eachField.Key, e.target.value);
//               }}
//             />
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default PersonalInfoForm;

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
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const fields = [
    {
      key: "full_name",
      label: "Full Name",
      icon: User,
      type: "text",
      required: true,
    },
    // {
    //   key: "email",
    //   label: "Email Address",
    //   icon: Mail,
    //   type: "email",
    //   required: true,
    // },
    {
      key: "email",
      label: "Email Address",
      icon: Mail,
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
