import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllFlashSale } from "../../redux/api/apiRequestFlashSale";
import { formatCurrency } from "../../utils/format";
import FlashSaleProgress from "../FlashSaleProgress/FlashSaleProgress";
import { useNavigate } from "react-router-dom";
import FlashSaleCountdown from "../FlashSaleCountDown/FlashSaleCountDown";

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
  }, [dispatch]);
  console.log("data", data);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="flex items-center space-x-5 sm:space-x-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-red-500 whitespace-nowrap">
              Flash Sales
            </h2>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {data?.length > 0 ? (
          data?.map((product) => (
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
              <div className="relative bg-gray-100 aspect-square flex items-center justify-center p-4">
                {/* Lấy ảnh đầu tiên trong mảng images */}
                <img
                  src={`http://localhost:5000${product.productId?.variants[0]?.images[0] || ''}`}
                  alt={product.productId?.name}
                  className="max-h-full hover:scale-110 duration-150 max-w-full object-contain"
                />
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                  ~{product.discountPrice}%
                </div>
              </div>
              <div className="p-3 text-center">
                <h3
                  className="text-sm sm:text-base font-semibold text-gray-800 truncate"
                  title={product.productId?.name}
                >
                  {product.productId?.name}
                </h3>
                {/* Hiển thị đồng hồ đếm ngược */}
                <FlashSaleCountdown className="line-clamp-1" endTime={product.endTime} />
                <div className="grid grid-cols-1 space-x-1 mt-1">
                  <span className="text-red-600 font-bold text-base sm:text-lg">
                    {formatCurrency(
                      product.productId?.variants[0]?.price -
                        (product.productId?.variants[0]?.price * product.discountPrice) / 100
                    )}
                  </span>
                  <span className="line-through text-gray-400 text-xs sm:text-sm">
                    {formatCurrency(product.productId?.variants[0]?.price)}
                  </span>
                </div>
                {/* Hiển thị tiến độ bán hàng */}
                <FlashSaleProgress
                  sold={product.sold || 0}
                  total={product.quantity || 1}
                />
              </div>
            </div>
          ))
        ) : (
          <div>Chưa có chương trình flash sale</div>
        )}
      </div>
    </div>
  );
};

export default FlashSale;
