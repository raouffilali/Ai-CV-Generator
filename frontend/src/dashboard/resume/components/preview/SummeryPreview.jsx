import React from "react";

function SummeryPreview({ resumeInfo }) {
  return <p className="text-xs lg:text-sm">{resumeInfo?.summery}</p>;
}

export default SummeryPreview;
