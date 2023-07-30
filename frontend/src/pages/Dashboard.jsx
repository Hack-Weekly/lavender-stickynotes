import { Avatar, Spinner } from "@material-tailwind/react";
import { SideBar } from "../components/SideBar";
import { CardInfo } from "../components/CardInfo";
import { HorizontalCard } from "../components/HorizontalCard";
import { BoltIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { Activities } from "../components/Activitites";
import { useEffect, useState } from "react";
import { getTeams } from "../services/endpoints/teams";
import { AvatarGen } from "../components/AvatarGen";

export const Dashboard = ({username}) => {
  const [teamsNumber, setTeamsNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTeams();
        setTeamsNumber(response.own.length);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  if (isLoading) return <isLoading />
  return (
    <div className="h-screen w-screen flex bg-gray-50">
      <div>
        <SideBar />
      </div> 
      <div className=" h-full w-full p-7 bg-gray-50 flex flex-col">
        <div className="flex flex-row-reverse justify-between">
          <AvatarGen username={username} className="h-9 w-9" />
          <p className="text-3xl">Dashboard</p>
        </div>
        <div className="stats flex flex-row justify-evenly max-h-80 h-2/5 mt-5 ">
          <CardInfo title="Teams" number={teamsNumber} color="cyan" />
          <CardInfo title="Projects" number="0" color="cyan" />
          <HorizontalCard />
        </div>
        <div className="flex flex-col mt-5">
          <div className="flex flex-row justify-between">
            <p className="text-2xl">Recent activities</p>
            <BoltIcon className="h-5 w-5" color="cyan" />
          </div>
          <div className="mt-2">
            <Activities />
          </div>
        </div>
      </div>
    </div>
  );
};
