import { Spinner } from "@material-tailwind/react";
import { SideBar } from "./SideBar";


export const Loading = ()=> {
    return (
      <div className="h-screen w-screen flex bg-gray-50">
        <div>
          <SideBar />
        </div>
        <div className="flex flex-col items-center w-full justify-center h-screen">
            <Spinner  />
        </div>
      </div>
    );
}