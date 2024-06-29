import React from "react";

function EducationalPreview({ resumeInfo }) {
  return (
    <div>
      <h2
        className="lg:text-lg text-sm text-center mb-2 font-bold"
        style={{
          color: resumeInfo?.themeColor,
        }}
      >
        Education
      </h2>
      <hr
        style={{
          borderColor: resumeInfo?.themeColor,
        }}
      />

      {resumeInfo?.education.map((edu, index) => (
        <div key={index} className="my-5">
          <h2
            className="text-lg font-bold"
            style={{
              color: resumeInfo?.themeColor,
            }}
          >
            {edu?.universityName}
          </h2>
          <h2 className="text-sm flex justify-between font-semibold text-gray-500 ">
            {edu?.degree} in {edu?.major}
            <span className="text-sm italic">
              {edu?.startDate} - {edu?.endDate}
            </span>
          </h2>
          <p className="text-sm my-2 w-full">{edu?.description}</p>
        </div>
      ))}
    </div>
  );
}

export default EducationalPreview;
