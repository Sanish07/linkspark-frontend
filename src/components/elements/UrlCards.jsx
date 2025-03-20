import { IoCopy } from "react-icons/io5";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { ImStatsDots } from "react-icons/im";
import { TbHandClick } from "react-icons/tb";
import { IoIosNavigate } from "react-icons/io";
import { FaRegCalendarAlt } from "react-icons/fa";

const UrlCards = ({ isUrlDataLoading, urls, client_subdomain_url, loadingStateOn }) => {

    const date_options = { year: 'numeric', month: 'long', day: 'numeric' };

  return (
    <div className="mt-12">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Your Short URLs</h3>
      {isUrlDataLoading 
        ? <div className="flex justify-center items-center">Loading...</div> 
        : <div className="mt-6">
            <div className="grid grid-cols-1 gap-6">
                {urls.map((url, index) => (
                <div key={index} className="bg-white shadow-lg rounded-lg p-4 border border-gray-200">
                    <h4 className="flex gap-1 justify-start items-center text-blue-500 font-bold text-md cursor-pointer truncate hover:underline">
                        {`${client_subdomain_url}/${url.shortUrl}`} 
                        <IoIosNavigate />
                    </h4>
                    <p className="font-medium text-sm text-gray-800 truncate mt-1">{url.originalUrl}</p>
                    <div className="flex items-center justify-start gap-7 mt-7 text-gray-600 font-bold text-sm">
                        <div className="flex items-center gap-2 text-green-600">
                            <TbHandClick />
                            <span>{url.clickCount} Clicks</span>
                        </div>
                        <div className="flex items-center gap-2 text-orange-500">
                            <FaRegCalendarAlt />
                            <span>{new Date(url.createdAt).toLocaleDateString("en-US", date_options)}</span>
                        </div>
                    </div>
                    <div className="flex justify-end items-center gap-2 mt-4">
                        <button
                            onClick={() => {}}
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
