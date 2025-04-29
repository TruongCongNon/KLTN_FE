import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import bannerSettings from "./BannerSetting";
import { BANNER, BANNERV1 } from "../../constant/banner";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Kiểm tra kích thước màn hình
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640); // Tailwind mobile breakpoint (sm: 640px)
    };

    handleResize(); // chạy 1 lần khi mount
    window.addEventListener("resize", handleResize); // cập nhật khi resize

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const bannerData = isMobile ? BANNERV1 : BANNER;

  return (
    <div className="relative mx-auto overflow-hidden">
      <Slider {...bannerSettings}>
        {bannerData.map((banner) => (
          <div key={banner.id} className="relative w-full">
            <img
              src={banner.imageURL}
              alt={`Banner ${banner.id}`}
              className="w-full h-auto max-h-[500px] object-cover rounded-sm pointer-events-none"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
