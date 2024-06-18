import { useUser } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

function App() {
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return <Progress value={33} />;
  }

  if (!isSignedIn && isLoaded) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
