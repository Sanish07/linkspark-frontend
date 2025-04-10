import Axios from "axios";

const baseURL = import.meta.env.VITE_SERVER_URL;

export const CreateNewShortURL = async(data, token) => {
    const route = baseURL + "/api/urls/shorten";

    const header_data = {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          }
    };

    return await Axios.post(route, data, header_data);
};

export const DeleteShortUrl = async(url, token) => {
    const route = baseURL + "/api/urls/delete/" + url;

    const header_data = {
        headers: {
            Authorization: `Bearer ${token}`,
          }
    };

    return await Axios.delete(route, header_data);
};

