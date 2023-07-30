import { Link } from "react-router-dom";
import { AvatarGen } from "./AvatarGen";

export const TeamsTab = ({ teams = [] }) =>  {
  return (
    <div className="w-full h-full py-4 px-8">
      <div className="grid grid-cols-4 gap-10 items-stretch">
        {teams.length ? teams.map((team) => (
          
          <Link to={team.slug}>
          <div key={team.id} className="border-2 border-grey rounded-lg relative hover:shadow-lg" style={{ paddingBottom: '100%' }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-lg font-medium">{team.name}</p>
              <div className={`absolute top-0 left-0 m-2 text-xs px-2 py-1 rounded ${team.isOwner ? 'bg-cyan-500 text-white' : 'bg-blue-500 text-white'}`}>
                {team.isOwner ? 'Owner' : 'Member'}
              </div>
              <div className="flex items-center -space-x-3 absolute bottom-2 right-2 ">
                {[team.owner, ...team.members].map((member, index)=>{
                  return(
                  <AvatarGen key={index} className="h-7 w-7" username={member} />
                  )
                }
                )}
              
              </div>
            </div>
          </div>
          </Link>
        ))
        :
        <p>No teams available.</p>
        }
      </div>
    </div>
  );
};
