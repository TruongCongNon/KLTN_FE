import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import theme from "./configs/MUIConfig.js";
import HomePage from "./components/page/HomePage";
import RootLayout from "./components/page/RootLayout";
import "./index.css";
import AuthLayout from "./components/page/AuthLayout/AuthLayout.jsx";
import LoginPage from "./components/page/AuthLayout/LoginPage.jsx";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store.js";
import RegisterPage from "./components/page/AuthLayout/RegisterPage.jsx";
import OtpVerify from "./components/page/AuthLayout/OtpVerify.jsx";
import { PersistGate } from "redux-persist/integration/react";
import ProductDetail from "./components/page/ProductDetail.jsx";
import CheckoutProduct from "./components/CheckoutProduct.jsx";
import ProductCart from "./components/ProductCart.jsx";
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
        path: "/checkout/:id",
        element: <CheckoutProduct />,
      },
      {
        path: "/cart",
        element: <ProductCart />,
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
