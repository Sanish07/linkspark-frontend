import { IoCopy } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { ImStatsDots } from "react-icons/im";
import { TbHandClick } from "react-icons/tb";
import { IoIosNavigate, IoMdRefreshCircle } from "react-icons/io";
import { FaRegCalendarAlt } from "react-icons/fa";
import toast from "react-hot-toast";

const UrlCards = ({ isUrlDataLoading, urls, client_subdomain_url, loadingStateOn, refreshUrlData }) => {

    //Config for date display style
    const date_options = { year: 'numeric', month: 'long', day: 'numeric' };
    
    //Function to handle URL List refresh
    const handleRefreshList = () => {
        toast.promise(
            refreshUrlData(),
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
                {urls.map((url, index) => (
                <div key={index} className="bg-white shadow-lg rounded-lg p-4 border border-gray-300">
                    <h4
                        className="inline-flex gap-1 justify-start items-center text-blue-500 font-bold text-md cursor-pointer truncate hover:underline">
                            <span onClick={() => handleShortUrlClick(`${client_subdomain_url}/${url.shortUrl}`)}>{`${client_subdomain_url}/${url.shortUrl}`}</span>
                            <IoIosNavigate />
                    </h4>
                    <p className="font-medium text-sm text-gray-800 truncate mt-1">{url.originalUrl}</p>
                    <div className="flex items-center justify-start gap-7 mt-7 text-gray-600 font-bold text-sm">
                        <div className="flex items-center gap-2 text-green-600">
                            <TbHandClick />
                            <span>{url.clickCount} Clicks</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600">
                            <FaRegCalendarAlt />
                            <span>{new Date(url.createdAt).toLocaleDateString("en-US", date_options)}</span>
                        </div>
                    </div>
                    <div className="flex justify-end items-center gap-2 mt-4">
                        <button
                            onClick={() => handleCopyUrl(`${client_subdomain_url}/${url.shortUrl}`)}
                            className="flex items-center justify-center gap-1.5 w-23 lg:w-26 py-2 bg-sky-500 text-white font-semibold rounded-full hover:bg-green-400 cursor-pointer transition-all"
                            disabled={loadingStateOn}>
                            <IoCopy/> Copy
                        </button>
                        <button
                            onClick={() => {}}
                            className="flex items-center justify-center gap-1.5 w-23 lg:w-26 py-2 bg-blue-500 text-white font-semibold rounded-full hover:bg-yellow-500 cursor-pointer transition-all"
                            disabled={loadingStateOn}>
                            <ImStatsDots /> Stats
                        </button>
                        <button
                            onClick={() => {}}
                            className="flex items-center justify-center gap-1.5 w-23 lg:w-26 py-2 bg-indigo-500 text-white font-semibold rounded-full hover:bg-red-600 cursor-pointer transition-all"
                            disabled={loadingStateOn}>
                            <MdDelete /> Delete
                        </button>
                    </div>
                </div>
                ))}
            </div>
        </div>
}
    </div>
  );
};

export default UrlCards;
