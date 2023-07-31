import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProject } from "../services/endpoints/projects";
import { SideBarProject } from "../components/SideBarProject";
import { ProjectMenu } from "../components/ProjectMenu";
import { getTeam } from "../services/endpoints/teams";
import { Loading } from "../components/Loading";
export const ProjectPage = () => {
  const { teamSlug, projectId } = useParams();
  const [projectName, setProjectName] = useState("");
  const [projectData, setProjectData] = useState({});
  const [teamData, setTeamData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const response = await getProject(teamSlug, projectId);
      setTeamData(await getTeam(teamSlug));
      setProjectData(response);
      setProjectName(response.name);
    } catch (error) {
      console.log(error);
      navigate("/dashboard");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [projectId, teamSlug]);
  if (isLoading) return <Loading />;
  return (
    <div className="h-screen w-screen flex bg-gray-50">
      <SideBarProject teamSlug={teamSlug} teamData={teamData} projectId={projectId} />
      <div className="flex flex-col gap-3 p-5">
        <p className="text-4xl font-thin">
          {projectName}
          <span className="text-3xl text-blue-800 opacity-90"> Dashboard</span>
        </p>
        <ProjectMenu projectData={projectData} teamSlug={teamSlug} fetchData={fetchData} />
      </div>
    </div>
  );
};
