import React, { useState } from "react";
import PersonalDetail from "./forms/PersonalDetail";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, LayoutGrid } from "lucide-react";
import Summery from "./forms/Summery";
import Experience from "./forms/Experience";
import Education from "./forms/Education";
import Skills from "./forms/Skills";
import { Navigate, useParams } from "react-router-dom";

function FormSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(false);
  const {resumeId} = useParams()

  return (
    <div>
      <div className="flex justify-between items-center">
        <Button variant="outline" size="sm" className="flex gap-2">
          {" "}
          <LayoutGrid /> Theme
        </Button>
        <div className="flex gap-2">
          {activeFormIndex > 1 && (
            <Button
              size="sm"
              className="flex gap-2"
              onClick={() => setActiveFormIndex(activeFormIndex - 1)}
            >
              <ArrowLeft />
              Back
            </Button>
          )}
          <Button
            className="flex gap-2"
            size="sm"
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}
            disabled={!enableNext}
          >
            Next <ArrowRight />{" "}
          </Button>
        </div>
      </div>
      {/* Personal details the   summary */}
      {activeFormIndex == 1 ? (
        <PersonalDetail
          style={"sticky top-0"}
          enableNext={(v) => setEnableNext(v)}
        />
      ) : activeFormIndex == 2 ? (
        <Summery style={"sticky top-0"} enableNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex == 3 ? (
        <Experience
          style={"sticky top-0"}
          enableNext={(v) => setEnableNext(v)}
        />
      ) : activeFormIndex == 4 ? (
        <Education
          style={"sticky top-0"}
          enableNext={(v) => setEnableNext(v)}
        />
      ) : activeFormIndex == 5 ? (
        <Skills style={"sticky top-0"} />
      ) : activeFormIndex == 6 ? (
        <Navigate to={`/my-resume/${resumeId}/view`} />
      ) : null}

      {/* Experience */}

      {/* Education */}

      {/* Skills */}
    </div>
  );
}

export default FormSection;
