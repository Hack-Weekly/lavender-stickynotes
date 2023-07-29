import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  UserCircleIcon,
  PowerIcon,
  InboxIcon,
  UsersIcon
  
} from "@heroicons/react/24/solid";
import { logout } from "../services/endpoints/users";
import {useNavigate } from "react-router-dom";

export function SideBar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  const handleProfile = () => {
    navigate("/profile");
  }
  const handleDashboard = () => {
    navigate("/dashboard")
  }
  return (
    <Card className="h-screen w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Sticky Notes
        </Typography>
      </div>
      <List>
        <ListItem onClick={handleDashboard}>
          <ListItemPrefix>
            <PresentationChartBarIcon className="h-5 w-5" />
          </ListItemPrefix>
          Dashboard
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <UsersIcon className="h-5 w-5" />
          </ListItemPrefix>
          Teams
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          Inbox
          <ListItemSuffix>
            <Chip value="0" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
          </ListItemSuffix>
        </ListItem>
        <hr className="my-2 border-blue-gray-50" />
        <ListItem onClick={handleProfile}>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Profile
        </ListItem>
        <ListItem onClick={handleLogout}>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
}
