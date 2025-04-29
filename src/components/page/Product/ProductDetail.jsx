import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../../../redux/api/productApiRequest";
import { formatCurrency } from "../../../utils/format";
import { useParams, useNavigate } from "react-router-dom";
import ProductRelated from "../Product/ProductRelated";
import CountButton from "../../countButton/countButton";
import StarRating from "../../Rating/StarRating";
import { addToCart } from "../../../redux/api/cartApiRequest";

const ProductDetailPage = () => {
  const [count, setCount] = useState(1);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productData = useSelector((state) => state.product.getProductById?.data);
  const userId = useSelector((state) => state.auth.login.currentUser?._id);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    if (id) {
      getProductById(dispatch, id);
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (productData?.images?.length > 0) {
      setMainImage(`http://localhost:5000${productData.images[0]}`);
    }
  }, [productData]);

  const handleAddToCart = () => {
    if (!userId) {
      alert("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!");
      navigate("/login");
      return;
    }
    if (!productData) {
      alert("Sản phẩm không tồn tại.");
      return;
    }

    try {
      dispatch(addToCart(userId, productData._id, count));
      alert("Sản phẩm đã được thêm vào giỏ hàng!");
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      alert("Thêm sản phẩm vào giỏ hàng thất bại!");
    }
  };

  const handleBuyNow = () => {
    if (!userId) {
      alert("Bạn cần đăng nhập để mua hàng!");
      navigate("/login");
      return;
    }
    // Logic xử lý mua ngay (nếu có thêm sau này)
  };

  return (
    <div className="bg-white">
      <div className="lg:px-72 mx-auto p-4">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="flex flex-col items-center">
            <img
              alt={productData?.name}
              src={mainImage || "/default.png"}
              className="max-w-full w-96"
            />
            <div className="flex gap-2 mt-2 flex-wrap justify-center">
              {productData?.images?.map((img, i) => (
                <img
                  key={i}
                  src={`http://localhost:5000${img}`}
                  alt="thumb"
                  onClick={() => setMainImage(`http://localhost:5000${img}`)}
                  className="w-9 h-auto border rounded cursor-pointer hover:border-indigo-500"
                />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold">{productData?.name}</h2>
            <div className="flex items-center justify-start mt-2">
              <div><StarRating /></div>
              <div className="ml-2">Không có đánh giá</div>
            </div>
            <div className="text-2xl font-semibold text-red-600 mt-2">
              {formatCurrency(productData?.price || 0)}
            </div>
            <div className="text-sm text-gray-600 mt-1">
              {productData?.stock > 0
                ? `Còn lại: ${productData.stock} sản phẩm`
                : "Hết hàng"}
            </div>

            <div className="mt-4">
              <p className="font-medium">Màu sắc: {productData?.color}</p>
            </div>

            <CountButton count={count} setCount={setCount} stock={productData?.stock} />

            <div className="flex gap-4 mt-6">
              <button
                onClick={handleAddToCart}
                disabled={!userId}
                className={`w-48 py-3 rounded-md ${userId ? "bg-indigo-600 text-white hover:bg-indigo-700" : "bg-gray-400 text-white cursor-not-allowed"}`}
              >
                {userId ? "Thêm vào giỏ hàng" : "Đăng nhập để mua"}
              </button>

              <button
                onClick={handleBuyNow}
                disabled={!userId}
                className={`w-40 py-3 rounded-md border ${userId ? "border-indigo-600 text-indigo-600" : "border-gray-400 text-gray-400 cursor-not-allowed"}`}
              >
                {userId ? "Mua ngay" : "Đăng nhập"}
              </button>
            </div>
          </div>
        </div>

        {/* Mô tả sản phẩm */}
        <div className="mt-10">
          <h3 className="text-3xl font-bold">Mô tả sản phẩm</h3>
          <p className="text-gray-900 mt-2">{productData?.description}</p>
        </div>
      </div>

      {/* Sản phẩm liên quan */}
      <ProductRelated id={id} accessToken={null} product={productData} />
    </div>
  );
};

export default ProductDetailPage;
