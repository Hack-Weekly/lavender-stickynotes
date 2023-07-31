import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineIcon,
  Typography,
  TimelineHeader,
} from "@material-tailwind/react";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { formatDate } from "../utils/dateUtils";
import { useEffect, useState } from "react";

export function ActivitiesProjects({ tasks }) {
  const [sortedTasks, setSortedTasks] = useState([]);
  useEffect(() => {
    setSortedTasks(
      tasks.sort((a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return dateB - dateA;
      })
    );
  }, [tasks]);

  return (
    <div
      className="flex flex-col w-full gap-1
    "
    >
      <div>
        <Typography variant="h5">Added Tasks :</Typography>
        <Timeline>
          {sortedTasks.map((task, index) => {
            return (
              <TimelineItem className="h-28" key={index}>
                {index !== tasks.length - 1 && (
                  <TimelineConnector className="!w-[78px]" />
                )}
                <TimelineHeader className="relative rounded-xl border border-blue-gray-50 bg-white py-3 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5">
                  <TimelineIcon className="p-3" variant="ghost">
                    <PlusCircleIcon className="h-5 w-5" />
                  </TimelineIcon>
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-row gap-1 items-center">
                      <Typography variant="h5" color="blue-gray">
                        {task.name} :
                      </Typography>
                      <Typography
                        variant="h6"
                        color="blue-gray"
                        className="font-normal opacity-90"
                      >
                        {task.description}
                      </Typography>
                    </div>
                    <Typography variant="small" color="gray" className="font-normal">
                      <b>{task.owner} </b>
                      {formatDate(task.created_at)}
                    </Typography>
                  </div>
                </TimelineHeader>
              </TimelineItem>
            );
          })}
        </Timeline>
      </div>
    </div>
  );
}
