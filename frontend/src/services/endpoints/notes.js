import { del, post, put } from "../utils/request";

// create project
export const createNote = async (teamSlug, projectID, data) => {
  const route = `team/${teamSlug}/project/${projectID}/note/`;
  return await post(route, data);
};

// edit project
export const editNote = async (teamSlug, projectID, data) => {
  const route = `team/${teamSlug}/project/${projectID}/note/`;
  //return await put(route, data);
};

// delete project
export const deleteNote = async (teamSlug, projectID) => {
  const route = `team/${teamSlug}/project/${projectID}/note/`;
  //return await del(route);
};
