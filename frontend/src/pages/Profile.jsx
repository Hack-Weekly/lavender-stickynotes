import { SideBar } from "../components/SideBar";
import { Button, Card } from "@material-tailwind/react";
import { ProfileTabs } from "../components/ProfileTabs";
import { ShareIcon, PencilIcon, XMarkIcon, CheckIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export const Profile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [confirmEdit, setConfirmEdit] = useState(false);
  return (
    <div className="h-screen w-screen flex  bg-gray-50 ">
      <div>
        <SideBar />
      </div>
      <div className="h-full w-full flex flex-col p-10">
        <Card className="h-screen w-full  p-4 shadow-xl shadow-blue-gray-900/5 flex flex-col justify-between">
          <ProfileTabs isEdit={isEdit} confirmEdit = {confirmEdit} />
          <div className="flex items-center gap-4 justify-center">
            {isEdit ? (
              <>
                <Button
                  className="flex items-center gap-2"
                  color="green"
                  onClick={() =>{setConfirmEdit((prev) =>!prev); setIsEdit(false) } }
                >
                  <CheckIcon className="h-4 w-5" />
                  Confirm
                </Button>
                <Button
                  variant="outlined"
                  color="red"
                  className="flex items-center gap-2"
                  onClick={() => setIsEdit((prev) => !prev)}
                >
                  <XMarkIcon className="h-4 w-5" />
                  CANCEL
                </Button>
              </>
            ) : (
              <>
                <Button
                  className="flex items-center gap-2"
                  onClick={() => setIsEdit((prev) => !prev)}
                >
                  <PencilIcon className="h-4 w-5" />
                  Edit
                </Button>
                <Button variant="outlined" className="flex items-center gap-2">
                  <ShareIcon className="h-4 w-5" />
                  Share profile
                </Button>
              </>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};
