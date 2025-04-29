import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Modal from "./components/Modal/Modal.jsx";
import AuthLayout from "./components/page/AuthLayout/AuthLayout.jsx";
import EnterEmailPage from "./components/page/AuthLayout/EnterEmailPage.jsx";
import ForgotPasswordPage from "./components/page/AuthLayout/ForgotPasswordPage.jsx";
import LoginPage from "./components/page/AuthLayout/LoginPage.jsx";
import RegisterPage from "./components/page/AuthLayout/RegisterPage.jsx";
import VerifyOTP from "./components/page/AuthLayout/VerifyOTP.jsx";
import CheckoutProduct from "./components/page/CheckoutProduct.jsx";
import HomePage from "./components/page/HomePage";
import CategoryByName from "./components/page/Product/CategoryByName.jsx";

import ProductDetail from "./components/page/Product/ProductDetail.jsx";
import ProductCart from "./components/page/ProductCart.jsx";
import RootLayout from "./components/page/RootLayout";
import ModelProvider from "./context/ModelProvider.jsx";
import "./index.css";
import store from "./redux/store.js";

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import OrderPage from "./components/page/OrderPage/OrderPage.jsx";
import OrderPageDetail from "./components/page/OrderPage/OrderPageDetail.jsx";
import ProfilePage from "./components/page/Profile/ProfilePage.jsx";
import SearchPage from "./components/page/SearchPage.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: "/login",
            element: <LoginPage />,
          },
          {
            path: "/register",
            element: <RegisterPage />,
          },
          {
            path: "enter-email",
            element: <EnterEmailPage />,
          },
          {
            path: "/otp-verify",
            element: <VerifyOTP />,
          },
          {
            path: "/forgot-password",
            element: <ForgotPasswordPage />,
          },
        ],
      },
      {
        path: "/product/:id",
        element: <ProductDetail />,
      },
      {
        path: "/cart",
        element: <ProductCart />,
      },
      {
        path: "category/:name",
        element: <CategoryByName />,
      },
      {
        path: "/checkout",
        element: <CheckoutProduct />,
      },
      {
        path: "/order",
        element: <OrderPage />,
      },
      {
        path: "/order/detail/:id",
        element: <OrderPageDetail />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
      {
        path: "/Profile",
        element: <ProfilePage />,
      },
    ],
  },
]);

const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ModelProvider>
      <RouterProvider router={router} />
      <Modal />
    </ModelProvider>
  </Provider>
);
