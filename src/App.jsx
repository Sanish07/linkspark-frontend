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

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Toaster position="bottom-center"/>
        <Navbar/>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/dashboard" element={<UserDashboard/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/about" element={<AboutUs/>}/>
          </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
