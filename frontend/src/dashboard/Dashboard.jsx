import React, { useEffect, useState } from "react";
import AddResume from "./components/AddResume";
import GlobaleApi from "../../service/GlobaleApi";
import { useUser } from "@clerk/clerk-react";
import ResumeCardItem from "./components/ResumeCardItem";

function Dashboard() {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);

  /**
   * Used to get the list of resumes for the user
   */
  const GetResumesList = () => {
    GlobaleApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress)
      .then((res) => {
        console.log(res.data);
        setResumeList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        throw new Error(err);
      });
  };

  useEffect(() => {
    user && GetResumesList();
  }, [user]);

  return (
    <div className="p-10 md:px-20 lg:px-32">
      <h2 className="font-bold text-3xl">My Resume</h2>
      <p>Start Creating AI CV for your next Job role ✨</p>
      <div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5
      mt-10
      "
      >
        <AddResume />
        {resumeList.length > 0
          ? resumeList.map((resume, index) => (
              <ResumeCardItem
                resume={resume}
                key={index}
                refreshData={GetResumesList}
              />
            ))
          : [1, 2, 3, 4].map((item, index) => (
              <div className="h-[280px] rounded-lg bg-slate-200 animate-pulse"></div>
            ))}
      </div>
    </div>
  );
}

export default Dashboard;
