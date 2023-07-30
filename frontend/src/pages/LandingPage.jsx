import { Link } from "react-router-dom";
import logo from "../imgs/sticky-notes-logo-color-2.png";
import { Button } from "@material-tailwind/react";
import { HandRaisedIcon, UsersIcon, ArchiveBoxIcon } from "@heroicons/react/24/solid";

export const LandingPage = () => {
  return (
    <div className="landing-page h-screen w-screen flex flex-col overflow-x-hidden md:px-0 lg:px-12 xl:px-36 bg-gradient-to-b from-blue-500 via-blue-600 to-blue-700">
      <header className="h-fit flex justify-center items-center">
        <img src={logo} className="h-24 max-h-full" alt="sticky notes logo" />
      </header>

      <main className="flex flex-10 justify-between items-center md:flex-col sm:flex-col lg:flex-row">
        <div className="copy w-1/2 p-16">
          <h1 className="text-5xl font-bold text-left text-white leading-tight">
            Organize your notes with ease
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-white">
            Stick Notes lets you easily organize your notes visually for maximum flexibility and utility. Create groups with family, friends, and all your teams. You can create new projects to keep all notes organized at all times.
          </p>
          <div className="flex gap-4"> 
          <Link to="/login">
            <Button
              color="blue"
              size="lg"
              rounded={true}
              ripple="light"
              className="mt-6"
            >
              login
            </Button>
          </Link>
          <Link to="/signup">
            <Button
              color="blue"
              size="lg"
              rounded={true}
              ripple="light"
              className="mt-6"
            >
              Sign Up
            </Button>
          </Link>
          </div>
        </div>

        <div className="features w-1/2 p-16 flex justify-center items-center md:space-x-32 md:flex-row sm:flex-col">
          <div className="sm:mt-16 lg:mt-0 flex flex-col justify-center items-center">
            <p className="text-white font-bold">Drag Notes</p>
            <hr className="mt-2 w-full border-2 border-white"></hr>
            <HandRaisedIcon className="h-16 w-16 text-white mt-4" />
          </div>

          <div className="sm:mt-16 lg:mt-0 flex flex-col justify-center items-center">
            <p className="text-white font-bold">Create Teams</p>
            <hr className="mt-2 w-full border-2 border-white"></hr>
            <UsersIcon className="h-16 w-16 text-white mt-4" />
          </div>

          <div className="sm:mt-16 lg:mt-0 flex flex-col justify-center items-center">
            <p className="text-white font-bold">Organize by Project</p>
            <hr className="mt-2 w-full border-2 border-white"></hr>
            <ArchiveBoxIcon className="h-16 w-16 text-white mt-4" />
          </div>
        </div>
      </main>

      <footer className="text-center flex flex-1 h-1/6 justify-center items-center font-thin text-gray-500">
        Team Lavender Snake 2023
      </footer>
    </div>
  );
};
