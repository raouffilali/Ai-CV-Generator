import React from "react";

function ExperiencePreview({ resumeInfo }) {
  return (
    <div className="my-6">
      <h2
        className="lg:text-lg text-sm text-center mb-2 font-bold"
        style={{
          color: resumeInfo?.themeColor,
        }}
      >
        Professional Experience
      </h2>
      <hr
        style={{
          borderColor: resumeInfo?.themeColor,
        }}
      />

      {resumeInfo?.experience.map((exp, index) => (
        <div key={index} className="my-5">
          <h1
            className="text-lg font-bold"
            style={{
              color: resumeInfo?.themeColor,
            }}
          >
            {exp?.title}
          </h1>
          <h1 className="text-sm flex justify-between font-semibold text-gray-500 ">
            {exp?.companyName}, {exp?.city}, {exp?.state}
            <span className="text-sm italic ">
              {exp?.startDate} -{" "}
              {exp?.currentlyWorking ? "Present" : exp?.endDate}
            </span>
          </h1>
          {exp?.workSummery.split("• ").map((line, index) => (
            <p key={index} className="text-sm">
              • {line}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}

export default ExperiencePreview;
