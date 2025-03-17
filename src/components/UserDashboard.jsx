import React from "react";
import ClickStatsChart from "./elements/ClickStatsChart";
import { click_data } from "../assets/SampleData";
import { HiUsers } from "react-icons/hi2";
import { FiUser, FiLink, FiActivity } from "react-icons/fi";

const UserDashboard = () => {

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 mt-20">
      {/* Sidebar */}
      <aside className="w-full md:w-1/4 lg:w-1/5 bg-white shadow-md p-5 md:min-h-screen">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
        <ul className="space-y-4">
          <li className="text-gray-700 hover:text-blue-500 font-medium cursor-pointer">
            📊 Analytics
          </li>
          <li className="text-gray-700 hover:text-blue-500 font-medium cursor-pointer">
            🔗 My Links
          </li>
          <li className="text-gray-700 hover:text-blue-500 font-medium cursor-pointer">
            ⚙️ Settings
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <StatCard icon={<HiUsers />} label="Total Users" value="12,345" color={"text-indigo-500"}/>
          <StatCard icon={<FiLink />} label="Your Total Links" value="12" color={"text-yellow-500"}/>
          <StatCard icon={<FiActivity />} label="Total Clicks on Your Links" value="3800" color={"text-green-500"}/>
        </div>

        {/* Click Stats Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Click Statistics</h2>
          <ClickStatsChart chartData={click_data} />
        </div>
      </main>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ icon, label, value, color = "text-blue-500"}) => {
  return (
    <div className="flex items-center bg-white p-5 rounded-lg shadow-md">
      <div className={"text-4xl "+color}>{icon}</div>
      <div className="ml-4">
        <p className="text-gray-500 text-sm">{label}</p>
        <h3 className="text-lg font-bold text-gray-800">{value}</h3>
      </div>
    </div>
  );
};

export default UserDashboard;
