import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProduct } from "../../../redux/api/productApiRequest";

const ProductList = ({ title, category }) => {
  const dispatch = useDispatch();
  const { productsByCategory } = useSelector((state) => state.product);
  
  const products = useMemo(
    () => {
      if (!productsByCategory || typeof productsByCategory !== "object") {
        return []; // Nếu productsByCategory là null hoặc undefined thì trả về mảng rỗng
      }
      if (category === "") {
        return Object.values(productsByCategory).flat();
      }
 
      return Array.isArray(productsByCategory?.[category])
        ? productsByCategory[category]
        : [];
    },
    [productsByCategory, category]
  );

  useEffect(() => {
    if (category && !productsByCategory?.[category]) {
      getAllProduct(dispatch, category);
    }

    if (category === "Trending" && Object.keys(productsByCategory).length === 0) {
      getAllProduct(dispatch, "Trending");
    }
  }, [dispatch, category, productsByCategory]);

  return (
    <div>
      <div className="bg-white text-black">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <p className="text-[6vw] sm:text-[2.2vw] font-bold border-black border-l-4 pl-4">
            {title}
          </p>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 mt-3">
            {products.length === 0 ? (
              <p>No products found for this category.</p>
            ) : (
              products.map((product) => (
                <Link
                  to={`/product/${product._id}`}
                  key={product._id}
                  className="group"
                >
                  <img
                    alt={product.image}
                    src={product.image}
                    className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
                  />
                  <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                  <div className="flex justify-between items-center">
                    <p className="mt-1 text-lg font-medium text-gray-900">
                      {product.price}
                    </p>
                    <p>
                      {product.stock > 10
                        ? `Còn lại: ${product.stock}`
                        : "Sắp hết hàng"}
                    </p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
