import { createContext, useContext, useState } from "react";

const ContextApi = createContext();

export const ContextProvider = ({ children }) =>{
    const ls_token = localStorage.getItem("LS_JWT_TOKEN"); //Getting data from the local storage
    const loginToken = ls_token ? JSON.parse(ls_token) : null;

    const[token, setToken] = useState(loginToken); //Creating state for JWT Token 

    const tokenData = { //Object for providing data to application requiring token for sending API requests
        token, 
        setToken
    };

    return <ContextApi.Provider value={tokenData}>{children}</ContextApi.Provider>
};

export const useStoreContext = () => { //Custom hook for accessing values in components
    return useContext(ContextApi);
}