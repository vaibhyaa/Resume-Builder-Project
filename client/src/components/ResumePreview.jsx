import React, { useMemo } from "react";
import ClassicTemplate from "./templates/ClassicTemplate";
import MinimalImageTemplate from "./templates/MinimalImageTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";
import ModernTemplate from "./templates/ModernTemplate";
import { Accessibility } from "lucide-react";
import ThemedModernTemplate from "./templates/ThemedModernTemplate";

const TEMPLATE_MAP = {
  classic: ClassicTemplate,
  modern: ModernTemplate,
  minimal: MinimalTemplate,
  minimalImage: MinimalImageTemplate,
  themedModern: ThemedModernTemplate,
};

const ResumePreview = ({
  data,
  template = "classic",
  accentColor,
  classes = "",
}) => {
  console.log(data);

  // const renderTemplate = () => {
  //   switch (template) {
  //     case "modern":
  //       return <ModernTemplate data={data} accentColor={accentColor} />;
  //     case "minimal":
  //       return <MinimalTemplate data={data} accentColor={accentColor} />;
  //     case "minimalImage":
  //       return <MinimalImageTemplate data={data} accentColor={accentColor} />;
  //     case "themedModern":
  //       return <ThemedModernTemplate data={data} accentColor={accentColor} />;
  //     default:
  //       return <ClassicTemplate data={data} accentColor={accentColor} />;
  //   }
  // };

  const SelectedTemplate = useMemo(() => {
    return TEMPLATE_MAP[template] || ClassicTemplate;
  }, [template]);

  return (
    <div className="w-full bg-gray-200">
      <div
        id="resume-preview"
        className={
          "border border-gray-200 print:shadow-none print:border-neutral-50" +
          classes
        }
      >
        {/* {renderTemplate()} */}

        <SelectedTemplate data={data} accentColor={accentColor} />

        <style jsx>{`
          @page {
            size: letter;
            margin: 0;
          }

          @media print {
            html,
            body {
              width: 8.5in;
              height: 11in;
              overflow: hidden;
            }

            body * {
              visibility: hidden;
            }

            #resume-preview,
            #resume-preview * {
              visibility: visible;
            }

            #resume-preview {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              margin: 0;
              padding: 0;
              box-shadow: none !important;
              border: none !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default ResumePreview;

// Different version of component
// {================================================================================================}
// import React, { useMemo } from "react";
// import ClassicTemplate from "./templates/ClassicTemplate";
// import MinimalImageTemplate from "./templates/MinimalImageTemplate";
// import MinimalTemplate from "./templates/MinimalTemplate";
// import ModernTemplate from "./templates/ModernTemplate";
// import ThemedModernTemplate from "./templates/ThemedModernTemplate";

// const TEMPLATE_MAP = {
//   classic: ClassicTemplate,
//   modern: ModernTemplate,
//   minimal: MinimalTemplate,
//   minimalImage: MinimalImageTemplate,
//   themedModern: ThemedModernTemplate,
// };

// const ResumePreview = ({
//   data,
//   template = "classic",
//   accentColor,
//   classes = "",
// }) => {
//   const SelectedTemplate = useMemo(() => {
//     return TEMPLATE_MAP[template] || ClassicTemplate;
//   }, [template]);

//   return (
//     <div className="w-full bg-gray-200 flex justify-center">
//       <div
//         id="resume-preview"
//         className={`border border-gray-200 bg-white shadow-sm print:shadow-none print:border-none ${classes}`}
//       >
//         <SelectedTemplate
//           data={data}
//           accentColor={accentColor}
//         />

//         {/* Print Styles */}
//         <style jsx>{`
//           @page {
//             size: letter;
//             margin: 0;
//           }

//           @media print {
//             html,
//             body {
//               width: 8.5in;
//               height: 11in;
//               margin: 0;
//               padding: 0;
//               overflow: hidden;
//             }

//             body * {
//               visibility: hidden;
//             }

//             #resume-preview,
//             #resume-preview * {
//               visibility: visible;
//             }

//             #resume-preview {
//               position: absolute;
//               inset: 0;
//               width: 100%;
//               height: 100%;
//               margin: 0;
//               padding: 0;
//               box-shadow: none !important;
//             }
//           }
//         `}</style>
//       </div>
//     </div>
//   );
// };

// export default ResumePreview;
