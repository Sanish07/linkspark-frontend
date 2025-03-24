import React from 'react';
import { useStoreContext } from '../Contexts/ContextApi';
import { Navigate } from 'react-router-dom';

const AuthenticatedRoutes = ({ children, isPublicPage }) => {
    
    const{ token } = useStoreContext();
    
    if(isPublicPage){
        return token ? <Navigate to={"/dashboard"}/> : children; 
        //If someone is trying to access a public page(route) but is already authenticated, then redirect to dashboard
        //Else render the children wrapped inside this component
    }

  return !token ? <Navigate to={"/login"}/> : children;
  //If someone is trying to access an authenticated page(route) but is not logged in, then redirect to login page
  //Else render the children wrapped inside this component
}

export default AuthenticatedRoutes;