import { BrowserRouter, Route, Routes} from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";
import HomePage from "./components/HomePage";
import AboutUs from "./components/AboutUs";
import Navbar from "./components/elements/Navbar";
import Footer from "./components/elements/Footer";
import Signup from "./components/SignUp";
import Login from "./components/Login";
import UserDashboard from "./components/UserDashboard";
import { resolveSubdomain } from "./utilities/resolver";

function App() {
  
  const AccessComponent = resolveSubdomain();

  return (
    <>
      <BrowserRouter>
        <AccessComponent/>
      </BrowserRouter>
    </>
  );
}

export default App;
