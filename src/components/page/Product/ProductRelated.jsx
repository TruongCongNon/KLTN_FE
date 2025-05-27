import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductRelated } from "../../../redux/api/productApiRequest";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { formatCurrency } from "../../../utils/format";

const ProductRelated = ({ id }) => {
  const navigate = useNavigate();
  const [isShowMoreProductRelated, setIsShowMoreProductRelated] =
    useState(false);
  const accessToken = useSelector(
    (state) => state.auth.login.currentUser?.accessToken
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (id && accessToken) {
      getProductRelated(dispatch, id, accessToken);
    }
  }, [dispatch, id, accessToken]);

  const productRelated = useSelector(
    (state) => state.product.getProductRelated?.productByTag
  );

  const productRelatedSlice = isShowMoreProductRelated
    ? productRelated
    : productRelated.slice(0, 4);

  const handleLCickProudctDetail = (productId) => {
    navigate(`/product/${productId}`);
  };


  return (
    <div className="mx-auto max-w-2xl px-4 py-16 px-20 sm:py-24 lg:max-w-7xl lg:px-20">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        Sản phẩm liên quan
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 cursor-pointer">
        {productRelatedSlice.map((product) => (
          <div
            onClick={() => handleLCickProudctDetail(product._id)}
            key={product._id}
            className="group relative"
          >
            <div className="flex items-center justify-center">
              <LazyLoadImage
                effect="blur"
                src={`http://localhost:5000${product?.images[0] || '/path/to/default-image.jpg'}`}
                alt={product.productId?.name}
                className="w-auto"
                afterLoad={() => {
                  const spans = document.querySelectorAll(".lazy-load-image-background.blur");
                  spans.forEach(span => span.classList.remove("blur"));
                }}
              />
            </div>
            <div className="mt-4 text-center">
              <div>
                <h3 className="text-sm sm:text-lg text-gray-700">
                  <a href={product.href}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.name}
                  </a>
                </h3>
              </div>
              <p className="text-sm font-medium text-gray-900">
                {formatCurrency(product?.price)}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center mt-10">
        <p
          onClick={() => setIsShowMoreProductRelated(!isShowMoreProductRelated)}
          className="flex rounded-lg border items-center justify-center py-3 text-white font-medium text-[4vw] lg:text-lg bg-indigo-600 cursor-pointer w-32"
        >
          {isShowMoreProductRelated ? "Show less " : "Show more"}
        </p>
      </div>
    </div>
  );
};

export default ProductRelated;
