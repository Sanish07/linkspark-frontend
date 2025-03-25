import React from 'react';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import HomePage from "./components/HomePage";
import AboutUs from "./components/AboutUs";
import Navbar from "./components/elements/Navbar";
import Footer from "./components/elements/Footer";
import Signup from "./components/SignUp";
import Login from "./components/Login";
import UserDashboard from "./components/UserDashboard";
import UrlRedirectionPage from './components/UrlRedirectionPage';
import AuthenticatedRoutes from './configurations/AuthenticatedRoutes';
import ErrorPage from './components/ErrorPage';

export const SubdomainRouter = () => {
    return(
        <Routes>
            <Route path="/:url" element={<UrlRedirectionPage/>}/>
        </Routes>
    )
};

const AppRouter = () => {
  return (
    <>
        <Toaster position="bottom-center"/>
        <Navbar/>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/about" element={<AboutUs/>}/>

            //Authenticated Routes
            <Route path="/dashboard" 
            element={
              <AuthenticatedRoutes isPublicPage={false}>
                <UserDashboard/>
              </AuthenticatedRoutes>
            }/>

            //Public Routes
            <Route path="/signup" 
            element={
              <AuthenticatedRoutes isPublicPage={true}>
                <Signup/>
              </AuthenticatedRoutes>
            }/>

            <Route path="/login" 
            element={
              <AuthenticatedRoutes isPublicPage={true}>
                <Login/>
              </AuthenticatedRoutes>
            }/>

            //Common Other Routes 
            <Route path="/error" 
            element={
              <ErrorPage/>
            }/>

            <Route path="*" 
            element={
              <ErrorPage message={"Cannot find the requested page, it was either permenantly removed or never existed!"}/>
            }/>

          </Routes>
        <Footer/>
    </>
  )
}

export default AppRouter;