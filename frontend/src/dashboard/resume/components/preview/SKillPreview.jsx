import React from "react";

function SKillPreview({ resumeInfo }) {
  return (
    <div>
      <h2
        className="lg:text-lg text-sm text-center mb-2 font-bold"
        style={{
          color: resumeInfo?.themeColor,
        }}
      >
        Skills
      </h2>
      <hr
        style={{
          borderColor: resumeInfo?.themeColor,
        }}
      />
      <div className="grid grid-cols-2 gap-3 my-4">
        {resumeInfo?.skills.map((skill, index) => (
          <div key={index} className="flex items-center justify-between">
            <h2 className="text-sm">{skill?.name}</h2>
            <div className="h-2 bg-gray-200 w-[120px]">
              <div
                className="h-2"
                style={{
                  width: skill?.rating*20 + "%",
                  backgroundColor: resumeInfo?.themeColor,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SKillPreview;
