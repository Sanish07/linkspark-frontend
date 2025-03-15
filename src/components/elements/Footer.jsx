import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="flex justify-between items-center py-6 px-6 pl-22 pr-22 bg-custom-gradient-1 shadow-md">
      {/* Brand Name */}
      <h1 className="md:text-lg text-base font-bold text-blue-50">Linkspark</h1>

      {/* Copyright Text */}
      <p className="text-pink-50 text-xs md:text-sm">&copy; {new Date().getFullYear()} Linkspark. All rights reserved.</p>

      {/* Social Links */}
      <div className="flex space-x-4">
        <a href="https://github.com/your-profile" target="_blank" rel="noopener noreferrer">
          <FaGithub className="text-xl text-slate-100 hover:text-gray-900" />
        </a>
        <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="text-xl text-slate-100 hover:text-blue-500 hover:bg-blue-50" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
