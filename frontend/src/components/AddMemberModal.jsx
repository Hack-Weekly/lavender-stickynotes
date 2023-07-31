import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

export function AddMemberModal({ isOpen, closeModal }) {
  const [username, setUsername] = useState("");
  const [isUsernameEmpty, setIsUsernameEmpty] = useState(false);

  const handleAddMember = () => {
    if (username.trim() === "") {
      setIsUsernameEmpty(true);
      return; 
    }

    console.log("Adding user:", username);
    setUsername("");
    setIsUsernameEmpty(false); 
    closeModal();
  };

  return (
    <>
      <Dialog open={isOpen} handler={closeModal}>
        <DialogHeader>Add Member</DialogHeader>
        <DialogBody divider>
          <div className="flex items-center">
            <input
              type="text"
              value={username}
              onChange={(e) => { setUsername(e.target.value); setIsUsernameEmpty(false)}}
              placeholder="Enter username"
              className="border border-gray-400 p-2 rounded-lg w-full"
            />
          </div>
          {isUsernameEmpty && (
            <p className="text-red-600 text-sm mt-2">Please enter a username.</p>
          )}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={closeModal}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleAddMember}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
