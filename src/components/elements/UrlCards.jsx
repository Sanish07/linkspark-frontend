import React, { useEffect, useState } from "react";
import { IoCopy } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { ImStatsDots } from "react-icons/im";
import { TbHandClick } from "react-icons/tb";
import { IoIosNavigate, IoMdRefreshCircle } from "react-icons/io";
import { FaRegCalendarAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import { useFetchSingleUrlStats } from "../../services/QueryService";
import { useStoreContext } from "../../Contexts/ContextApi";
import StatsCharts from "./StatsCharts";
import LoadingSpinner from "./LoadingSpinner";
import { DeleteShortUrl } from "../../services/UrlManagementAPI";

const UrlCards = ({ isUrlDataLoading, urls, client_url, loadingStateOn, refreshUrlsData }) => {

    const { token } = useStoreContext();

    //Config for date display style
    const date_options = { year: 'numeric', month: 'long', day: 'numeric' };
    
    //Function to handle URL List refresh
    const handleRefreshList = () => {
        toast.promise(
            refreshUrlsData(),
             {
               loading: 'Refreshing...',
               success: <>URLs list updated successfully!</>,
               error: <>Encountered an error while fetching the data!</>,
             },
             {
                duration : 2000
             }
        );
    }

    //Function to handle Short URL Link click
    const handleShortUrlClick = (shortUrl) => {
        window.open(shortUrl,"_blank");
    }

    //Function to handle URL link copy action
    const handleCopyUrl = (shortUrl) => {
        navigator.clipboard.writeText(shortUrl);
        toast.success("URL copied to clipboard",{
            duration : 2000
        });
    }

    const[selectedUrlData, setSelectedUrlData] = useState({id : -1, shortUrl : ""});

    useEffect(()=>{
        refreshSingleUrl(); //Whenever stats button is pressed, query service hook is called for refreshing single url stats
    },[selectedUrlData]);

    //Function to open specific Short URLs stats
    const handleOpenStats = (data) => {
        if(selectedUrlData && selectedUrlData.id === data.id){
            setSelectedUrlData({id : -1, shortUrl : ""});
        } else{
            setSelectedUrlData(data);
        }
    }

    const onError = () => {
        console.log("ERROR!");
    }

    //Fetch specific url stats
    const { isLoading : urlDataLoading, data : urlData, refetch : refreshSingleUrl} = useFetchSingleUrlStats(token, selectedUrlData.shortUrl, onError);

    //Function to delete specific Short URL
    const handleDeleteUrl = (data) => {
        // console.log(data.shortUrl);
        let deletion_res = 
                window.confirm("Are you sure you want to delete the short url : /"+ data.shortUrl);
        if(deletion_res){        
            DeleteShortUrl(data.shortUrl, token).then((response)=>{
                toast.success("URL deleted successfully!!");
                refreshUrlsData();
            }).catch((err)=>{
                toast.error("Encountered issues while deleting the URL.");
            });
        }
    }

  return (
    <div className="mt-12">
        <h3 className="flex justify-start items-center gap-2 text-lg font-semibold mb-4 text-gray-800">
            Your Short URLs
            <span className="cursor-pointer text-2xl text-pink-400 hover:rotate-180 hover:text-pink-500 transition-all" onClick={handleRefreshList}><IoMdRefreshCircle /></span>
        </h3>
      {isUrlDataLoading 
        ? <div className="flex justify-center items-center">Loading...</div> 
        : <div className="mt-6">
            <div className="grid grid-cols-1 gap-6">
                {
                urls.map((url, index) => (
                <div key={index} className="bg-white shadow-lg rounded-lg p-4 border border-gray-300">
                    <h4
                        className="inline-flex gap-1 justify-start items-center text-blue-500 font-bold text-md cursor-pointer truncate hover:underline">
                            <span onClick={() => handleShortUrlClick(`${client_url}/l/${url.shortUrl}`)}>{`${client_url}/l/${url.shortUrl}`}</span>
                            <IoIosNavigate />
                    </h4>
                    <p className="font-medium text-sm text-gray-800 truncate mt-1">{url.originalUrl}</p>
                    <div className="flex items-center justify-start gap-7 mt-7 text-gray-600 font-bold text-sm">
                        <div className="flex items-center gap-1 text-green-600">
                            <span className="text-lg"><TbHandClick /></span>
                            <span>{url.clickCount} Clicks</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-600">
                            <FaRegCalendarAlt />
                            <span>{new Date(url.createdAt).toLocaleDateString("en-US", date_options)}</span>
                        </div>
                    </div>
                    <div className="flex justify-end items-center gap-2 mt-4">
                        <button
                            onClick={() => handleCopyUrl(`${client_url}/l/${url.shortUrl}`)}
                            className="flex items-center justify-center gap-1.5 w-23 lg:w-26 py-2 bg-sky-500 text-white font-semibold rounded-full hover:bg-green-400 cursor-pointer transition-all"
                            disabled={loadingStateOn}>
                            <IoCopy/> Copy
                        </button>
                        <button
                            onClick={() => handleOpenStats(url)}
                            className="flex items-center justify-center gap-1.5 w-23 lg:w-26 py-2 bg-blue-500 text-white font-semibold rounded-full hover:bg-yellow-500 cursor-pointer transition-all"
                            disabled={loadingStateOn}>
                            <ImStatsDots /> Stats
                        </button>
                        <button
                            onClick={() => handleDeleteUrl(url)}
                            className="flex items-center justify-center gap-1.5 w-23 lg:w-26 py-2 bg-indigo-500 text-white font-semibold rounded-full hover:bg-red-600 cursor-pointer transition-all"
                            disabled={loadingStateOn}>
                            <MdDelete /> Delete
                        </button>
                    </div>
                    {
                        (url.id === selectedUrlData.id) ? 
                        <div className="mt-10 mb-10">
                            {
                                (urlDataLoading) 
                                ? <LoadingSpinner size={60}/> 
                                : <StatsCharts totalClickData={urlData}/>
                            }
                        </div>
                        : <></>
                    }
                </div>
                ))}
            </div>
            
        </div>
}
    </div>
  );
};

export default UrlCards;
