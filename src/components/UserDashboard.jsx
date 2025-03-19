import React, { useState } from "react";
import ClickStatsLineChart from "./elements/charts/ClickStatsLineChart";
import { HiUsers } from "react-icons/hi2";
import { FiLink, FiActivity, FiList, FiPlus, FiX, FiCheck } from "react-icons/fi";
import { useStoreContext } from "../Contexts/ContextApi";
import { useFetchTotalClicks } from "../services/QueryService";
import ClickStatsBarChart from "./elements/charts/ClickStatsBarChart";
import { BiErrorCircle } from "react-icons/bi";
import StatCard from "./elements/StatCard";
import { useForm } from "react-hook-form";
import InputBox from "./elements/InputBox";
import toast from "react-hot-toast";
import { CreateNewShortURL } from "../services/UrlManagementAPI";

const UserDashboard = () => {

  //Token from Context API
  const { token } = useStoreContext();

  //React Query states and funs
  const onError = () => {
    console.log("ERROR!");
  }

  const {isLoading, data : totalClickData} = useFetchTotalClicks(token, onError);

  //Chart toggle state
  const [isLineChart, setIsLineChart] = useState(true);

  //Short URL creation and list display states and variables
  const [isCreating, setIsCreating] = useState(false);
  
  const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm({
      defaultValues: {
        originalUrl : ""
      },
      mode: "onTouched",
    });

  
  const[loadingStateOn,setLoadingStateOn] = useState(false);

  const handleCreateShortUrl = async(data) => {
    // toast.success(data.originalUrl);
    setLoadingStateOn(true);

    CreateNewShortURL(data,token).then((response)=>{
      reset(); // Resetting the URL enter field
      setIsCreating(false);
      toast.success('Short URL created successfully!');
    }).catch((res_error)=>{
      const error_message = res_error.response.data ? res_error.response.data : "Encountered an issue while creating the short URL!!";
      toast.error(error_message);
    });

    setLoadingStateOn(false);
  };

  const [urls,ssetUrls] = useState([
    { original: "https://example.com", short: "https://sho.rt/abc", clicks: 120, createdAt: "2025-03-19" },
    { original: "https://google.com", short: "https://sho.rt/xyz", clicks: 250, createdAt: "2025-03-18" }
  ]);

  return (
    <>
      { isLoading ? 
      <div className="flex justify-center items-center">Loading...</div> 
      : <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
        {/* Dashboard Sidebar (Left side) */}
        <aside className="w-full md:w-1/4 lg:w-1/5 bg-gray-800 shadow-lg p-6 md:min-h-screen">
          <h1 className="text-2xl font-bold text-gray-100 mb-8">Dashboard</h1>
          <ul className="space-y-6">
            <li className="text-gray-200 hover:bg-gray-700 px-4 py-3 rounded-lg cursor-pointer transition-all flex items-center gap-3">
              <FiLink className="text-blue-400 text-lg" /> Create New Short URL
            </li>
            <li className="text-gray-200 hover:bg-gray-700 px-4 py-3 rounded-lg cursor-pointer transition-all flex items-center gap-3">
              <FiList className="text-blue-400 text-lg" /> View Full List of URLs
            </li>
          </ul>
        </aside>

        {/* Main Content (Right Side) */}
        <main className="flex-1 p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <StatCard icon={<HiUsers />} label="Total Users" value="12,345" color={"text-indigo-500"}/>
            <StatCard icon={<FiLink />} label="Your Total Links" value="12" color={"text-yellow-500"}/>
            <StatCard icon={<FiActivity />} label="Total Clicks on Your Links" value="3800" color={"text-green-500"}/>
          </div>

          {/* Click Stats Chart Section */}
          <div className="bg-white p-6 rounded-lg shadow-md min-h-75 mb-6">
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
                    <span className={`text-sm font-medium ${isLineChart ? 'text-purple-600' : 'text-gray-600'}`}>Line Chart</span>
                    <label className="relative inline-flex items-center cursor-pointer mx-2">
                      <input type="checkbox" checked={!isLineChart} onChange={() => setIsLineChart(!isLineChart)} className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer dark:bg-purple-600 peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-sky-600"></div>
                    </label>
                    <span className={`text-sm font-medium ${!isLineChart ? 'text-blue-600' : 'text-gray-600'}`}>Bar Chart</span>
                  </div>
          
                  {/* Chart Rendering */}
                  {isLineChart ? <ClickStatsLineChart chartData={totalClickData} /> : <ClickStatsBarChart chartData={totalClickData} />}
              </>
            }
          </div>

          {/* Short URL Management Section */}
          <div className="bg-white p-6 rounded-lg shadow-md min-h-75">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Short URLs Management</h2>
            {!isCreating ? (
              <button
                className="flex items-center short-url-btn bg-gradient-to-l from-blue-500 to-purple-400 text-white px-4 py-2 rounded-lg gap-2 cursor-pointer"
                onClick={() => setIsCreating(true)}
              >
                <FiPlus /> Create New Short URL
              </button>
            ) : (
              <div className="mt-4">
                <form
                  className="bg-white rounded-lg p-8 w-full"
                  onSubmit={handleSubmit(handleCreateShortUrl)}>

                    <InputBox
                      label="Enter The Original URL*"
                      id="d-create"
                      name="originalUrl"
                      type="url"
                      placeholder="https://internet.com"
                      register={register}
                      required={true}
                      message="URL field cannot be empty"
                      errors={errors}
                    />

                    <div className="flex justify-start items-center gap-3">
                      <button
                        type="submit"
                        className="flex items-center justify-center gap-2 w-35 mt-4 py-2 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-green-700 cursor-pointer transition-all shadow-custom"
                        disabled={loadingStateOn}>
                        <FiCheck /> { loadingStateOn ? "Loading..." : "Create" }
                      </button>
                      <button
                        onClick={() => { 
                          reset();
                          setIsCreating(false);
                        }}
                        className="flex items-center justify-center gap-2 w-35 mt-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-red-600 cursor-pointer transition-all shadow-custom"
                        disabled={loadingStateOn}>
                          <FiX /> { loadingStateOn ? "Loading..." : "Cancel" }
                      </button>
                    </div>
                </form>
              </div>
            )}
            
            {/* Short URLs displayed in tables */}
            <div className="mt-12">
              <h3 className="text-lg font-semibold mb-3">Your Short URLs</h3>
              <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-blue-500 text-white">
                      <th className="border border-white px-4 py-2 text-center">Sr No.</th>
                      <th className="border border-white px-4 py-2 text-center">Original URL</th>
                      <th className="border border-white px-4 py-2 text-center">Short URL</th>
                      <th className="border border-white px-4 py-2 text-center">Total Clicks</th>
                      <th className="border border-white px-4 py-2 text-center">Created At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {urls.map((url, index) => (
                      <tr key={index} className="border border-gray-300">
                        <td className="border border-gray-300 px-4 py-2 text-center truncate max-w-xs">{index + 1}</td>
                        <td className="border border-gray-300 px-4 py-2 text-center truncate max-w-xs">{url.original}</td>
                        <td className="border border-gray-300 px-4 py-2 text-center text-blue-500 cursor-pointer">{url.short}</td>
                        <td className="border border-gray-300 px-4 py-2 text-center">{url.clicks}</td>
                        <td className="border border-gray-300 px-4 py-2 text-center">{url.createdAt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </main>
      </div>}
    </>
    
  );
};

export default UserDashboard;
