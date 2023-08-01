import { Chip } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { ClipboardDocumentCheckIcon, PencilIcon } from "@heroicons/react/24/solid";
import { ActivitiesProjects } from "./ActivitiesProject";

export const DashboardProject = ({ projectData, teamData}) => {
  const [tasks, setTasks] = useState([]);
  const [notes, setNotes] = useState([]);
  useEffect(()=>{
    setTasks(projectData.tasks);
    setNotes(projectData.notes);
  },
  [projectData])
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-row">   
        <div className="flex flex-row gap-4">
         <Chip className="flex items-center px-7 "  value={tasks.length + " tasks"} variant="outlined" color="blue"  icon={<ClipboardDocumentCheckIcon  />} />
         <Chip className="flex items-center px-7 "  value={notes.length + " notes"} variant="outlined" color="blue"  icon={<PencilIcon  />} />
        </div>
      </div>
        <ActivitiesProjects tasks={tasks.slice(0,3)}  />

    </div>
  );
};
