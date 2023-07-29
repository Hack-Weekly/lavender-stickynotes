import React, { useState } from "react";
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from "@material-tailwind/react";
import { UserCircleIcon} from "@heroicons/react/24/solid";
import { ProfileDetails } from "./ProfileDetails";

export function ProfileTabs({isEdit, confirmEdit}) {
  const data = [
    {
      label: "Profile",
      value: "profile",
      icon: UserCircleIcon,
      desc: <ProfileDetails isEdit={isEdit} confirmEdit={confirmEdit}/>,
    }
  ];

  // State to manage the active tab value
  const [activeTab, setActiveTab] = useState("profile");

  const handleTabClick = (value) => {
    setActiveTab(value);
  };

  return (
    <Tabs value={activeTab}>
      <TabsHeader>
        {data.map(({ label, value, icon }) => (
          <Tab key={value} value={value} onClick={() => handleTabClick(value)}>
            <div className={`flex items-center gap-2 ${activeTab === value ? "text-blue-500" : "text-gray-500"}`}>
              {React.createElement(icon, { className: "w-5 h-5" })}
              {label}
            </div>
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}
