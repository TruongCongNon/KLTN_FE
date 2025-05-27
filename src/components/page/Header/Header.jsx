import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import {
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";


import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";
import { logOut } from "../../../redux/api/authApiRequest";
import { getCart } from "../../../redux/api/cartApiRequest";
import SearchPage from "../SearchPage";
import { cartSlice } from "../../../redux/slices/cartSlice";
import { useModelContext } from "../../../context/ModelProvider";

const Header = () => {
  const { showAlert, showNotification } = useModelContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.login.currentUser);
  const accessToken = useSelector(
    (state) => state.auth.login.currentUser?.accessToken
  );
  const cartItems = useSelector((state) => state.cart?.items?.items);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const avatarUrl = currentUser?.images
  ? `http://localhost:5000${currentUser.images}`
  : "/default-avatar.png";
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    if (isSearch || isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
    return () => {
      document.body.style.overflow = "scroll";
    };
  }, [isSearch, isMobileMenuOpen]);

  useEffect(() => {
    if (user) {
      dispatch(getCart(user._id));
    }
  }, [user?._id, dispatch]);
  const handleLogOut = () => {
    closeMobileMenu();
    showAlert({
      title: "Xác nhận đăng xuất",
      description: "Bạn có chắc chắn muốn đăng xuất không?",
      onConfirm: async () => {
        await logOut(dispatch, navigate, accessToken);
        localStorage.removeItem("user");
        localStorage.removeItem("currentUser");
        localStorage.removeItem("activePageId")
      },
    });
  };

  const handleOpenSearchPage = () => {
    closeMobileMenu();
    setIsSearch(true);
  };

  const handleCloseSearchPage = () => {
    setIsSearch(false);
  };

  const MobileNavLink = ({ to, children }) => (
    <Link
      to={to}
      onClick={closeMobileMenu}
      className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
    >
      {children}
    </Link>
  );

  const MobileActionButton = ({ onClick, children }) => (
    <button
      onClick={onClick}
      className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
    >
      {children}
    </button>
  );

  return (
    <div className="bg-black text-white sticky top-0 z-40">
      <div className="mx-auto  px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-shrink-0 items-center">
            <Link
              to="/"
              onClick={closeMobileMenu}
              className="flex items-center justify-center font-bold cursor-pointer"
            >
              <img src={logo} alt="SmartNova Logo" className="h-8 w-auto" />{" "}
              <p className="ml-2 text-xl">SmartNova</p>
            </Link>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            <Link
              to="/contact"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-md font-medium"
            >
              Liên hệ
            </Link>
            <Link
              to="/about"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-md font-medium"
            >
              Về SmartNova
            </Link>
            <Link
              to="/services"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-md font-medium"
            >
              Dịch vụ
            </Link>
          </div>

          {/* Right side icons & Mobile Menu Button */}
          <div className="flex items-center space-x-10">
            {/* Search Icon */}
            <button
              onClick={handleOpenSearchPage}
              className="p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="sr-only">Search</span>
              <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Cart Icon */}
            {user && (
              <Link
                to="/cart"
                onClick={closeMobileMenu}
                className="relative p-1 text-gray-400 hover:text-white"
              >
                <span className="sr-only">View Cart</span>
                <div className="flex items-center"> <ShoppingBagIcon className="h-6 w-6" aria-hidden="true" />
                  {cartItems && cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none h-5 w-5 text-red-100 bg-red-600 rounded-full">
                      {cartItems.length}
                    </span>
                  )}</div>
              </Link>
            )}

            <div className="hidden sm:ml-3 sm:flex sm:items-center">
              {user ? (
                <Menu as="div" className="relative">
                  <div>
                    <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        alt="User avatar"
                        src={
                          avatarUrl
                        }
                        className="size-8 rounded-full object-cover bg-white"
                      />
                    </MenuButton>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    {/* <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"> */}
                    <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-auto max-h-[80vh] scrollbar-gutter-stable">

                      <MenuItem>
                        {({ active }) => (
                          <Link
                            to="/profile"
                            className={`${active ? "bg-gray-100" : ""
                              } block px-4 py-2 text-sm text-gray-700`}
                          >
                            Thông tin của bạn
                          </Link>
                        )}
                      </MenuItem>
                      <MenuItem>
                        {({ active }) => (
                          <Link
                            to="/order"
                            className={`${active ? "bg-gray-100" : ""
                              } block px-4 py-2 text-sm text-gray-700`}
                          >
                            Đơn hàng của bạn
                          </Link>
                        )}
                      </MenuItem>
                      <MenuItem>
                        {({ active }) => (
                          <button
                            onClick={handleLogOut}
                            className={`${active ? "bg-gray-100" : ""
                              } block w-full text-left px-4 py-2 text-sm text-red-700`}
                          >
                            Đăng xuất
                          </button>
                        )}
                      </MenuItem>
                    </MenuItems>
                  </Transition>
                </Menu>
              ) : (
                <Link
                  to="/login"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Đăng nhập
                </Link>
              )}
            </div>

            <div className="flex items-center sm:hidden">
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded={isMobileMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Transition
        show={isMobileMenuOpen}
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <div
          className="sm:hidden absolute top-16 inset-x-0 bg-gray-800 z-30 pb-3"
          id="mobile-menu"
        >
          {" "}
          <div className="border-t border-gray-700 pt-4 pb-3">
            {user ? (
              <>
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full object-cover bg-white border-2 border-white "
                      src={
                        avatarUrl
                      }
                      alt="User avatar"
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium leading-none text-white">
                      {user.username || "User"}
                    </div>{" "}
                    <div className="text-sm font-medium leading-none text-gray-400">
                      {user.email}
                    </div>{" "}
                  </div>
                </div>
                <div className="mt-3 space-y-1 px-2">
                  <MobileNavLink to="/profile">Thông tin của bạn</MobileNavLink>
                  <MobileNavLink to="/order">Đơn hàng của bạn</MobileNavLink>
                  <MobileActionButton onClick={handleLogOut}>
                    <p className="text-red-600"> Đăng xuất</p>
                  </MobileActionButton>
                </div>
              </>
            ) : (
              <div className="px-2">
                <MobileNavLink to="/login">Đăng nhập</MobileNavLink>
              </div>
            )}
          </div>
        </div>
      </Transition>

      {isSearch && (
        <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-75 backdrop-blur-sm">
          <div className="absolute top-0 left-0 right-0 pt-4 px-4">
            <div className="max-w-xl mx-auto">
              <SearchPage closeSearchPage={handleCloseSearchPage} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
