import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../../../redux/api/productApiRequest";
import { formatCurrency } from "../../../utils/format";
import { useParams, useNavigate } from "react-router-dom";
import ProductRelated from "../Product/ProductRelated";
import CountButton from "../../countButton/countButton";
import StarRating from "../../Rating/StarRating";
import { addToCart } from "../../../redux/api/cartApiRequest";
import CommentPage from "../CommentPage/CommentPage";
import { useModelContext } from "../../../context/ModelProvider";
import { getCommentsTree } from "../../../redux/api/apiRequestComment";
import { LazyLoadImage } from "react-lazy-load-image-component";

const ProductDetailPage = () => {
  const [count, setCount] = useState(1);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productData = useSelector((state) => state.product.getProductById?.data);
  const userId = useSelector((state) => state.auth.login.currentUser?._id);
  const [maxQuantity, setMaxQuantity] = useState(0);
  const [mainImage, setMainImage] = useState("");
  const { showNotification } = useModelContext();
  const { tree: comments, isFetching } = useSelector(
    (state) => state.comment.comments
  );
  // Lấy dữ liệu flash sale
  const { data: flashSales } = useSelector((state) => state.flashSale?.getAllFlashSale);
  const flashSaleData = flashSales.find((fs) => String(fs.productId?._id) === String(id));
  const isFlashSale = !!flashSaleData;

  // Tính toán giá và phần trăm giảm
  const originalPrice = productData?.price || 0;
  const salePrice = isFlashSale ? flashSaleData.discountPrice : originalPrice;
  const discountPercent = isFlashSale
    ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
    : 0;
  const priceToAdd = isFlashSale ? flashSaleData?.discountPrice : productData?.price;

  useEffect(() => {
    if (id) {
      getProductById(dispatch, id);
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (productData?.images?.length > 0) {
      setMainImage(`http://localhost:5000${productData?.images[0] || "/default-image.jpg"}`);
    }
  }, [productData]);
  useEffect(() => {
    if (id) {
      dispatch(getCommentsTree(id));
    }
  }, [dispatch, id]);
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

    if (count > maxQuantity) {
      showNotification({
        message: "Số lượng vượt quá số lượng trong kho!",
        type: "warning",
      });
      return;
    }

    try {
      dispatch(addToCart(userId, productData._id, count, priceToAdd));
      showNotification({
        message: "Thêm sản phẩm vào giỏ hàng thành công!",
        type: "success",
      });
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      showNotification({
        message: "Thêm sản phẩm vào giỏ hàng thất bại!",
        type: "failed",
      });
    }
  };

  const handleBuyNow = () => {
    if (!userId) {
      alert("Bạn cần đăng nhập để mua hàng!");
      navigate("/login");
      return;
    }
    // Thêm logic mua ngay ở đây nếu có
  };
  useEffect(() => {
    if (productData) {
      const max = isFlashSale
        ? (flashSaleData?.quantity || 0) - (flashSaleData?.sold || 0)
        : productData?.stock || 0;
      setMaxQuantity(max);
      console.log("✅ maxQuantity:", max);
    }
  }, [productData, flashSaleData, isFlashSale]);


  const handleLimitExceeded = () => {
    showNotification({
      message: "Không được thêm vượt quá số lượng trong kho!",
      type: "warning",
    });
  };

  return (
    <div className="bg-white">
      <div className="lg:px-72 mx-auto p-4">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Hình ảnh sản phẩm */}
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

          {/* Thông tin chi tiết */}
          <div>
            <h2 className="text-3xl font-bold">{productData?.name}</h2>

            <div className="flex items-center justify-start mt-2">
              <StarRating />
              <span className="ml-2">Có {comments.length} đánh giá</span>
            </div>

            <div className="mt-2">
              <p className="text-2xl font-bold text-red-600">
                {formatCurrency(salePrice)}
              </p>
              {isFlashSale && (
                <>
                  <p className="text-sm text-gray-400 line-through">
                    {formatCurrency(originalPrice)}
                  </p>
                  <span className="inline-block mt-1 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    -{discountPercent}%
                  </span>
                  <p className="text-sm mt-1 text-orange-500 font-medium">
                    🔥 Flash Sale: Còn lại {(flashSaleData?.quantity || 0) - (flashSaleData?.sold || 0)} sản phẩm!
                  </p>
                </>
              )}
            </div>

            <div className="text-sm text-gray-600 mt-1">
              {productData?.stock > 0
                ? `Còn lại: ${productData.stock} sản phẩm`
                : "Hết hàng"}
            </div>

            <div className="mt-4">
              <p className="font-medium">Màu sắc: {productData?.color}</p>
            </div>

            <CountButton count={count} setCount={setCount} stock={maxQuantity} onLimitExceeded={handleLimitExceeded} />

            <div className="flex gap-4 mt-6">
              <button
                onClick={handleAddToCart}
                disabled={!userId || productData?.stock === 0}
                className={`sm:w-48 w-40 py-3 rounded-md ${!userId || productData?.stock === 0
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
                  }`}
              >
                {!userId
                  ? "Đăng nhập để mua"
                  : productData?.stock === 0
                    ? "Hết hàng"
                    : "Thêm vào giỏ hàng"}
              </button>
              <button
                onClick={handleBuyNow}
                disabled={!userId}
                className={`sm:w-40 w-40 py-3 rounded-md border ${userId ? "border-indigo-600 text-indigo-600" : "border-gray-400 text-gray-400 cursor-not-allowed"}`}
              >
                {userId ? "Mua ngay" : "Đăng nhập"}
              </button>
            </div>
          </div>
        </div>

        {/* Mô tả sản phẩm */}
        <div className="mt-10 px-40 sm:px-10">
          <h3 className="text-3xl  lg:text-xl font-bold">Mô tả sản phẩm</h3>
          <p className="text-gray-900 mt-2 line-clamp-4 sm:line-clamp-none hyphens-manual">
            {productData?.description}
          </p>
        </div>
      </div>

      {/* Sản phẩm liên quan & Bình luận */}
      <ProductRelated id={id} accessToken={null} product={productData} />
      <CommentPage productId={id} />
    </div>
  );
};

export default ProductDetailPage;
