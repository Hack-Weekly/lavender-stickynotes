import React, { useState } from "react";
import Modal from 'react-modal';
import { Button } from "@material-tailwind/react";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

export const CreateTeamModal = ({ isOpen, closeModal, createTeam }) => {
  const [teamName, setTeamName] = useState("");
  const [teamDescription, setTeamDescription] = useState("");

  const handleCreateTeam = () => {
    createTeam(teamName, teamDescription);
    setTeamName('');
    setTeamDescription('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Create Team Modal"
    >
      <h2 className="mb-4 text-lg">Create Team</h2>
      <input
        type="text"
        className="mb-4 w-full px-3 py-2 border border-gray-300 rounded-md"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
        placeholder="Team Name"
      />
      <input
        type="text"
        className="mb-4 w-full px-3 py-2 border border-gray-300 rounded-md"
        value={teamDescription}
        onChange={(e) => setTeamDescription(e.target.value)}
        placeholder="Team Description"
      />
      <Button color="green" onClick={handleCreateTeam}>Submit</Button>
    </Modal>
  );
};
