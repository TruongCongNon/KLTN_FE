import Banner from "../Banner/Banner";
import Category from "./category/category";
import FlashSale from "./FalshSale";
import ProductList from "./Product/ProductList";

const HomePage = () => {
  return (
    <div className=" bg-white/90">
      
      <Banner />
      <FlashSale/>
      <Category />
      <ProductList category="iphone" title="iPhone" />
      <ProductList category="aw" title="Apple Watch" />
      <ProductList category="ipad" title="Ipad" />
      <ProductList category="macbook" title="Macbook" />
    </div>
  );
};
export default HomePage;
