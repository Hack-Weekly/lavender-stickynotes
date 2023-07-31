import { del, get, post, put } from "../utils/request";

// get project details
export const getProject = async (teamSlug, projectSlug) => {
  const route = `team/${teamSlug}/projects/${projectSlug}/`;
  return await get(route);
};

// create project
export const createProject = async (teamSlug, data) => {
  const route = `team/${teamSlug}/`;
  return await post(route, data);
};

// edit project
export const editProject = async (teamSlug, projectSlug, data) => {
  const route = `team/${teamSlug}/projects/${projectSlug}/`;
  return await put(route, data);
};

// delete project 
export const deleteProject = async(teamSlug, projectSlug) => {
    const route = `team/${teamSlug}/projects/${projectSlug}/`;
    return await del(route);
}
