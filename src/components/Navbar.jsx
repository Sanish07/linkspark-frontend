import React from 'react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-violet-600 text-white shadow-md py-4 px-6 flex justify-between items-center z-50">
        <div className="flex gap-3 items-center">
            <img src={"ls-logo.png"} className="max-h-12"/>
            <h1 className="text-xl md:text-2xl font-quicksand mt-0.5">Linkspark</h1>
        </div>
        <div className="flex items-center gap-7 text-xs md:text-base">
          <a href="#features" className="hover:text-gray-700">Features</a>
          <a href="#contact" className="hover:text-gray-700">Contact</a>
        </div>
      </nav>
  )
}

export default Navbar;