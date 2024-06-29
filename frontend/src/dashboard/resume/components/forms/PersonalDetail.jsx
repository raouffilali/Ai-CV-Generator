import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { LoaderCircle } from "lucide-react";
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import GlobaleApi from "../../../../../service/GlobaleApi";
import { Bounce, Slide, toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css";

function PersonalDetail({ enableNext ,style }) {
  const params = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [formData, setFormData] = useState();
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    enableNext(false);
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    console.log(formData);

    setResumeInfo({
      ...resumeInfo,
      [name]: value,

    });

    console.log(resumeInfo);
  };

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      data: formData,

    };
    GlobaleApi.updateResumeDetail(params?.resumeId, data)
      .then((res) => {
        console.log(res);
        enableNext(true);
        setLoading(false);
        toast.success("Details updated successfully", {
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
    <div
      className={` p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10 ${style}`}
    >
      <ToastContainer />
      <h2 className="font-bold text-lg">Personal Details</h2>
      <p>Get started with the basic information</p>
      <form onSubmit={onSave}>
        <div className="grid grid-cols-2 mt-5 gap-3">
          <div>
            <label className="text-sm">First Name</label>
            <Input
              name="firstName"
              onChange={handleInputChange}
              required
              defaultValue={resumeInfo?.firstName}
            />
          </div>
          <div>
            <label className="text-sm">Last Name</label>
            <Input
              name="lastName"
              onChange={handleInputChange}
              required
              defaultValue={resumeInfo?.lastName}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Job Title</label>
            <Input
              name="jobTitle"
              onChange={handleInputChange}
              required
              defaultValue={resumeInfo?.jobTitle}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Address</label>
            <Input
              name="address"
              onChange={handleInputChange}
              required
              defaultValue={resumeInfo?.address}
            />
          </div>
          <div>
            <label className="text-sm">Phone number</label>
            <Input
              name="phone"
              onChange={handleInputChange}
              required
              defaultValue={resumeInfo?.phone}
            />
          </div>
          <div>
            <label className="text-sm">Email</label>
            <Input
              name="email"
              onChange={handleInputChange}
              required
              defaultValue={resumeInfo?.email}
            />
          </div>
        </div>
        <div className="mt-5 flex justify-end">
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
  );
}

export default PersonalDetail;
