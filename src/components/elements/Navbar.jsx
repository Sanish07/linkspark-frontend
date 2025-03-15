import React, { useState } from 'react';
import { Link } from "react-router-dom";

const Navbar = () => {
  const[loggedIn] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-custom-gradient-2 text-white shadow-md py-4 px-6 flex justify-between items-center z-50">
        <Link to="/">
        <div className="flex gap-1.5 items-center">
            <img src={"ls-logo.png"} className="max-h-12"/>
            <h1 className="text-xl md:text-2xl font-bold mt-0.5">Linkspark</h1>
        </div>
        </Link>
        <div className="flex items-center gap-4 md:gap-7 text-xs md:text-base">
          <Link to="/" className="hover:text-gray-700">Home</Link>
          <Link to="/about" className="hover:text-gray-700">About</Link>
          <Link to="" className="hover:text-gray-700">
            {
              loggedIn === false ?
              <button className="bg-green-600 text-white px-5 py-1.5 rounded-md font-semibold cursor-pointer hover:bg-green-700 shadow-custom">Sign Up</button>
              :  <button className="bg-red-500 text-white px-5 py-1.5 rounded-md font-semibold cursor-pointer hover:bg-red-600 shadow-custom">Logout</button>
            }
            
          </Link>
        </div>
      </nav>
  )
}

export default Navbar;