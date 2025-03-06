import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DensityMediumRoundedIcon from "@mui/icons-material/DensityMediumRounded";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";
import { logOut } from "../../../redux/api/authApiRequest";


const Header = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.login.currentUser);
  const accessToken = useSelector(
    (state) => state.auth.login.currentUser?.accessToken
  );
  const cartItems=  useSelector((state) => state.cart?.items.length);


  // console.log("SL=> " +JSON.stringify(cartItems) );
  const handleClickOpenMenu = () => {
    setIsOpenMenu((prev) => !prev);
  };

  const handleLogOut = () => {
    logOut(dispatch, navigate, accessToken);
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
      <div className="flex space-x-4  font-bold text-white ">
        {user ? (
          <>
            <div className=" cursor-pointer mr-10  ">
              <Link to="/cart">
                <button
                  className="flex justify-center items-center"
                  // onClick={() => setIsOpenCart(true)}
                >
                  <ShoppingBagIcon
                    aria-hidden="true"
                    className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-300  group-hover:text-gray-800">
                    {cartItems?cartItems:0}
                  </span>
                </button>
              </Link>
            </div>
            <div
              className="sm:flex hidden  relative items-center justify-around cursor-pointer space-x-1 "
              onClick={handleClickOpenMenu}
            ></div>

            <Menu as="div" className="relative ml-3 hidden sm:flex">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="size-8 rounded-full"
                  />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-10 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
              >
                <MenuItem>
                  <a className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden">
                    Your Profile
                  </a>
                </MenuItem>
                <MenuItem>
                  <a className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden">
                    Settings
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    onClick={handleLogOut}
                    className="block px-4 cursor-pointer py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                  >
                    Sign out
                  </a>
                </MenuItem>
              </MenuItems>
            </Menu>
          </>
        ) : (
          <Link to="/login" className="cursor-pointer">
            Login
          </Link>
        )}
      </div>
      <div className="sm:hidden">
        <div className="sm:hidden">
          {user ? (
            <DensityMediumRoundedIcon
              fontSize="large"
              className="cursor-pointer"
              onClick={handleClickOpenMenu}
            />
          ) : (
            <Link to="/login" className="cursor-pointer font-bold text-white">
              Login
            </Link>
          )}
        </div>
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
              <li>
                <div
                  onClick={handleLogOut}
                  className="text-red-600 cursor-pointer"
                >
                  <p>LogOut</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
export default Header;
