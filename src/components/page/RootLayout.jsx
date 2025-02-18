import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { Suspense } from "react";
import Loading from "../Loading/Loading";
// Supports weights 100-900

const RootLayout = () => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header />
      <Suspense fallback={<Loading />} className="flex-grow">
        <Outlet />
      </Suspense>
      <Footer />
    </div>
  );
};
export default RootLayout;
