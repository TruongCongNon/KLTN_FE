import Banner from "../Banner/Banner";
import Category from "./category/category";
import ProductList from "./ProductList/ProductList";

const HomePage = () => {
  return (
    <div className="bg-black">
      
      <Banner />
      <Category />
      <ProductList category="" title="Trending" />
      <ProductList category="iphone" title="iPhone" />
      <ProductList category="aw" title="Apple Watch" />
      <ProductList category="ipad" title="Ipad" />
      <ProductList category="macbook" title="Macbook" />
    </div>
  );
};
export default HomePage;
