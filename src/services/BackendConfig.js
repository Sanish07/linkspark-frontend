import Axios from "axios";

const baseURL = import.meta.env.VITE_SERVER_URL;

export const SignupUser = async(data) => {
    const route = baseURL + "/api/auth/public/signup";
    return await Axios.post(route, data);
};