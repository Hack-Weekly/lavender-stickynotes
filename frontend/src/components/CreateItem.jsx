import React, { useState } from "react";
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";

export const CreateItem = ({ isOpen, closeModal, createHandler, createdItem }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateProject = () => {
    createHandler(name, description);
    setName('');
    setDescription('');
    closeModal(); // Close the dialog after submitting the project
  };

  return (
    <>
      <Dialog open={isOpen} handler={closeModal}>
        <DialogHeader>{"Create " + createdItem}</DialogHeader>
        <DialogBody divider>
          <input
            type="text"
            className="mb-4 w-full px-3 py-2 border border-gray-300 rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={ createdItem + " Name"}
          />
          <input
            type="text"
            className="mb-4 w-full px-3 py-2 border border-gray-300 rounded-md"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={createdItem +" Description"}
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
