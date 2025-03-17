import React, { useState } from "react";
import { useForm } from "react-hook-form";
import InputBox from "./elements/InputBox";
import { Link } from "react-router-dom";
import { LoginUser } from "../services/ConnectAPI";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useStoreContext } from "../Contexts/ContextApi";

const Login = () => {

  const navigate = useNavigate();
  const { setToken } = useStoreContext();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onTouched",
  });

  const[loadingStateOn,setLoadingStateOn] = useState(false);

  const loginHandler = async (data) => {
    setLoadingStateOn(true);
    
    LoginUser(data).then((response) => { //Making API call for user login
      
      localStorage.setItem("LS_JWT_TOKEN",JSON.stringify(response.data.token));
      setToken(response.data.token); //Setting the JWT token in the application context 
      
      reset(); // Resetting form after successful registration
      toast.success('Logged In Successfully!');
      navigate("/dashboard");
    }).catch((res_error)=>{
      const error_message = res_error.message ? res_error.message + ". Make sure Username and Password are correct." : "Encountered an issue while logging in the user!!";
      toast.error(error_message);
    });

    setLoadingStateOn(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
        onSubmit={handleSubmit(loginHandler)}>
        
        {/* Form Title */}
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Login to Continue
        </h2>

        {/* Username Field */}
        <InputBox
          label="Username"
          id="l-username"
          name="username"
          type="text"
          placeholder="Enter your username"
          register={register}
          required={true}
          message="Username is required"
          errors={errors}
          className=""
        />

        {/* Password Field */}
        <InputBox
          label="Password"
          id="l-password"
          name="password"
          type="password"
          placeholder="Enter your password"
          register={register}
          required={true}
          message="Password is required"
          errors={errors}
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 cursor-pointer transition-all shadow-custom"
          disabled={loadingStateOn}>
          { loadingStateOn ? "Loading..." : "Login!" }
        </button>

        {/* Don't have an account yet? */}
        <p className="text-sm text-gray-600 mt-4 text-center">
          Don't have an account yet?{" "}
          <Link to="/signup" className="text-blue-500 font-medium hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
