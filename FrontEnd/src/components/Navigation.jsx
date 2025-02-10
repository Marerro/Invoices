import React from "react";
import { MdLightMode } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router";
import { AiFillGitlab } from "react-icons/ai";
import { useContext } from "react";
import ThemeContext from "../contexts/ThemeContext";
import { FaHome } from "react-icons/fa";
import { UserContext } from "../contexts/UserContext";
import avatar from "../../images/avatar.svg";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router";
import { logout } from "../helpers/get";

function Navigation() {
  const { user, setUser } = useContext(UserContext);
  const { myTheme, setMyTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleThemeChange = () => {
    setMyTheme(myTheme === "dark" ? "light" : "dark");
    localStorage.setItem("myTheme", myTheme === "dark" ? "light" : "dark");
  };
  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 h-full w-[100px] bg-[#1E2139] grid grid-rows-2">
        <div className="flex flex-col justify-start align-center items-center">
          <AiFillGitlab className="w-[100px] h-[80px]  bg-purple-800 rounded-r-[13px] border-[1px] border-purple-600 radius-[15px]" />
        </div>
        <div className="flex flex-col justify-end items-center">
          <Link to="/">
            <button className="flex justify-center">
              <FaHome className="text-white text-[23px] absolute bottom-[200px]" />
            </button>
          </Link>
          <Link to="/register">
            <button className="flex justify-center">
              <FaUser className="text-white text-[20px] absolute bottom-[150px]" />
            </button>
          </Link>
          {/* will continue on here */}
          <button onClick={handleThemeChange} className="flex justify-center">
            <MdLightMode className="text-white text-[20px] absolute bottom-[100px]" />
          </button>

          <p className="border-[1px] border-gray-500 w-full absolute bottom-[70px]"></p>
          <p className="text-white flex justify-center absolute bottom-[20px]">
            <div
              className={`flex ${
                user ? "justify-between gap-3" : "justify-center"
              }`}
            >
              {user ? (
                <>
                  <img className="w-[35px] h-[35px]" src={avatar} alt="" />
                  <button onClick={() => handleLogout()}>
                    <CiLogout className="text-[25px]" />
                  </button>
                </>
              ) : (
                <p className="text-center">Please log in</p>
              )}
            </div>
          </p>
        </div>
      </div>
    </>
  );
}

export default Navigation;
