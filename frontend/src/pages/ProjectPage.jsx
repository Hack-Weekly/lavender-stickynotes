import { useEffect } from "react";
import { useParams } from "react-router-dom"

export const ProjectPage = () => {
    const {teamSlug, projectSlug} = useParams();
    
    useEffect(()=>{
        const fetchData = async() => {
            
        }
    },
    []);
    return(
        <div>{projectSlug}</div>
    )
}