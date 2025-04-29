const bannerSettings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    dots: true, // hiện navigation dots
    appendDots: dots => (
    <div>
      <ul className="flex justify-center space-x-2 mt-4 z-50">{dots}</ul>
    </div>
  ),
  customPaging: i => (
    <div className="dot w-3 h-3 rounded-full border-2 border-black-400 transition-all duration-300"></div>
  ),
  };
  
  export default bannerSettings;