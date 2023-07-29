import { Add } from "./Add"
import { ProjectCard } from "./ProjectCard"

export const ProjectsList = ({projects}) => {

    return(
        <>
        {projects.map((project, index)=>{
           return <ProjectCard projectInfo={project} key={index} />
        })}
        <Add toAdd="projects" />
        </>
    )
}