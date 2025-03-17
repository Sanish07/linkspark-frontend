import React from "react";
import { FaChartBar } from "react-icons/fa";
import { FaSlideshare, FaBolt } from "react-icons/fa6";
import { MdOutlineSecurity } from "react-icons/md";

const HomePage = () => {
  
  return (
    <div className="bg-indigo-50 text-slate-900 mt-15">
      
      {/* Hero Section */}
      
      <header className="text-left py-20 px-6 bg-white">
        <div className="flex flex-col md:flex-row justify-around items-center">
            <div className="text-center md:text-left max-w-3/7">
                <h2 className="text-4xl font-extrabold text-gray-900">
                Transform Long URLs into Short, Shareable Links Instantly
                </h2>
                <p className="text-lg text-gray-600 mt-4">
                Linkspark makes link management effortless. Generate short links, track real-time stats,  
                and customize URLs to enhance your brand's visibility—all in just a few clicks.
                </p>
                <div className="flex gap-5 items-center">
                  <button className="mt-6 px-5 py-3 bg-custom-gradient-1 text-white font-semibold shadow-custom rounded-lg home-btn-1">
                      Generate Short Link!
                  </button>
                  <button className="mt-6 px-5 py-3 font-semibold rounded-lg home-btn-2 shadow-custom">
                      Configure Links
                  </button>
                </div>
            </div>
            <div className="mt-6 md:mt-0">
                <img src="header-art.png" className="w-80 md:w-96 mx-auto md:mx-0"/>
            </div>
        </div>
       </header>
        
      

      {/* Feature Cards Section */}

      <section id="features" className="py-16 px-6 max-w-7xl mx-auto">
        <h3 className="text-3xl font-bold text-center mb-8">Why Choose Linkspark?</h3>
        
        <div className="grid md:grid-cols-4 gap-8">
          
          <div className="p-6 border rounded-lg shadow-right bg-white">
            <FaSlideshare className="text-yellow-500 text-5xl mx-auto mb-4" />
            <h4 className="text-xl font-semibold">Effortless Link Shortening</h4>
            <p className="text-gray-600 mt-2">
            Create compact, shareable URLs in seconds. Our user-friendly interface lets you shorten links instantly, making sharing easier than ever.
            </p>
          </div>
          
          <div className="p-6 border rounded-lg shadow-right bg-white">
            <FaBolt className="text-rose-500 text-5xl mx-auto mb-4" />
            <h4 className="text-xl font-semibold">Blazing-Fast Performance</h4>
            <p className="text-gray-600 mt-2">
            Experience near-instant redirections with our high-speed infrastructure. Your links remain live, responsive, and always accessible.
            </p>
          </div>
          
          <div className="p-6 border rounded-lg shadow-right bg-white">
            <MdOutlineSecurity className="text-green-700 text-5xl mx-auto mb-4" />
            <h4 className="text-xl font-semibold">Reliable Security & Protection</h4>
            <p className="text-gray-600 mt-2">
            Your links are safeguarded with top-tier security. We use encryption and spam protection to ensure safe and reliable redirections.
            </p>
          </div>
          
          <div className="p-6 border rounded-lg shadow-right bg-white">
            <FaChartBar className="text-indigo-600 text-5xl mx-auto mb-4" />
            <h4 className="text-xl font-semibold">Advanced Analytics</h4>
            <p className="text-gray-600 mt-2">
            Monitor link performance with real-time analytics. And utilize them to conduct, implement and optimize your marketing strategies.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
