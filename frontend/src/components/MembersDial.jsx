import {
  IconButton,
  SpeedDial,
  SpeedDialHandler,
  SpeedDialContent,
  SpeedDialAction,
} from "@material-tailwind/react";
import {
  PlusIcon,
  HomeIcon,
  TrashIcon,
  ArrowLeftIcon
} from "@heroicons/react/24/outline";
import {useNavigate} from "react-router-dom";
export function MembersDial({handleBackClick, handleDeleteClick}) {
  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate("/dashboard");
  }
  return (
    <div className="relative h-80 w-full">
      <div className="absolute bottom-0 right-0">
        <SpeedDial>
          <SpeedDialHandler>
            <IconButton color="white" size="lg" className="rounded-full border border-blue-gray-50 shadow-xl">
              <PlusIcon className="h-5 w-5 transition-transform group-hover:rotate-45" />
            </IconButton>
          </SpeedDialHandler>
          <SpeedDialContent className="rounded-full border border-blue-gray-50 bg-white shadow-xl shadow-black/10">
            <SpeedDialAction className="bg-blue-gray-50" >
              <HomeIcon className="h-5 w-5" onClick={handleHomeClick} />
            </SpeedDialAction>
                <SpeedDialAction className="bg-blue-gray-50">
              <ArrowLeftIcon className="h-5 w-5" />
            </SpeedDialAction>
            <SpeedDialAction className="bg-blue-gray-50">
              <TrashIcon color="red" className="h-5 w-5" />
            </SpeedDialAction>
        
          </SpeedDialContent>
        </SpeedDial>
      </div>
    </div>
  );
}