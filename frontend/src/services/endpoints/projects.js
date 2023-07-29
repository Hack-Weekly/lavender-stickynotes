import { get } from "../utils/request";


// get project details
export const getProject = async(teamSlug, projectSlug) => {
    const route = `team/${teamSlug}/projects/${projectSlug}/`;
    return await get(route);
}   