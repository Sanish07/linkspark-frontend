import React, { useState } from "react";
import { HiUsers } from "react-icons/hi2";
import { FiLink, FiActivity, FiList, FiPlus, FiX, FiCheck } from "react-icons/fi";
import { useStoreContext } from "../Contexts/ContextApi";
import { useFetchAllUrlData, useFetchTotalClicks } from "../services/QueryService";
import { BiErrorCircle } from "react-icons/bi";
import StatCard from "./elements/StatCard";
import { useForm } from "react-hook-form";
import InputBox from "./elements/InputBox";
import toast from "react-hot-toast";
import { CreateNewShortURL } from "../services/UrlManagementAPI";
import UrlCards from "./elements/UrlCards";
import StatsCharts from "./elements/StatsCharts";
import { GetGlobalUsersCount } from "../services/AuthenticateAPI";

const UserDashboard = () => {
  
  //Short URL links redirection subdomain 
  const client_subdomain_url = import.meta.env.VITE_CLIENT_SUBDOMAIN_URL;

  //Token from Context API
  const { token } = useStoreContext();

  //React Query states and funs
  const onError = () => {
    console.log("ERROR!");
  }

  const {isLoading : isClickDataLoading, data : totalClickData} = useFetchTotalClicks(token, onError);


  //Short URL creation
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
    setLoadingStateOn(true);

    CreateNewShortURL(data,token).then((response)=>{
      const generated_s_url = 
            response.data.shortUrl ? `${client_subdomain_url}/${response.data.shortUrl}` : "";

      navigator.clipboard.writeText(generated_s_url); //Copy newly generated short url to clipboard
      reset(); // Resetting the URL enter field
      setIsCreating(false); //Exit the url creation mode
      toast.success('Short URL created successfully and copied to clipboard!',{
        duration : 3000
      });
    }).catch((res_error)=>{
      const error_message = res_error.response.data ? res_error.response.data : "Encountered an issue while creating the short URL!!";
      toast.error(error_message);
    });

    setLoadingStateOn(false);
  };

  //Get total active users on our application(Global users count)
  const[totalUsersCount, setTotalUsersCount] = useState("-");

  GetGlobalUsersCount().then((response)=>{
    setTotalUsersCount(response.data);
  }).catch((res_error)=>{
      const error_message = res_error.response.data ? res_error.response.data : "Encountered an issue while fetching Global Active Users count!!";
      toast.error(error_message);
  });

  // Display all User's URLs
  const dataFetchError = () => {
    console.log("ERROR!");
  }

  const {isLoading : isUrlDataLoading, data : urls = [], refetch : refreshUrlData} = useFetchAllUrlData(token, dataFetchError);

  //Stat Cards Info
  const stats_data = {
    totalUsers : totalUsersCount,
    userLinks : (urls.length ? urls.length : "0"),
    totalUserLinksClicks : (urls.length > 0 ? 
      urls.reduce((total,currentUrl) => 
        {
          return total + currentUrl.clickCount
        }, 0) 
        : 
        "0")
  };

  return (
    <>
      { isClickDataLoading ? 
      <div className="flex justify-center items-center">Loading...</div> 
      : <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
        {/* Dashboard Sidebar (Left side) */}
        <aside className="w-full md:w-1/4 lg:w-1/5 bg-gray-800 shadow-lg p-6 md:min-h-screen">
          <h1 className="text-2xl font-bold text-gray-100 mb-8">Dashboard</h1>
          <ul className="space-y-6">
            <li className="text-gray-200 hover:bg-gray-700 px-4 py-3 rounded-lg cursor-pointer transition-all">
              <a href="#create-section" className="flex items-center gap-3"><FiLink className="text-blue-400 text-lg" /> Create New Short URL</a>
            </li>
            <li className="text-gray-200 hover:bg-gray-700 px-4 py-3 rounded-lg cursor-pointer transition-all flex items-center gap-3">
              <a href="#url-section" className="flex items-center gap-3"><FiList className="text-blue-400 text-lg" /> View Full List of URLs</a>
            </li>
          </ul>
        </aside>

        {/* Main Content (Right Side) */}
        <main className="flex-1 p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <StatCard icon={<HiUsers />} label="Total Users" value={stats_data.totalUsers} color={"text-indigo-500"}/>
            <StatCard icon={<FiLink />} label="Your Total Links" value={stats_data.userLinks} color={"text-yellow-500"}/>
            <StatCard icon={<FiActivity />} label="Total Clicks on Your Links" value={stats_data.totalUserLinksClicks} color={"text-green-500"}/>
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
                <StatsCharts totalClickData={totalClickData}/>
            }
          </div>

          {/* Short URL Management Section */}
          <div className="bg-white p-6 rounded-lg shadow-md min-h-75">
            <h2 id="create-section" className="text-xl font-bold text-gray-800 mb-4">Short URLs Management</h2>
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
            
            {/* Short URLs displayed in cards */}
            <span id="url-section"></span>
            <UrlCards 
              isUrlDataLoading={isUrlDataLoading} 
              urls={urls} 
              client_subdomain_url={client_subdomain_url} 
              loadingStateOn={loadingStateOn}
              refreshUrlsData={refreshUrlData}/>
            
          </div>
        </main>
      </div>}
    </>
    
  );
};

export default UserDashboard;
