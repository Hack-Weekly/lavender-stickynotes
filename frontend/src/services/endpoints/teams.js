import { del, get, post, put } from "../utils/request";

// get all teams
export const getTeams = async () => {
  const route = "/teams/";
  return await get(route);
};

// create a team
export const createTeam = async (data) => {
  const route = "/teams/";
  return await post(route, data);
};

// get team info
export const getTeam = async (slug) => {
  const route = "/team/" + slug + "/";
  return await get(route);
};

// edit team info
export const editTeam = async (slug, data) => {
  const route = "/team/" + slug + "/";
  return await put(route, data);
};

// add team
export const deleteTeam = async(slug) => {
    const route = "/team/" + slug + "/";
    return await del(route);
}

// Add team member
export const addMember = async(slug, data) => {
    const route = "/team/" + slug + "/";
    return await post(route, data);
}
