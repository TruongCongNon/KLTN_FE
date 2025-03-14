import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductRelated } from "../../redux/api/productApiRequest";
import { useNavigate } from "react-router-dom";

const ProductRelated = ({ id }) => {
  const navigate = useNavigate();
  const [isShowMoreProductRelated, setIsShowMoreProductRelated] =
    useState(false);
  const accessToken = useSelector(
    (state) => state.auth.login.currentUser?.accessToken
  );
  console.log("IdRelated=> " + id);
  console.log("access=> " + accessToken);

  const dispatch = useDispatch();
  useEffect(() => {
    if (id && accessToken) {
      getProductRelated(dispatch, id, accessToken);
      console.log("get related => " + getProductRelated);
    }
  }, [dispatch, id, accessToken]);
  const productRelated = useSelector(
    (state) => state.product.getProductRelated?.productByTag
  );
  const productRelatedSlice = isShowMoreProductRelated
    ? productRelated
    : productRelated.slice(0, 4);
  console.log("productrelated=> " + productRelated);
  const handleLCickProudctDetail = (productId) => {
    console.log("id trong handle" + productId);
    navigate(`/product/${productId}`);
  };
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        Product Related
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 cursor-pointer">
        {productRelatedSlice.map((product) => (
          <div
            onClick={() => handleLCickProudctDetail(product._id)}
            key={product._id}
            className="group relative"
          >
            <img
              alt={product.imageAlt}
              src={product.imageSrc}
              className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
            />
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700">
                  <a href={product.href}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.name}
                  </a>
                </h3>
                <p className="mt-1 text-sm text-gray-500">{product.color}</p>
              </div>
              <p className="text-sm font-medium text-gray-900">
                {product.price}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center mt-10     ">
        <p
          onClick={() => setIsShowMoreProductRelated(!isShowMoreProductRelated)}
          className="flex rounded-lg border items-center justify-center py-3 text-white font-medium text-[4vw] lg:text-lg bg-indigo-600 cursor-pointer w-32 "
        >
          {isShowMoreProductRelated ? "Show less " : "Show more"}
        </p>
      </div>
    </div>
  );
};

export default ProductRelated;
