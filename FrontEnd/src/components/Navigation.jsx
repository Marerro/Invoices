import React from "react";
import logo from "../../images/logo.svg";
import { MdLightMode } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router";

function Navigation() {
  return (
    <>
      <div className="fixed top-0 left-0 h-full w-[100px] bg-[#1E2139] grid grid-rows-2">
        <div className="flex flex-col justify-start align-center items-center">
          <img
            src={logo}
            alt="logo"
            className="w-[150px] bg-purple-800 rounded-r-[13px] border-[1px] border-purple-600 radius-[15px]"
          />
        </div>
        <div className="flex flex-col justify-end items-center">
          <Link to="/login">
            <button className="flex justify-center">
              <FaUser className="text-white text-[20px] absolute bottom-[150px]" />
            </button>
            </Link>
            {/* will continue on here */}
            <button className="flex justify-center">
              <MdLightMode className="text-white text-[20px] absolute bottom-[100px]" />
            </button>

          <p className="border-[1px] border-gray-500 w-full absolute bottom-[70px]"></p>
          <p className="text-white flex justify-center absolute bottom-[20px]">
            Avatar
          </p>
        </div>
      </div>
    </>
  );
}

export default Navigation;
