import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { data } from "autoprefixer";
import React, { useContext, useEffect, useState } from "react";
import { Bounce, Slide, toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import GlobaleApi from "../../../../../service/GlobaleApi";
import { LoaderCircle } from "lucide-react";

function Summery({ enableNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summery, setSummery] = useState();
  const [loading, setLoading] = useState(false);
  const params = useParams();

  useEffect(() => {
    summery &&
      setResumeInfo({
        ...resumeInfo,
        summery: summery,
      });
  }, [summery]);

  // const handleInputChange = (e)=>{
  //     const {name, value} = e.target;

  //     setResumeInfo({
  //         ...resumeInfo,
  //         [name]: value
  //     });
  // }

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
        }); // Display success toast
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
        }); // Display error toast
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
            <label>Add Summery</label>
            <Button
            type="button"
              className="bg-gradient-to-r from-[#9f5bff] to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-white"
              size="sm"
              variant="outline"
            >
              Generate from AI ✨
            </Button>
          </div>
          <Textarea
            className="mt-5"
            required
            disabled={loading}
            onChange={(e) => setSummery(e.target.value)}
            // defaultValue={resumeInfo?.summery}
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
    </div>
  );
}

export default Summery;
