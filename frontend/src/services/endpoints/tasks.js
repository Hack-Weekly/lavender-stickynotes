import { del, post, put } from "../utils/request";


// create project
export const createTask = async (teamSlug, projectID ,data) => {
    const route = `team/${teamSlug}/project/${projectID}/task/`;
  return await post(route, data);
};

// edit project
export const editTask = async (teamSlug, projectID, data) => {
  const route = `team/${teamSlug}/project/${projectID}/task/`;
  //return await put(route, data);
};

// delete project
export const deleteTask = async (teamSlug, projectID) => {
  const route = `team/${teamSlug}/project/${projectID}/task/`;
  //return await del(route);
};
