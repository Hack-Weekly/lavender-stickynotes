import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { DashboardProject } from "./DashboardProject";
import { TaskList } from "./TaskList";
import { NoteList } from "./NoteList";
import { useState } from "react";
export function ProjectMenu({teamSlug, projectData, teamData, fetchData}) {
  const handleTabSelect = () => {
    fetchData(); 
  }
  const data = [
    {
      label: "Dashboard",
      value: "Dashboard",
      desc: <DashboardProject projectData={projectData} teamData={teamData} />,
    },
    {
      label: "Tasks",
      value: "Tasks",
      desc: <TaskList projectId={projectData.id} tasks={projectData.tasks} teamSlug={teamSlug}  />,
    },
    {
      label: "Notes",
      value: "Notes",
      desc: <NoteList projectId={projectData.id} notes={projectData.notes} teamSlug={teamSlug} />,
    },
  ];
 
  return (
    <Tabs value="Dashboard" className="w-[65rem]" >
      <TabsHeader
        className="bg-transparent"
        indicatorProps={{
          className: "bg-blue-500/10 shadow-none text-blue-500",
        }}
      >
        {data.map(({ label, value }) => (
          <Tab key={value} value={value} onClick={handleTabSelect}>
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
