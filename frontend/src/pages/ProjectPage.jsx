import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { getProject } from "../services/endpoints/projects";

export const ProjectPage = () => {
    const {teamSlug, projectSlug} = useParams();
    
    useEffect(()=>{
        const fetchData = async() => {
            // const response = await getProject(teamSlug, projectSlug);
        }
        fetchData();
    },
    []);
    return(
        <div>{projectSlug}</div>
    )
}