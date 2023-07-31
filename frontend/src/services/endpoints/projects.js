import { del, get, post, put } from "../utils/request";

// get project details
export const getProject = async (teamSlug, projectID) => {
  const route = `team/${teamSlug}/project/${projectID}/`;
  return await get(route);
};

// create project
export const createProject = async (teamSlug, data) => {
  const route = `team/${teamSlug}/`;
  return await post(route, data);
};

// edit project
export const editProject = async (teamSlug, projectID, data) => {
  const route = `team/${teamSlug}/project/${projectID}/`;
  return await put(route, data);
};

// delete project 
export const deleteProject = async (teamSlug, projectID) => {
  const route = `team/${teamSlug}/project/${projectID}/`;
  return await del(route);
};
