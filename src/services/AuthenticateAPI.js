import Axios from "axios";

const baseURL = import.meta.env.VITE_SERVER_URL;

export const SignupUser = async(data) => {
    const route = baseURL + "/api/auth/public/signup";
    return await Axios.post(route, data);
};

export const LoginUser = async(data) => {
    const route = baseURL + "/api/auth/public/login";
    return await Axios.post(route, data);
};

export const GetGlobalUsersCount = async() =>{
    const route = baseURL + "/api/auth/total-users";
    return await Axios.get(route);
}