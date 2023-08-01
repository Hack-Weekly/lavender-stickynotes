import { useState } from "react";
import { Card, Button } from "@material-tailwind/react";
import { ProfileTabs } from "../components/ProfileTabs";
import { AvatarGen } from "../components/AvatarGen";
import { PencilIcon, ShareIcon, XMarkIcon, CheckIcon } from "@heroicons/react/24/solid";
import { SideBar } from "../components/SideBar";

export const Profile = ({username}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [confirmEdit, setConfirmEdit] = useState(false);
  
  const handleEditToggle = () => {
    setIsEdit((prev) => !prev);
    setConfirmEdit(false); // Reset confirmation state when toggling edit mode
  };

  return (
    <div className="h-screen w-screen flex bg-gray-50">
      <SideBar />
      <div className="flex flex-col justify-center items-center w-full px-6 py-8">
        <Card className="w-full max-w-md p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <AvatarGen username={username} className="h-12 w-12" />
              <div>
                <h2 className="text-2xl font-medium">{username}</h2>
              </div>
            </div>
          </div>

          <ProfileTabs isEdit={isEdit} confirmEdit={confirmEdit} />

          <div className="flex items-center gap-4 justify-center">
            {isEdit ? (
              <>
                <Button
                  color="green"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={() => setConfirmEdit(true)}
                >
                  <CheckIcon className="h-4 w-5" />
                  Confirm
                </Button>
                <Button
                  color="red"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={handleEditToggle}
                >
                  <XMarkIcon className="h-4 w-5" />
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={handleEditToggle}
                >
                  <PencilIcon className="h-4 w-5" />
                  Edit
                </Button>
                <Button size="sm" className="flex items-center gap-2">
                  <ShareIcon className="h-4 w-5" />
                  Share Profile
                </Button>
              </>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};


