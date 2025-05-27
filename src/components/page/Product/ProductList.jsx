import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProduct } from "../../../redux/api/productApiRequest";
import Slider from "react-slick";
import { formatCurrency } from "../../../utils/format";
import Loading from "../../Loading/Loading";
import { getAllFlashSale } from "../../../redux/api/apiRequestFlashSale";
import { LazyLoadImage } from "react-lazy-load-image-component";

const ProductList = ({ title, category }) => {

  const dispatch = useDispatch();
  const { allProducts = [], isFetching } = useSelector((state) => state.product?.getAllProduct || {});


  const { data } = useSelector(
    (state) => state.flashSale.getAllFlashSale
  );

  useEffect(() => {
    if (data.length === 0) {
      getAllFlashSale(dispatch);
    }
  }, [dispatch, isFetching, data.length]);
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
  const flashSaleMap = useMemo(() => {
    const map = {};
    data?.forEach((fs) => {
      if (fs?.productId?._id) {
        map[fs.productId._id] = fs;
      }
    });
    return map;
  }, [data]);


  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
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
      <div className="mx-auto max-w-2xl px-4 sm:px-6  lg:max-w-7xl lg:px-46">
        <div className="border-l-4 pl-4 border-indigo-600">
          <p className="text-[6vw] sm:text-[2.1vw] font-bold text-indigo-600">{title}</p>
        </div>

        {isFetching ? (
          <Loading />
        ) : (
          <Slider {...settings} className="mt-6">
            {products.map((product) => {
              const flashSale = flashSaleMap[product._id];
              const isFlashSale = !!flashSale;
              const originalPrice = product.price || 0;
              const salePrice = isFlashSale ? flashSale.discountPrice : originalPrice;
              const discountPercent = isFlashSale
                ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
                : 0;

              return (
                <div key={product._id} className="px-2 relative">
                  <Link
                    to={`/product/${product._id}`}
                    state={isFlashSale ? { isFlashSale: true, flashSaleData: flashSale } : {}}
                    className="group block py-3"
                  >
                    <div className="w-full flex items-center justify-center relative">
                      <LazyLoadImage
                        effect="blur"
                        alt={product.name}
                        src={`http://localhost:5000${product.images[0]}`}
                        className="h-auto hover:scale-105 w-48 duration-75 object-cover"
                        afterLoad={() => {
                          const spans = document.querySelectorAll(".lazy-load-image-background.blur");
                          spans.forEach(span => span.classList.remove("blur"));
                        }}
                      />
                      {isFlashSale && (
                        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                          -{discountPercent}%
                        </span>
                      )}
                    </div>

                    <h3 className="mt-4 text-xl text-center text-gray-700 overflow-hidden truncate">
                      {product.name}
                    </h3>

                    <p className="mt-1 text-lg text-center font-medium text-gray-900">
                      {formatCurrency(salePrice)}
                    </p>
                    {isFlashSale && (
                      <p className="text-center text-sm line-through text-gray-400">
                        {formatCurrency(originalPrice)}
                      </p>
                    )}
                  </Link>
                </div>
              );
            })}

          </Slider>
        )}
      </div>
    </div>
  );
};

export default ProductList;
