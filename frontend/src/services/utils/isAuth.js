import api from "../api";
import { logout, getRefreshToken } from "../endpoints/users";
import { isTokenExpired } from "./isTokenExpired";


export const isAuth = async() => {
    const refreshToken = localStorage.getItem("refreshToken");
    const accessToken = localStorage.getItem("accessToken");
    if (!refreshToken || !accessToken) {
      console.error("No refresh token or access token provided!")
      return false;
    }
    try {
      // Check if the access token is valid by refreshing it
      if(isTokenExpired()){
      const response = await getRefreshToken(refreshToken);
      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem("accessToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);
        api.defaults.headers.common["Authorization"] = "Bearer " + data.access;
        return true; // User is authenticated
      }
    }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Token is blacklisted or invalid
        logout();
      }
      console.error(error);
      return false; // User is not authenticated
    }
}