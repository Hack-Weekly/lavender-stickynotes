import { Button } from "@material-tailwind/react"
import { deleteTeam } from "../services/endpoints/teams"
import { useNavigate } from "react-router-dom"

export const SettingsTeam = ({teamSlug}) => {
    const navigate = useNavigate();
    const handleDeleteClick = () => {
        const delTeam = async() => {
        try {
            await deleteTeam(teamSlug);
            navigate("/teams");
        }catch(error){
            console.error(error);
        }
        }
        delTeam();
    }
    return (    
        <>
        <Button color="red" onClick={handleDeleteClick} >DELETE TEAM</Button>
        </>
    )
}
