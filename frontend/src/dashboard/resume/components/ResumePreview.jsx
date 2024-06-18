import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext } from "react";
import PersonalDetailPreview from "./preview/PersonalDetailPreview";
import SummeryPreview from "./preview/SummeryPreview";
import ExperiencePreview from "./preview/ExperiencePreview";
import EducationalPreview from "./preview/EducationalPreview";
import SKillPreview from "./preview/SKillPreview";

function ResumePreview() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  return (
    <div
      className="shadow-lg h-full p-14 border-t-[20px]"
      style={{
        borderColor: resumeInfo?.themeColor,
      }}
    >
      {/* Personal Details */}
      <PersonalDetailPreview resumeInfo={resumeInfo} />

      {/* Summary */}
      <SummeryPreview resumeInfo={resumeInfo} />

      {/* Professional Experience  */}
      <ExperiencePreview resumeInfo={resumeInfo} />

      {/* Education  */}
      <EducationalPreview resumeInfo={resumeInfo} />

      {/* Skills  */}
      <SKillPreview resumeInfo={resumeInfo} />
    </div>
  );
}

export default ResumePreview;
