import React, { useState } from "react";
import { useForm } from "react-hook-form";
import InputBox from "./elements/InputBox";
import { Link } from "react-router-dom";

const Login = () => {
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
    console.log("User Data:", data);
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
          min={5}
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
          min={8}
          errors={errors}
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 cursor-pointer transition-all shadow-custom"
          disabled={setLoadingStateOn}>
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
