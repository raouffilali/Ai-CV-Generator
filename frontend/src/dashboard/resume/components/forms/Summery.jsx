import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext, useEffect, useState } from "react";
import { Bounce, Slide, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import GlobaleApi from "../../../../../service/GlobaleApi";
import { Brain, LoaderCircle } from "lucide-react";
import { AiChatSession } from "../../../../../service/AiModel";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const promt =
  "Job Title: {jobTitle}, Provide a summary for my resume in JSON format. The JSON should be an array of objects, each containing 'experienceLevel' and 'summary' fields. Include summaries for Fresher, Mid-Level, and Experienced levels.";

function Summery({ enableNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summery, setSummery] = useState();
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [aiGeneratedSummeryList, setAiGenerateSummeryList] = useState([]);
  const [aiButtonClickCount, setAiButtonClickCount] = useState(0);

  useEffect(() => {
    if (summery) {
      setResumeInfo({
        ...resumeInfo,
        summery: summery,
      });
    }
  }, [summery]);

  const GenerateSummeryFromAi = async () => {
    if (aiButtonClickCount < 3) {
      setLoading(true);
      const PROMT = promt.replace("{jobTitle}", resumeInfo?.jobTitle);
      console.log(PROMT);

      try {
        const result = await AiChatSession.sendMessage(PROMT);
        const responseText = await result.response.text();
        console.log(responseText);

        // Attempt to parse the response text as JSON
        try {
          const parsedResult = JSON.parse(responseText);
          if (Array.isArray(parsedResult)) {
            setAiGenerateSummeryList(parsedResult);
          } else {
            console.error("Parsed response is not an array:", parsedResult);
            toast.error("Unexpected AI response format");
          }
        } catch (jsonError) {
          console.error("Error parsing AI response:", jsonError);
          toast.error(
            "Failed to generate summary from AI. Invalid JSON format."
          );
        }
      } catch (error) {
        console.error("Error fetching AI response:", error);
        toast.error("Failed to generate summary from AI");
      } finally {
        setLoading(false);
      }
      setAiButtonClickCount(aiButtonClickCount + 1);
      console.log(aiButtonClickCount);
    } else {
      // Show a toast message to upgrade the account
      toast.warn(
        "You have reached the limit. Please upgrade your account to continue using this feature.",
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
  };

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      data: {
        summery: summery,
      },
    };
    GlobaleApi.updateResumeDetail(params?.resumeId, data)
      .then((res) => {
        console.log(res);
        enableNext(true);
        setLoading(false);
        toast.success("Summery updated successfully", {
          position: "bottom-left",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Slide,
        });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error("Something went wrong", {
          position: "bottom-left",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Slide,
        });
      });
  };

  return (
    <div>
      <div className=" p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <ToastContainer />
        <h2 className="font-bold text-lg">Summery Details</h2>
        <p>Add Summery for your job title</p>

        <form className="mt-7" onSubmit={onSave}>
          <div className="flex justify-between items-end">
            <label className="font-bold">Add Summery</label>
            <Button
              type="button"
              className="bg-gradient-to-r from-[#9f5bff] to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-white"
              size="sm"
              variant="outline"
              onClick={() => GenerateSummeryFromAi()}
            >
              <Brain size={20} className="mr-2" />
              Generate from AI ✨
            </Button>
          </div>
          <Textarea
            value={summery}
            className="mt-5 h-[150px] "
            required
            disabled={loading}
            onChange={(e) => setSummery(e.target.value)}
            defaultValue={summery ? summery : resumeInfo?.summery}
            placeholder="Click on the button to generate summery from AI or write your own summery here."
          />
          <div className="mt-2 flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? (
                <LoaderCircle size={20} className="animate-spin" />
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </form>
      </div>

      {aiGeneratedSummeryList.length > 0 && (
        <div className="my-7">
          <h2 className="font-bold text-lg mb-7">
            Suggestions for: <span className="italic text-primary">{resumeInfo?.jobTitle} </span>
          </h2>
          {aiGeneratedSummeryList.map((item, index) => (
            <div key={index} className="relative inline-flex  group">
              <div className="absolute transitiona-all duration-1000 opacity-20 -inset-px bg-gradient-to-r from-[#9f5bff] to-blue-500 rounded-sm blur-lg group-hover:opacity-75 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
              <div
                key={index}
                onClick={() => setSummery(item?.summary)}
                className="p-5 shadow-lg my-4  cursor-pointer relative  items-center justify-center px- py-2 text-lg font-bold text-white transition-all duration-200 bg-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-900"
              >
                <h2 className="font-bold my-1 text-primary">
                  Level: {item?.experienceLevel}
                </h2>
                <p>{item?.summary}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Summery;
