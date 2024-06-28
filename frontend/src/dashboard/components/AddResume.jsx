import { Loader2, PlusSquare } from "lucide-react";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GlobaleApi from "../../../service/GlobaleApi";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

function AddResume() {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();

  const onCreate = () => {
    setLoading(true);
    const uuid = uuidv4();
    const data = {
      data: {
        resumeTitle: resumeTitle,
        resumeId: uuid,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
      },
    };
    console.log("data", data),
      GlobaleApi.CreateNewResume(data).then(
        (resp) => {
          console.log("Resume created", resp.data.data.documentId);
          if (resp) {
            setLoading(false);
            navigation(`/dashboard/resume/${resp.data.data.documentId}/edit`);
          }
        },
        (error) => {
          console.log("Error while creating resume", error);
          setLoading(false);
        }
      );
  };

  return (
    <div>
      <div
        className="p-14 py-24 border items-center
     flex justify-center bg-secondary
     rounded-lg h-[280px] hover:scale-105 
     transition-all hover:shadow-md border-dashed"
        onClick={() => setOpenDialog(true)}
      >
        <PlusSquare className="cursor-pointer" />
      </div>

      {/* Dialog part */}
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-2">Create New CV</DialogTitle>
            <DialogDescription>
              <p>Add a title for your new CV</p>
              <Input
                className="my-2"
                placeholder="Ex.Full Stack resume"
                onChange={(e) => setResumeTitle(e.target.value)}
              />
            </DialogDescription>

            {/* Buttons */}
            <div className="flex justify-end gap-5">
              <Button onClick={() => setOpenDialog(false)} variant="ghost">
                Cancel
              </Button>
              <Button
                disabled={!resumeTitle || loading}
                onClick={() => onCreate()}
              >
                {loading ? <Loader2 className="animate-spin" /> : "Create"}
              </Button>
            </div>
            {/* Buttons */}
          </DialogHeader>
        </DialogContent>
      </Dialog>
      {/* Dialog part */}
    </div>
  );
}

export default AddResume;
