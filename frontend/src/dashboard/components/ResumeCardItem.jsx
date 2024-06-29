import {
  Delete,
  Download,
  LoaderCircleIcon,
  MoreVertical,
  Notebook,
  PenSquareIcon,
  ScanEye,
} from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import GlobalApi from "../../../service/GlobalApi";
import { Toaster, toast } from "sonner";

function ResumeCardItem({ resume, refreshData }) {
  console.log(resume);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const navigation = useNavigate();

  const onMenuClick = (action) => {
    switch (action) {
      case "edit":
        navigation(`/dashboard/resume/${resume.documentId}/edit`);
        break;
      case "view":
        navigation(`/my-resume/${resume.documentId}/view`);
        break;
      case "download":
        navigation(`/my-resume/${resume.documentId}/view`);
      default:
        break;
    }
  };

  const onDelete = () => {
    setLoading(true);
    GlobalApi.DeleteResumeById(resume.documentId)
      .then((resp) => {
        console.log("data deleted Successfully", resp);
        toast("Resume Deleted Successfully");
        setLoading(false);
        setOpenAlert(false);
        refreshData();
      })
      .catch((err) => {
        toast.error("Failed to delete resume");
        setLoading(false);
      });
  };

  return (
    <>
      <Toaster richColors position="bottom-left" />
      <div className="hover:shadow-xl  transition duration-300 ease-in-out">
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

          <DropdownMenu>
            <DropdownMenuTrigger>
              {" "}
              <MoreVertical className="h-4 w-4 cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => onMenuClick("edit")}>
                {" "}
                <PenSquareIcon className="mr-2" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onMenuClick("view")}>
                {" "}
                <ScanEye className="mr-2" /> View
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onMenuClick("download")}>
                {" "}
                <Download className="mr-2" />
                Download
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOpenAlert(true)}>
                <Delete className="mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <AlertDialog open={openAlert}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your resume and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setOpenAlert(false)}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction onClick={onDelete} disabled={loading}>
                  {loading ? (
                    <LoaderCircleIcon className="animate-spin" />
                  ) : (
                    "Delete"
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </>
  );
}

export default ResumeCardItem;
