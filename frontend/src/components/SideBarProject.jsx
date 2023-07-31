import { useState } from "react";
import { AvatarGen } from "./AvatarGen";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { AddMemberModal } from "./AddMemberModal";
import { MembersDial } from "./MembersDial";

export function SideBarProject({projectData}) {
  const isOwnerStyle =
    "border border-green-500 shadow-xl shadow-green-900/20 ring-4 ring-green-500/30";
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };
  const handleBackClick = () => {

  }
  const handleDeleteClick = () => {
    
  }
  return (
    <div className="h-screen w-full max-w-[5rem] p-4 flex flex-col justify-between items-center shadow-xl shadow-blue-gray-900/5">
      <div className="flex flex-col gap-3">
        <AvatarGen username={"test"} className={"h-10 w-10 " + isOwnerStyle} />
        <PlusCircleIcon
          className="h-10 w-10 opacity-70 hover:opacity-80"
          color="blue"
          onClick={() => setIsOpen(true)}
        />
        <AddMemberModal isOpen={isOpen} closeModal={closeModal} />
      </div>
      <MembersDial handleBackClick={handleBackClick} handleDeleteClick={handleDeleteClick} />
    </div>
  );
}
