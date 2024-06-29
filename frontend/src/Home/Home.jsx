import Header from "@/components/custom/Header";
import { UserButton } from "@clerk/clerk-react";
import React from "react";

function Home() {
  return (
    <div>
      <Header />
      <div className="container mx-auto">
        <div className="text-center mt-20">
          <h1 className="text-4xl font-bold">Welcome to NextGen Ai builder</h1>
          <p className="text-lg mt-4">
            This is a simple example of a Clerk app using Next.js.
          </p>
          <UserButton />
        </div>
      </div>
    </div>
  );
}

export default Home;
