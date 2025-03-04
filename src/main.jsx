import { ThemeProvider } from "@emotion/react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import CheckoutProduct from "./components/CheckoutProduct.jsx";
import AuthLayout from "./components/page/AuthLayout/AuthLayout.jsx";
import LoginPage from "./components/page/AuthLayout/LoginPage.jsx";
import OtpVerify from "./components/page/AuthLayout/OtpVerify.jsx";
import RegisterPage from "./components/page/AuthLayout/RegisterPage.jsx";
import HomePage from "./components/page/HomePage";
import ProductDetail from "./components/page/ProductDetail.jsx";
import RootLayout from "./components/page/RootLayout";
import ProductCart from "./components/ProductCart.jsx";
import theme from "./configs/MUIConfig.js";
import "./index.css";
import { persistor, store } from "./redux/store.js";
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
            path: "/otp-verify",
            element: <OtpVerify />,
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
        path: "/checkout",
        element: <CheckoutProduct />,
      },
    ],
  },
]);

const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </PersistGate>
  </Provider>
);
