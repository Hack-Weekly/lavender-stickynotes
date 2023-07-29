import React from "react";
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel, Button } from "@material-tailwind/react";
import { ProjectsList } from "./ProjectsList";
import { TeamMembers } from "./TeamMembers";
import { SettingsTeam } from "./SettingsTeam";

export function TeamTab({teamData}) {
  const [activeTab, setActiveTab] = React.useState("Projects"); // Set "Projects" as the default active tab
  const data = [
    {
      label: "Projects",
      value: "Projects",
      desc: <ProjectsList projects={teamData.projects} />,
    },
    {
      label: "Members",
      value: "Members",
      desc: <TeamMembers owner={teamData.team.owner} members={teamData.team.members} />,
    },
    {
      label: "Settings",
      value: "Settings",
      desc: <SettingsTeam teamSlug={teamData.team.slug}/>,
    },
  ];

  return (
    <Tabs value={activeTab}>
      <TabsHeader
        className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
        indicatorProps={{
          className:
            "bg-transparent border-b-2 border-blue-500 shadow-none rounded-none",
        }}
      >
        {data.map(({ label, value }) => (
          <Tab
            key={value}
            value={value}
            onClick={() => setActiveTab(value)}
            className={activeTab === value ? "text-blue-500" : ""}
          >
            {label}
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
