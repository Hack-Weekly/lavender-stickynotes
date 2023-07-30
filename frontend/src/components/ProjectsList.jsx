import { Add } from "./AddProject";
import { ProjectCard } from "./ProjectCard";

export const ProjectsList = ({ teamSlug, projects, setModalIsOpen }) => {
  return (
    <>
      {projects.length !== 0 ? (
        <>
          <div className="grid grid-cols-4 gap-10 items-stretch">
            {projects.map((project, index) => {
              return (
                <ProjectCard teamSlug={teamSlug} projectInfo={project} key={index} />
              );
            })}
          </div>
        </>
      ) : (
        <>
          <p>No project available.</p>
          <div onClick={() => setModalIsOpen(true)}>
            <Add />
          </div>
        </>
      )}
    </>
  );
};
