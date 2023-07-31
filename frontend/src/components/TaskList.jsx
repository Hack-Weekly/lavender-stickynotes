import { UserCircleIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Chip, IconButton } from "@material-tailwind/react";
import { useState } from "react";
import { createTask } from "../services/endpoints/tasks";
import { CreateItem } from "./CreateItem";

export const TaskList = ({ teamSlug, projectId, tasks }) => {
  const [updatedTasks, setUpdatedTasks] = useState(tasks);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleCreateTask = async (name, description) => {
    try {
      const data = { name: name, description: description, project: projectId };
      const response = await createTask(teamSlug, projectId, data);
      if (response && response.data) {
        setUpdatedTasks((prevNotes) => [response.data, ...prevNotes]);
      } else {
        console.error("Invalid response or response is undefined.");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {updatedTasks.map((task) => (
        <div key={task.id} className="border border-gray-300 p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">{task.name}</h3>
          <div className="mb-4">
            <h4 className="text-lg font-semibold">Objectives:</h4>
            <p className="text-gray-600">{task.objectives}</p>
          </div>
          <div className="mb-4">
            <h4 className="text-lg font-semibold">Description:</h4>
            <p className="text-gray-600">{task.description}</p>
          </div>
          <div className="flex items-center mb-2 gap-2">
            <Chip
              value={task.owner}
              variant="filled"
              color="blue"
              icon={<UserCircleIcon className="h-5 w-5" />}
            />
            <IconButton variant="outlined" size="sm" color="red">
              <TrashIcon className="h-3 w-3" />
            </IconButton>
          </div>
        </div>
      ))}

      <div
        className="flex flex-col items-center justify-center border border-gray-300 p-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-100 transition duration-300"
        onClick={() => setModalIsOpen(true)}
      >
        <div className="flex items-center justify-center">
          <PlusIcon className="h-6 w-6 text-blue-500" />
        </div>
        <div className="mt-2 text-center">
          <p className="text-blue-500 font-semibold">Add New Task</p>
        </div>
      </div>
      <CreateItem
        isOpen={modalIsOpen}
        closeModal={() => setModalIsOpen(false)}
        createHandler={handleCreateTask}
        createdItem="task"
      />
    </div>
  );
};
