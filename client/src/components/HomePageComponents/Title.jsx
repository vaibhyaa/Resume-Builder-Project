import React from "react";

const Title = ({ title, description }) => {
  return (
    <div className="text-center mt-6 text-slate-800">
      <h2 className="text-3xl sm:text-4xl font-medium">{title}</h2>
      {/* <h2 className="text-3xl sm:text-4xl font-medium">here is title </h2> */}

      <p className="max-sm max-w-2xl mt-4 text-slate-600">{description}</p>
      {/* <p className="max-sm max-w-2xl mt-4 text-slate-600">
        here it is description
      </p> */}
    </div>
  );
};

export default Title;
