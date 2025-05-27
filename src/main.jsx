import { createRoot } from "react-dom/client";
import React, { Suspense, lazy } from "react";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Modal from "./components/Modal/Modal.jsx";
import ModelProvider from "./context/ModelProvider.jsx";
import store from "./redux/store.js";

// Lazy load pages
const RootLayout = lazy(() => import("./components/page/RootLayout"));
const HomePage = lazy(() => import("./components/page/HomePage"));
const AuthLayout = lazy(() => import("./components/page/AuthLayout/AuthLayout.jsx"));
const EnterEmailPage = lazy(() => import("./components/page/AuthLayout/EnterEmailPage.jsx"));
const ForgotPasswordPage = lazy(() => import("./components/page/AuthLayout/ForgotPasswordPage.jsx"));
const LoginPage = lazy(() => import("./components/page/AuthLayout/LoginPage.jsx"));
const RegisterPage = lazy(() => import("./components/page/AuthLayout/RegisterPage.jsx"));
const VerifyOTP = lazy(() => import("./components/page/AuthLayout/VerifyOTP.jsx"));
const CheckoutProduct = lazy(() => import("./components/page/CheckoutProduct.jsx"));
const CategoryByName = lazy(() => import("./components/page/Product/CategoryByName.jsx"));
const ProductDetail = lazy(() => import("./components/page/Product/ProductDetail.jsx"));
const ProductCart = lazy(() => import("./components/page/ProductCart.jsx"));
const OrderPage = lazy(() => import("./components/page/OrderPage/OrderPage.jsx"));
const OrderPageDetail = lazy(() => import("./components/page/OrderPage/OrderPageDetail.jsx"));
const ProfilePage = lazy(() => import("./components/page/Profile/ProfilePage.jsx"));
const SearchPage = lazy(() => import("./components/page/SearchPage.jsx"));

// Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        element: <AuthLayout />,
        children: [
          { path: "/login", element: <LoginPage /> },
          { path: "/register", element: <RegisterPage /> },
          { path: "enter-email", element: <EnterEmailPage /> },
          { path: "/otp-verify", element: <VerifyOTP /> },
          { path: "/forgot-password", element: <ForgotPasswordPage /> },
        ],
      },
      { path: "/product/:id", element: <ProductDetail /> },
      { path: "/cart", element: <ProductCart /> },
      { path: "category/:name", element: <CategoryByName /> },
      { path: "/checkout", element: <CheckoutProduct /> },
      { path: "/order", element: <OrderPage /> },
      { path: "/order/detail/:id", element: <OrderPageDetail /> },
      { path: "/search", element: <SearchPage /> },
      { path: "/profile", element: <ProfilePage /> },
    ],
  },
]);

// Render
const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ModelProvider>
      <Suspense fallback={<div className="text-center mt-10 text-xl">Loading...</div>}>
        <RouterProvider router={router} />
        <Modal />
      </Suspense>
    </ModelProvider>
  </Provider>
);
