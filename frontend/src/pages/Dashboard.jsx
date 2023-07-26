import { Avatar } from "@material-tailwind/react";
import { SideBar } from "../components/SideBar";
import { CardInfo } from "../components/CardInfo";
import { HorizontalCard } from "../components/HorizontalCard";
import { BoltIcon } from "@heroicons/react/24/solid";
export const Dashboard = () => {
  return (
    <div className="h-screen w-screen flex">
      <SideBar />
      <div className=" h-full w-full p-7 bg-gray-50 flex flex-col">
        <div className="flex flex-row-reverse justify-between">
          <Avatar
            src="https://png.pngtree.com/png-vector/20191026/ourlarge/pngtree-avatar-vector-icon-white-background-png-image_1870181.jpg"
            alt="avatar"
          />
          <p className="text-3xl">Dashboard</p>
        </div>
        <div className="stats flex flex-row justify-evenly max-h-80 h-2/5 mt-5 ">
          <CardInfo title="Teams" number="0" color="cyan" />
          <CardInfo title="Projects" number="0" color="cyan" />
          <HorizontalCard />
        </div>
        <div className="flex flex-row justify-between">
          <p className="text-2xl">Activity</p>
          <BoltIcon className="h-5 w-5" color="cyan"/>
        </div>
      </div>
    </div>
  );
};
