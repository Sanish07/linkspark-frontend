import { FaExclamationTriangle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ErrorPage = ({ message }) => {

    const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-163 p-6">
      <div className="flex flex-col justify-center items-center bg-slate-200 p-8 rounded-2xl shadow-lg text-center max-w-lg">
        <FaExclamationTriangle className="text-rose-600 text-6xl mb-4" />
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">Oops! Something went wrong</h1>
        <p className="text-gray-600 mb-6 text-sm md:text-base">{message || "An unexpected error occurred. Please try again later."}</p>
        <button 
          onClick={() => {
            navigate("/")
          }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 ease-in-out cursor-pointer">
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
