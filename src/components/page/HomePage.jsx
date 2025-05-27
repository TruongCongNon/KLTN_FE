import Category from "./category/category";
import ProductList from "./Product/ProductList";


import FlashSale from "./FalshSale";
import Banner from "../Banner/Banner";

const HomePage = () => {
  return (
    <div className=" bg-white/90">
      <Banner />
      <FlashSale />
      <Category />
      <div className="space-y-7">
        <ProductList category="iphone" title="iPhone" />
        <ProductList category="aw" title="Apple Watch" />
        <ProductList category="ipad" title="Ipad" />
        <ProductList category="macbook" title="Macbook" />
      </div>
    </div>
  );
};
export default HomePage;
