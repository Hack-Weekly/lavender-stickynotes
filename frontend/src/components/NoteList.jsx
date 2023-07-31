import { PencilIcon, UserCircleIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Chip, IconButton } from "@material-tailwind/react";
import { useState } from "react";
import { CreateItem } from "./CreateItem";
import { createNote } from "../services/endpoints/notes";


export const NoteList = ({ teamSlug, projectId, notes }) => {
  const [notesUpdated, setNotesUpdated] = useState(notes);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleCreateNote = async(name, description) => {
    try {
      const data = {name : name, description : description, project : projectId};
      const response = await createNote(teamSlug, projectId, data );
      if (response && response.data) {
        setNotesUpdated((prevNotes) => [response.data, ...prevNotes]);
      } else {
        console.error('Invalid response or response is undefined.');
      }
    }catch(error){
      console.error(error);
    } 
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
      {notesUpdated.map((note) => (
        <div
          key={note.id}
          className="bg-white p-4 rounded-lg shadow-md"
        >
          <h3 className="text-xl font-semibold mb-2">{note.name}</h3>
          <p className="text-gray-600 mb-4">{note.description}</p>
          <div className="flex items-center mb-2">
            <PencilIcon className="h-5 w-5 text-blue-500 mr-1" />
            <p className="text-blue-500">Edit</p>
          </div>
           <div className="flex items-center mb-2 gap-3">
            <Chip
              value={note.owner}
              variant="filled"
              color="blue"
              icon={<UserCircleIcon className="h-5 w-5" />}
            />
             <IconButton 
              variant="outlined"
              size="sm"
              color="red"><TrashIcon className="h-3 w-3" /></IconButton>
          </div>
        </div>
      ))}

      <div
        className="flex flex-col items-center justify-center bg-white p-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-100 transition duration-300 "
      onClick={()=>setModalIsOpen(true)}
      >
        <div className="flex items-center justify-center">
          <PencilIcon className="h-6 w-6 text-blue-500" />
        </div>
        <div className="mt-2 text-center" >
          <p className="text-blue-500 font-semibold">Add New Note</p>
        </div>
      </div>
      <CreateItem isOpen={modalIsOpen} closeModal={()=>setModalIsOpen(false)} createHandler={handleCreateNote} createdItem="note" />
    </div>
  );
};
