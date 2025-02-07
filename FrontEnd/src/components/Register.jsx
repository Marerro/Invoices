import { useState, useEffect } from "react";
import { postUser } from "../helpers/post";
import { useForm } from "react-hook-form";

function Login() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await postUser(data);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
<div className="text-white text-center grid items-center h-[20vh]"></div>
<div className="mx-auto bg-[#1E2139] bg-opacity-80 h-[50vh] w-[25vw] border border-[#252945]">
  <div>
    <h1 className="text-white text-center text-[25px] pt-10">Register</h1>

    <form onSubmit={handleSubmit(onSubmit)}>
      
      {/* Name */}
      <div className="flex flex-col gap-3 pt-8">
        <label
          htmlFor="username"
          className="block inconsolata text-[25px] font-[500] text-white text-center"
        >
        </label>
        <input
          {...register("name")}
          type="text"
          id="username"
          placeholder="Username"
          className="block m-auto p-4 border w-[220px] h-[25px] text-red-800 border-gray-300 rounded-lg text-center"
        />

        {/* Email */}
        <label
          htmlFor="email"
          className="block text-[25px] font-[500] text-white text-center"
        >
        </label>
        <input
          {...register("email")}
          type="text"
          id="email"
          placeholder="Email"
          className="block m-auto p-4 border w-[220px] h-[25px] border-gray-300 rounded-lg text-center"
        />

        {/* Password */}
        <label
          htmlFor="password"
          className="block text-[25px] font-[500] text-white text-center"
        >
        </label>
        <input
          {...register("password")}
          type="password" 
          id="password"
          placeholder="Password"
          className="block m-auto p-4 border w-[220px] h-[25px] border-gray-300 rounded-lg text-center"
        />

        {/* Submit Button */}
        <div className="flex justify-center pt-8 pb-5">
          <button
            type="submit"
            className="w-[220px] h-[35px] text-gray-900 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-[#F7BE38]/90 focus:ring-1 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm text-center dark:focus:ring-[#F7BE38]/50"
          >
            Register
          </button>
        </div>
        </div>
      </form>
    </div>
  </div>

    </>
  );
}

export default Login;
