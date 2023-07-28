import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getTeam } from "../services/endpoints/teams";
import { SideBar } from "../components/SideBar";
import { Typography } from "@material-tailwind/react";
import { Loading } from "../components/Loading";

export const Projects = () => {
    const {teamSlug} = useParams();
    const [projects, setProjects] = useState([]);
    const [teamName, setTeamName] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    useEffect(()=>{
        const fetchProjects = async() =>{
            try{
            const response = await getTeam(teamSlug);
            setProjects(response.projects);
            setTeamName(response.team.name);
            }catch(error){
                console.error(error);
            }finally{
                setIsLoading(false);
            }
        }
        fetchProjects();
    },[teamSlug])
    if (isLoading) return <Loading />
    return(
        <div className="h-screen w-screen flex bg-gray-50">
            <div>
                <SideBar />
            </div>
            <div className="w-full flex flex-col items-center">
                <Typography variant="h4">{teamName}</Typography>
            </div>
        </div>
    )
}