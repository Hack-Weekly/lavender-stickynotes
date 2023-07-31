import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { getProject } from "../services/endpoints/projects";
import { SideBarProject } from "../components/SideBarProject";
import { Typography } from "@material-tailwind/react";

export const ProjectPage = () => {
    const {teamSlug, projectSlug} = useParams();   
    useEffect(()=>{
        const fetchData = async() => {
            const response = await getProject(teamSlug, projectSlug);
        }
       //fetchData();
    },
    []);
    return(
        <div className="h-screen w-screen flex bg-gray-50">
            <SideBarProject />
            <div className="flex flex-row gap-1 p-5">
                <Typography variant="h3" className="font-thin opacity-90">{projectSlug}</Typography>
            </div>
        </div>
    )
}