import { get, post } from "../utils/request";


// get project details
export const getProject = async(teamSlug, projectSlug) => {
    const route = `team/${teamSlug}/projects/${projectSlug}/`;
    return await get(route);
}   

export const createProject = async(teamSlug, data) => {
        const route = `team/${teamSlug}/`;
        return await post(route, data); 
}