import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useStoreContext } from "../../Contexts/ContextApi";

const Navbar = () => {
  // const [loggedIn] = useState(false);

  const { token : loggedIn, setToken} = useStoreContext();
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("LS_JWT_TOKEN");
    navigate("/");
  };

  return (
    <>
      <div className="mb-18"></div>
      <nav className="fixed top-0 left-0 w-full bg-gradient-to-l from-blue-500 to-sky-700 text-white shadow-lg py-4 px-6 flex justify-between items-center z-50">
        {/* Gradient classnames for navbar ^ bg-gradient-to-r from-blue-700 to-purple-600  */}
        {/* Logo & Brand */}
        <Link to="/" className="flex gap-2 items-center">
          <img src={"ls-logo.png"} className="max-h-10" alt="Linkspark Logo" />
          <h1 className="text-xl md:text-2xl font-bold">Linkspark</h1>
        </Link>

        {/* Hamburger Menu (Mobile) */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl focus:outline-none">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Nav Links */}
        <div className={`md:flex md:items-center md:gap-6 text-sm md:text-base absolute md:relative top-16 md:top-0 w-full md:w-auto bg-blue-400 md:bg-transparent left-0 md:flex-row flex-col items-center p-5 md:p-0 transition-all duration-300 ease-in-out ${menuOpen ? "flex" : "hidden"}`}>
          <Link to="/" className="hover:text-gray-300 py-2 md:py-0">Home</Link>
          <Link to="/about" className="hover:text-gray-300 py-2 md:py-0">About</Link>

          {
            loggedIn 
            ? <Link to="/dashboard" className="hover:text-gray-300 py-2 md:py-0">Dashboard</Link>
            : <></> 
          }

          {/* Auth Buttons */}
          {loggedIn ? (
            <Link to="/" className="py-2 md:py-0">
              <button
              onClick={() => handleLogout()} 
              className="bg-red-500 text-white px-5 py-2 rounded-md font-semibold hover:bg-red-600 transition duration-200 cursor-pointer">
                Logout
              </button>
            </Link>
          ) : (
            <Link to="/signup" className="py-2 md:py-0">
              <button className="bg-green-500 text-white px-5 py-2 rounded-md font-semibold hover:bg-green-600 transition duration-200 cursor-pointer">
                Sign Up
              </button>
            </Link>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
