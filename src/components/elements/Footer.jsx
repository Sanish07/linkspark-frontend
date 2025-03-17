import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-tl from-blue-600 to-purple-500 text-white py-6 px-8">
      <div className="container mx-auto flex flex-wrap justify-between items-center text-center md:text-left">
        
        {/* Application Name */}
        <h1 className="text-lg md:text-xl font-bold">Linkspark</h1>

        {/* Copyright Text */}
        <p className="text-xs md:text-sm mt-2 md:mt-0">
          &copy; {new Date().getFullYear()} Linkspark. All rights reserved.
        </p>

        {/* Social Links */}
        <div className="flex space-x-4 mt-2 md:mt-0">
          <a
            href="https://github.com/your-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform transform hover:scale-110"
          >
            <FaGithub className="text-2xl hover:text-gray-300" />
          </a>
          <a
            href="https://linkedin.com/in/your-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform transform hover:scale-110"
          >
            <FaLinkedin className="text-2xl hover:text-blue-200" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
