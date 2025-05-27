import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllFlashSale } from "../../redux/api/apiRequestFlashSale";
import { formatCurrency } from "../../utils/format";
import FlashSaleProgress from "../FlashSaleProgress/FlashSaleProgress";
import { useNavigate } from "react-router-dom";
import FlashSaleCountdown from "../FlashSaleCountDown/FlashSaleCountDown";
import { LazyLoadImage } from "react-lazy-load-image-component";

const FlashSale = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data, isFetching } = useSelector(
    (state) => state.flashSale.getAllFlashSale
  );

  useEffect(() => {
    if (!isFetching && data.length === 0) {
      getAllFlashSale(dispatch);
    }
  }, [dispatch, isFetching, data.length]);

  // Sắp xếp flash sale mới nhất lên đầu
  const sortedData = [...data].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-red-500">
          Flash Sales
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {sortedData.length > 0 ? (
          sortedData.map((product) => {
            const originalPrice = product.productId?.price || 0;
            const salePrice = product.discountPrice || 0;
            const discountPercent = Math.round(((originalPrice - salePrice) / originalPrice) * 100);

            return (
              <div
                key={product._id}
                onClick={() =>
                  navigate(`/product/${product.productId?._id}`, {
                    state: {
                      isFlashSale: true,
                      flashSaleData: product,
                    },
                  })
                }
                className="border rounded-lg cursor-pointer overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 bg-white"
              >
                {/* Hình ảnh và badge giảm giá */}
                <div className="relative bg-gray-100 aspect-square flex items-center justify-center p-4">
                  <LazyLoadImage
                    effect="blur"
                    src={`http://localhost:5000${product.productId?.images[0] || ""}`}
                    alt={product.productId?.name}
                    className="max-h-full hover:scale-110 duration-150 max-w-full object-contain"
                    afterLoad={() => {
                      const spans = document.querySelectorAll(".lazy-load-image-background.blur");
                      spans.forEach(span => span.classList.remove("blur"));
                    }}
                  />
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                    -{discountPercent}%
                  </div>
                </div>

                {/* Thông tin sản phẩm */}
                <div className="p-3 text-center space-y-1">
                  <h3
                    className="text-sm font-semibold text-gray-800 line-clamp-1"
                    title={product.productId?.name}
                  >
                    {product.productId?.name}
                  </h3>

                  {/* Countdown */}
                  <FlashSaleCountdown endTime={product.endTime} />

                  {/* Giá */}
                  <div className="mt-1">
                    <span className="text-red-600 font-bold text-base">
                      {formatCurrency(salePrice)}
                    </span>
                    <br />
                    <span className="line-through text-gray-400 text-sm">
                      {formatCurrency(originalPrice)}
                    </span>
                  </div>

                  {/* Số lượng và đã bán */}
                  <div className="text-xs text-gray-500">
                    Số lượng: {product.quantity} | Đã bán: {product.sold || 0}
                  </div>


                  <FlashSaleProgress
                    sold={product.sold || 0}
                    total={product.quantity || 1}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center text-gray-500">
            Chưa có chương trình flash sale
          </div>
        )}
      </div>
    </div>
  );
};

export default FlashSale;
