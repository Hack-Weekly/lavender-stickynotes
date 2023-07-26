import api from "../api";

export async function get(endpoint) {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    console.error("GET request error ", error);
    throw error;
  }
}

export async function post(endpoint, data) {
  try {
    const response = await api.post(endpoint, data);
    return response;
  } catch (error) {
    console.error("POST request error ", error);
    throw error;
  }
}

export async function put(endpoint, data) {
  try {
    const response = await api.put(endpoint, data);
    return response.status;
  } catch (error) {
    console.error("PUT request error", error);
    throw error;
  }
}

export async function del(endpoint) {
  try {
    const response = await api.delete(endpoint);
    return response.status;
  } catch (error) {
    console.error("DELETE request error", error);
    throw error;
  }
}
