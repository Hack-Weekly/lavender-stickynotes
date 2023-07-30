import React, { useState } from "react";
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";

export const CreateProjectModal = ({ isOpen, closeModal, createProject }) => {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  const handleCreateProject = () => {
    createProject(projectName, projectDescription);
    setProjectName('');
    setProjectDescription('');
    closeModal(); // Close the dialog after submitting the project
  };

  return (
    <>w
      <Dialog open={isOpen} handler={closeModal}>
        <DialogHeader>Create Project</DialogHeader>
        <DialogBody divider>
          <input
            type="text"
            className="mb-4 w-full px-3 py-2 border border-gray-300 rounded-md"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Project Name"
          />
          <input
            type="text"
            className="mb-4 w-full px-3 py-2 border border-gray-300 rounded-md"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            placeholder="Project Description"
          />
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={closeModal} className="mr-1">
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleCreateProject}>
            <span>Submit</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};
