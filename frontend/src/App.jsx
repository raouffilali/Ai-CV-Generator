import { useUser } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "./components/custom/Header";
import { Loader2 } from "lucide-react";
import FooterFlow from "./components/custom/Footer";

function App() {
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 size={70} color="#9f5bff" className="animate-spin" />
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
