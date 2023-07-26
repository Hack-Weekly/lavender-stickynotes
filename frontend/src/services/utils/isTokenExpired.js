import { get } from "./request"

export const isTokenExpired = async() => {
    try {
        await get("test/");
    }catch(error){
        if(error.status === 401){
            return true;
        }
    }
    return false;
}