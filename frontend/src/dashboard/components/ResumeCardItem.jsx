import { Notebook } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

function ResumeCardItem({ resume }) {
  console.log(resume);
  return (
    <div className="hover:shadow-xl hover:scale-105 transition duration-300 ease-in-out">
      <Link to={`/dashboard/resume/${resume.documentId}/edit`}>
        <div
          className="p-14  bg-gradient-to-b
          from-pink-100 via-purple-200 to-blue-200
        h-[280px] 
          rounded-t-lg border-t-4 "
          style={{
            borderColor: resume?.themeColor,
          }}
        >
          {/* <Notebook size={100} /> */}
          <div
            className="flex 
        items-center justify-center h-[180px] "
          >
            {/* <Notebook/> */}
            <img src="/cv.png" width={80} height={80} />
          </div>
        </div>
        {/* <h2 className="text-center my-1">{resume.title}</h2> */}
      </Link>
      <div
        className="border p-3 flex justify-between  text-black rounded-b-lg shadow-lg"
        style={{
          background: resume?.themeColor,
        }}
      >
        <h2 className="text-sm">{resume.title}</h2>
      </div>
    </div>
  );
}

export default ResumeCardItem;
