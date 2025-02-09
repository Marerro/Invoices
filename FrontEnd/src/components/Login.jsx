import { useState, useEffect } from "react";
import { loginAPI } from "../helpers/post";
import { set, useForm } from "react-hook-form";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router";
import axios from "axios";

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    try {
      const response = await loginAPI(data);
      setUser(response.data.data);
      setError(null); 
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if(error.response) {
          setError(error.response.data.message || "An error occurred");
        } else if (error.request) {
          setError("No response from server. Check internet connection");
        } else {
          setError("Something went wrong, please try again");
        }
      }else {
        setError("An uxepected error occurred, please try again");
      }
      }
  };


  return (
    <>
<div className="text-white text-center grid items-center h-[20vh]"></div>
<div className="mx-auto bg-[#1E2139] bg-opacity-80 h-[35vh] w-[20vw] border border-[#252945]">
  <div>
    <h1 className="text-white text-center text-[25px] pt-10">Login</h1>

    <form onSubmit={handleSubmit(onSubmit)}>
      
      {/* Name */}
      <div className="flex flex-col gap-3 pt-8">

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
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

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
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}

        {/* Submit Button */}
        <div className="flex justify-center pt-8 pb-5">
          <button
            type="submit"
            className="w-[220px] h-[35px] text-gray-900 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-[#F7BE38]/90 focus:ring-1 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm text-center dark:focus:ring-[#F7BE38]/50"
          >
            Login
          </button>
        </div>

        <div>
        </div>
        </div>
      </form>
    </div>
  </div>

    </>
  );
}

export default Login;
