import { useUser } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import Header from "./components/custom/Header";

function App() {
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Progress value={100} className="w-10 h-10" />
      </div>
    );
  }

  if (!isSignedIn && isLoaded) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
