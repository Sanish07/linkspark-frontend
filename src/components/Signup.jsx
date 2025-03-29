import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import InputBox from "./elements/InputBox";
import { Link, useNavigate } from "react-router-dom";
import { SignupUser } from "../services/AuthenticateAPI";

const Signup = () => {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  const[loadingStateOn,setLoadingStateOn] = useState(false);

  const signupHandler = async (data) => {
    setLoadingStateOn(true);
    
    SignupUser(data).then((response) => { //Making API call for registering the user
      reset(); // Resetting form after successful registration
      navigate("/login");
      toast.success('User signed up successfully! Please login to continue.');
    }).catch((res_error)=>{
      const error_message = res_error.response.data ? res_error.response.data : "Encountered an issue while signing up the user!!";
      toast.error(error_message);
    }).finally(()=>{
      setLoadingStateOn(false);
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
        onSubmit={handleSubmit(signupHandler)}>
        
        {/* Form Title */}
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Create Linkspark Account
        </h2>

        {/* Username Field */}
        <InputBox
          label="Username"
          id="s-username"
          name="username"
          type="text"
          placeholder="Enter your username"
          register={register}
          required={true}
          message="Username is required"
          min={5}
          errors={errors}
          className=""
        />

        {/* Email Field */}
        <InputBox
          label="Email"
          id="s-email"
          name="email"
          type="email"
          placeholder="Enter your email"
          register={register}
          required={true}
          message="Email is required"
          errors={errors}
        />

        {/* Password Field */}
        <InputBox
          label="Password"
          id="s-password"
          name="password"
          type="password"
          placeholder="Enter your password"
          register={register}
          required={true}
          message="Password is required"
          min={8}
          errors={errors}
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 cursor-pointer transition-all shadow-custom"
          disabled={loadingStateOn}>
          { loadingStateOn ? "Loading..." : "Sign Up" }
        </button>

        {/* Already have an account? */}
        <p className="text-sm text-gray-600 mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 font-medium hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
