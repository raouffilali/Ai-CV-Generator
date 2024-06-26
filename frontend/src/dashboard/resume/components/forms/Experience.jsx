import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import ReachTextEditor from "../ReachTextEditor";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import exp from "constants";

const formField = {
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  workSummery: "",
};

function Experience() {
  const [experienceList, setExperienceList] = useState([formField]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const handleInputChange = (event, index) => {
    const newEntries = experienceList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setExperienceList(newEntries);
  };

  const AddNewExperience = () => {
    setExperienceList([
      ...experienceList,
      {
        title: "",
        companyName: "",
        city: "",
        state: "",
        startDate: "",
        endDate: "",
        workSummery: "",
      },
    ]);
  };

  const RemoveNewExperience = () => {
    // ??Method 1
    // const list = [...experienceList]
    // list.pop()
    // setExperienceList(list)

    // ??Method 2
    setExperienceList(experienceList.slice(0, -1));
  };

  const handleRichTextEDitor = (e, name, index) => {
    const newEntries = experienceList.slice();
    newEntries[index][name] = e.target.value;
    setExperienceList(newEntries);
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      experience: experienceList,
    });
  }, [experienceList]);

  return (
    <div>
      <div className=" p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        {/* <ToastContainer /> */}
        <h2 className="font-bold text-lg">Professional Experience</h2>
        <p>Add Your previous Job experience</p>

        <div>
          {experienceList.map((item, index) => (
            <div key={index}>
              <div className=" grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                <div>
                  <label className="text-sm">Position Title</label>
                  <Input
                    name="title"
                    onChange={(e) => handleInputChange(e, index)}
                  />
                </div>
                <div>
                  <label className="text-sm">Company Name</label>
                  <Input
                    name="companyName"
                    onChange={(e) => handleInputChange(e, index)}
                  />
                </div>
                <div>
                  <label className="text-sm">City</label>
                  <Input
                    name="city"
                    onChange={(e) => handleInputChange(e, index)}
                  />
                </div>
                <div>
                  <label className="text-sm">State</label>
                  <Input
                    name="state"
                    onChange={(e) => handleInputChange(e, index)}
                  />
                </div>
                <div>
                  <label className="text-sm">Start Date</label>
                  <Input
                    name="startDate"
                    onChange={(e) => handleInputChange(e, index)}
                    type="date"
                  />
                </div>
                <div>
                  <label className="text-sm">End Date</label>
                  <Input
                    name="endDate"
                    onChange={(e) => handleInputChange(e, index)}
                    type="date"
                  />
                </div>
                <div className="col-span-2">
                  <ReachTextEditor
                    onRichTextEditorChange={(event) =>
                      handleRichTextEDitor(event, "workSummery", index)
                    }
                  />
                </div>
                {/* <div className="col-span-2">
                  <label className="text-sm">Work Summery</label>
                  <Input
                    name="workSummery"
                    onChange={(e) => handleInputChange(e, index)}
                  />
                </div> */}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="text-primary"
              onClick={AddNewExperience}
            >
              + Add More Experience
            </Button>
            {experienceList.length > 1 && (
              <Button
                variant="outline"
                className="text-primary"
                onClick={RemoveNewExperience}
              >
                - Remove
              </Button>
            )}
          </div>
          <Button type="submit">Save</Button>
        </div>
      </div>
    </div>
  );
}

export default Experience;
