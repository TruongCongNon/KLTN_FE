import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DensityMediumRoundedIcon from "@mui/icons-material/DensityMediumRounded";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LogoutIcon from "@mui/icons-material/Logout";
import Avatar from "@mui/material/Avatar";
import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";
import SettingsIcon from "@mui/icons-material/Settings";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { logOut } from "../../../redux/apiRequest";

const Header = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.login.currentUser);
  const accessToken = useSelector(
    (state) => state.auth.login.currentUser?.accessToken
  );
  console.log(accessToken);

  const handleClickOpenMenu = () => {
    setIsOpenMenu((prev) => !prev);
  };

  useEffect(() => {
    const handleclickCloseMenu = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpenMenu(false);
      }
    };
    if (isOpenMenu) {
      document.addEventListener("mousedown", handleclickCloseMenu);
    }
    return () => {
      document.removeEventListener("mousedown", handleclickCloseMenu);
    };
  }, [isOpenMenu]);
  const handleLogOut = () => {
    logOut(dispatch, navigate, accessToken);
    setIsOpenMenu(false);
  };
  return (
    <div className=" flex justify-between items-center px-6 py-4 sm:py-1 text-[#8B8E99] lg:px-40 bg-black  ">
      <Link to="/" className="flex items-center font-bold cursor-pointer ">
        <img src={logo} alt="" />
        <p className="text-[1.5rem]">SmartNova</p>
      </Link>
      <div className="hidden sm:flex">
        <ul className="flex font-bold items-center space-x-6 ">
         
          <li>Contact</li>
          <li>About</li>
          <li>Service </li>
        </ul>
      </div>
      <div className="sm:flex space-x-4 hidden font-bold text-white ">
        {user ? (
          <>
            <div className=" cursor-pointer mr-10  ">
              <Link to="/cart"><ShoppingCartIcon></ShoppingCartIcon></Link>
            </div>
            <div
              className="flex relative items-center justify-around cursor-pointer space-x-1 "
              onClick={handleClickOpenMenu}
            >
              <Avatar sx={{ width: 30, height: 30 }}></Avatar>{" "}
              <ArrowDropDownIcon></ArrowDropDownIcon>
            </div>
            {isOpenMenu && (
              <ul
                ref={menuRef}
                className={`absolute top-14 border rounded-sm p-3 right-36 space-y-3 shadow-lg  z-10 bg-white text-black ${
                  isOpenMenu ? "block" : "hidden"
                }`}
              >
                <li>
                  <HowToRegIcon></HowToRegIcon>Profile
                </li>
                <li>
                  <SettingsIcon></SettingsIcon> Setting
                </li>
                <li>
                  <div>
                    <p onClick={handleLogOut}>
                      <LogoutIcon></LogoutIcon>Logout
                    </p>
                  </div>
                </li>
              </ul>
            )}
          </>
        ) : (
          <Link to="/login" className="cursor-pointer">
            Login
          </Link>
        )}
      </div>
      <div className="sm:hidden" onClick={handleClickOpenMenu}>
        <DensityMediumRoundedIcon
          fontSize="large"
          className=" cursor-pointer"
        ></DensityMediumRoundedIcon>
      </div>
      {isOpenMenu && (
        <div className="fixed transition-transform  ease-in-out top-0 right-0 bottom-0 w-1/2  backdrop-brightness-[0.1] text-white sm:hidden z-50 shadow-lg ">
          <div className="text-right p-5">
            <CloseRoundedIcon
              fontSize="large"
              className="cursor-pointer"
              onClick={handleClickOpenMenu}
            ></CloseRoundedIcon>
          </div>
          <div>
            <ul className="flex flex-col items-center space-y-4 py-4 font-bold">
              <li>Contact</li>
              <li>About</li>
              <li>Service</li>
              <li className="text-red-600 cursor-pointer">Logout</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
export default Header;
