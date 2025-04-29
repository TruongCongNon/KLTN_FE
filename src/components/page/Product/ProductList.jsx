import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProduct } from "../../../redux/api/productApiRequest";
import Slider from "react-slick";
import { formatCurrency } from "../../../utils/format";
import Loading from "../../Loading/Loading";

const ProductList = ({ title, category }) => {
  const dispatch = useDispatch();
  const { allProducts = [], isFetching } = useSelector((state) => state.product?.getAllProduct || {});

  useEffect(() => {
    if (!allProducts.length) {
      getAllProduct(dispatch);
    }
  }, [dispatch, allProducts]);

  const products = useMemo(() => {
    if (!allProducts.length) return [];
    if (!category) return allProducts;
    return allProducts.filter((product) => product.category === category);
  }, [allProducts, category]);

  const productsSlice = products.slice(0, 8);
 
  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };
  // console.log(allProducts);
  return (
    <div className="bg-white text-black">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-46">
        <div className="border-l-4 pl-4 border-indigo-600">
          <p className="text-[6vw] sm:text-[2.2vw] font-bold text-indigo-600">{title}</p>
        </div>

        {isFetching ? (
          <Loading />
        ) : (
          <Slider {...settings} className="mt-6">
            {productsSlice.map((product) => (
              <div key={product._id} className="px-2">
                <Link to={`/product/${product._id}`} className="group block py-3">
                  <div className="w-full flex items-center justify-center">

                    <img
                      alt={product.name}
                      src={
                        `http://localhost:5000${product.images[0]}`
                      }
                      className="h-auto hover:scale-105 w-48 duration-75 object-cover"
                    />


                  </div>
                  <h3 className="mt-4 text-xl text-center text-gray-700 overflow-hidden truncate">
                    {product.name}
                  </h3>
                  <p className="mt-1 w-full text-lg text-center font-medium text-gray-900">
                    {formatCurrency(product.price || 0)}
                  </p>
                </Link>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
};

export default ProductList;
