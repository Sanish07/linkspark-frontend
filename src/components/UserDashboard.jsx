import React, { useState } from "react";
import ClickStatsLineChart from "./elements/charts/ClickStatsLineChart";
import { HiUsers } from "react-icons/hi2";
import { FiUser, FiLink, FiActivity } from "react-icons/fi";
import { useStoreContext } from "../Contexts/ContextApi";
import { useFetchTotalClicks } from "../services/QueryService";
import ClickStatsBarChart from "./elements/charts/ClickStatsBarChart";
import { BiErrorCircle } from "react-icons/bi";

const UserDashboard = () => {

  const { token } = useStoreContext();

  const onError = () => {
    console.log("ERROR!");
  }

  const {isLoading, data : totalClickData} = useFetchTotalClicks(token, onError);

  const [isLineChart, setIsLineChart] = useState(true);

  return (
    <>
      { isLoading ? 
      <div className="flex justify-center items-center">Loading...</div> 
      : <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
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
          <div className="bg-white p-6 rounded-lg shadow-md min-h-75">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Click Statistics</h2>
              {totalClickData.length === 0 ? 
                <div className="flex flex-col items-center justify-center text-center py-8">
                <BiErrorCircle className="text-red-500 text-4xl mb-2" />
                <h4 className="text-lg font-semibold text-red-500">
                  No click data found in this date range.
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  Share your short link to start tracking clicks.
                </p>
              </div>
              :
              <>
                  {/* Toggle Switch */}
                  <div className="flex items-center justify-end mb-4">
                    <span className={`text-sm font-medium ${isLineChart ? 'text-blue-600' : 'text-gray-600'}`}>Line Chart</span>
                    <label className="relative inline-flex items-center cursor-pointer mx-2">
                      <input type="checkbox" checked={!isLineChart} onChange={() => setIsLineChart(!isLineChart)} className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-400 rounded-full peer dark:bg-purple-600 peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-sky-600"></div>
                    </label>
                    <span className={`text-sm font-medium ${!isLineChart ? 'text-blue-600' : 'text-gray-600'}`}>Bar Chart</span>
                  </div>
          
                  {/* Chart Rendering */}
                  {isLineChart ? <ClickStatsLineChart chartData={totalClickData} /> : <ClickStatsBarChart chartData={totalClickData} />}
              </>
            }
          </div>
        </main>
      </div>}
    </>
    
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
