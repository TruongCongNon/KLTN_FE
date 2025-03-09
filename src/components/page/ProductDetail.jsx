import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductById } from "../../redux/api/productApiRequest"; // Nếu có API
import StarRating from "../Rating/StarRating";
import { addToCart } from "../../redux/api/cartApiRequest";
import ProductRelated from "../ProductRelated/ProductRelated";
// import { addToCart } from "../../redux/api/cartApiRequest";

const ProductDetail = () => {
  const [countProduct, setCountProduct] = useState(1);
  const { id } = useParams();
  const dispatch = useDispatch();
  const accessToken = useSelector(
    (state) => state.auth.login.currentUser?.accessToken
  );
  const product = useSelector((state) => state.product.getProductById?.data);
  const userId = useSelector((state) => state.auth.login.currentUser?._id);
  // console.log("id=>"+userId);
  // console.log(id);
  // console.log(product);
  // console.log(accessToken);
  // Gọi API lấy sản phẩm theo ID (nếu có)
  useEffect(() => {
    if (id && accessToken) {
      getProductById(dispatch, id, accessToken);
    }
  }, [dispatch, id, accessToken]);

  // Hàm giảm số lượng 
  const decrease = () => {
    setCountProduct((prev) => Math.max(prev - 1, 1));
  };

  // Hàm tăng số lượng
  const increase = () => {
    setCountProduct((prev) => prev + 1);
  };
  const handleAddToCart =  () => {
    if (!product) {
      alert("Sản phẩm không tồn tại.");
      return;
    }
  
    if (!userId) {
      alert("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.");
      return;
    }
  
    try {
       addToCart(
        userId, 
        {
          productId: product._id,
          name: product.name,
          price: product.price,
          quantity: countProduct,
          image: product.image,
          stock:product.stock
        },
        dispatch,
        accessToken 
      );
  
      alert("Sản phẩm đã được thêm vào giỏ hàng!");
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      alert("Thêm sản phẩm vào giỏ hàng thất bại!");
    }
  };
  

  return (
    <div className="bg-white">
      <div className="sm:px-56 px-1 lg:max-w-7x ">
        <div className="grid grid-row- mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div>
            <img
              alt={product?.image}
              src={product?.image}
              className="border w-full h-full rounded-lg object-cover lg:block"
            />
          </div>
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="text-[6.5vw] sm:text-[2.2vw] font-bold">
              {product?.name}
            </h2>
            <div className="flex items-center space-x-4">
              <StarRating rating={product?.rating} />
              <div>{product?.comment ? "" : "Không có đánh giá"}</div>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[5.5vw] sm:text-[2vw] text-red-500">
                {product?.price} VNĐ
              </p>
              <span>
                {product?.stock > 10
                  ? `Còn lại: ${product?.stock}`
                  : "Sắp hết hàng"}
              </span>
            </div>

            {/* Chọn số lượng */}
            <div className="w-full">
              <div className="flex items-center border border-gray-300 rounded-md lg:w-48 w-40">
                <button
                  onClick={decrease}
                  className="lg:px-6 lg:py-2 px-3 py-1 border-r border-gray-300 text-gray-600 hover:bg-gray-200"
                >
                  −
                </button>
                <input
                  onChange={(e) =>
                    setCountProduct(parseInt(e.target.value) || 1)
                  }
                  value={countProduct}
                  className="lg:px-6 lg:py-2 px-3 py-1 text-gray-700 focus:outline-none w-1/2 text-center"
                  type="text"
                  min="1"
                />
                <button
                  onClick={increase}
                  className="lg:px-6 lg:py-2 px-3 py-1 border-l border-gray-300 text-gray-600 hover:bg-gray-200"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex items-end justify-between px-5m space-x-5 sm:space-x-0 sm:px-0">
              <button
                onClick={handleAddToCart}
                type="submit"
                className="flex w-52 mt-5 items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
              >
                Thêm vào giỏ hàng
              </button>
              <button className="flex w-40 text-indigo-600 mt-5 items-center justify-center rounded-md border border-indigo-600 py-3 text-base font-medium focus:ring-offset-2 focus:outline-none">
                Mua ngay
              </button>
            </div>
          </div>
        </div>

        <div className=" mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h3 className="text-[5vw] sm:text-[1vw] font-bold">
            Mô tả sản phẩm
          </h3>
          <p className="text-base text-gray-900">{product?.description}</p>
        </div>
      </div>
      <ProductRelated id ={id}
      accessToken={accessToken}
      product= {product}/>
    </div>
  );
};

export default ProductDetail;
