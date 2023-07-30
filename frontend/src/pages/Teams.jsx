import { SideBar } from "../components/SideBar";
import { Button, Card } from "@material-tailwind/react";
import { CreateTeamModal } from "../components/CreateTeamModal";
import { useState, useEffect } from "react";
import { getTeams, createTeam } from '../services/endpoints/teams';
import { TeamsTab } from '../components/TeamsTab';
import { CardInfo } from "../components/CardInfo";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { Spinner } from "@material-tailwind/react";
import { AvatarGen } from "../components/AvatarGen";

export const Teams = ({username}) => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await getTeams();
        if (response && response.own && Array.isArray(response.own) && response.member && Array.isArray(response.member)) {
          const ownTeams = response.own.map(team => ({ ...team, isOwner: true }));
          const memberTeams = response.member.map(team => ({ ...team, isOwner: false }));
          setTeams([...ownTeams, ...memberTeams].sort((a, b) => b.id - a.id));
        } else {
          console.error('Invalid response structure from getTeams.');
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchTeams();
  }, []);

  const createNewTeam = async (name, description) => {
    try {
      const response = await createTeam({ name, description });
      if (response && response.data) {
        setTeams((prevTeams) => [{...response.data, owner : username, isOwner: true}, ...prevTeams]);
      } else {
        console.error('Invalid response or response is undefined.');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setModalIsOpen(false);
    }
  };
  
  if (loading) {
    return <Spinner color="blue" size="md" />;
  }

  return (
    <div className="h-screen w-screen flex bg-gray-50 ">
      <div>
        <SideBar />
      </div>
      <div className="h-full w-full p-7 bg-gray-50 flex flex-col">
        <div className="flex flex-row-reverse justify-between">
          <AvatarGen username={username} className="h-9 w-9" />
          <p className="text-3xl">Teams Overview</p>
        </div>
        <div className="stats flex flex-row mt-7 mb-7 items-end space-x-4"> 
          <div className="flex items-center justify-center w-64 h-112"> 
            <CardInfo title="Owned" number={teams.filter(team => team.isOwner).length} color="cyan" className="text-center"/>
          </div>
          <div className="flex items-center justify-center w-64 h-112">
            <CardInfo title="Member" number={teams.filter(team => !team.isOwner).length} color="blue"className="text-center" />
          </div>
          <Button color="green" size="lg" onClick={() => setModalIsOpen(true)}>Create Team</Button>
        </div>
        <CreateTeamModal
          isOpen={modalIsOpen}
          closeModal={() => setModalIsOpen(false)}
          createTeam={createNewTeam} 
        />
        <div className="mt-5">
          <Card className="w-full p-4 shadow-2xl shadow-blue-gray-900/5">
            <TeamsTab teams={teams} />
          </Card>
        </div>
      </div>
    </div>
  );
};