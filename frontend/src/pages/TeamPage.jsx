import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getTeam } from "../services/endpoints/teams";
import { SideBar } from "../components/SideBar";
import {Typography } from "@material-tailwind/react";
import { Loading } from "../components/Loading";
import { ClockIcon } from "@heroicons/react/24/solid";
import { getDaysDifferenceFromToday } from "../utils/dateUtils";
import { TeamTab } from "../components/TeamTab";
import { useNavigate } from "react-router-dom";
import { CreateProjectModal } from "../components/CreateProjectModel";
import { createProject } from "../services/endpoints/projects";
export const TeamPage = () => {
    const {teamSlug} = useParams();
    const [projects, setProjects] = useState([]);
    const [teamName, setTeamName] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [createdAt, setCreatedAt] = useState("");
    const [teamData, setTeamData] = useState({});
    const navigate = useNavigate();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    useEffect(()=>{
        const fetchProjects = async() =>{
            try{
            const response = await getTeam(teamSlug);
            setTeamData(response);
            setProjects(response.projects);
            setTeamName(response.team.name);
            setCreatedAt(getDaysDifferenceFromToday(response.team.created_at))
            }catch(error){
                console.error(error);
                navigate("/teams");
            }finally{
                setIsLoading(false);
            }
        }
        fetchProjects();
    },[teamSlug, modalIsOpen])
    const handleCreateProject = async(projectName, projectDescription) => {
        try {
        const data = {name : projectName, description : projectDescription};
        await createProject(teamSlug, data);
        }catch(error){
            console.error(error);
        }
    }
    if (isLoading) return <Loading />
    return(
        <div className="h-screen w-screen flex bg-gray-50">
            <div>
                <SideBar />
            </div>
            <div className="bg-white shadow-xl shadow-blue-gray-900/5 w-full flex flex-col p-10 m-3">
                <div className="flex flex-col">
                <Typography variant="h3" className="font-thin">{teamName}</Typography>
                <div className="flex gap-1 items-center">
                    <ClockIcon  className="h-3 w-3 opacity-60" />
                    <Typography className="text-xs font-thin opacity-60" >Created {createdAt} days ago</Typography>
                </div>
                <TeamTab teamData = {teamData} setModalIsOpen={setModalIsOpen}/>
                </div>
            </div>
            <CreateProjectModal isOpen={modalIsOpen} closeModal={() => setModalIsOpen(false)  } createProject={handleCreateProject}/>
        </div>
    )
}