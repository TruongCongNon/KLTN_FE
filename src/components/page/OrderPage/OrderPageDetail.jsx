import React, { useEffect, useState } from "react"; // ⚡ Nhớ import useState
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { cancelOrder, getOrderById } from "../../../redux/api/orderApiRequest";
import Button from "../../Button/Button";
import { useModelContext } from "../../../context/ModelProvider";
import { formatCurrency } from "../../../utils/format";



const ProductDetailPage = () => {
  const navigate = useNavigate();
  const { showAlert } = useModelContext();
  const { id } = useParams();
  const dispatch = useDispatch();
  const dataOrderDetail = useSelector((state) => state.order.getOrderById?.data) || null;
  const accessToken = useSelector((state) => state.auth.login.currentUser?.accessToken);

  const [paymentUrl, setPaymentUrl] = useState("");
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(getOrderById(id));
    }
  }, [dispatch, id]);

  if (!dataOrderDetail) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-xl">Đang tải đơn hàng...</p>
      </div>
    );
  }

  const { buyerInfo, items, totalPrice, status } = dataOrderDetail;
  console.log("dataOrderDetail",dataOrderDetail);
console.log("totalPrice",totalPrice);
  const handleCancelOrder = () => {
    showAlert({
      title: "Xác nhận hủy đơn",
      description: "Bạn có chắc chắn muốn hủy đơn hàng này?",
      onConfirm: async () => {
        try {
          await dispatch(cancelOrder(id, accessToken, navigate));
          dispatch(getOrderById(id));
          navigate("/order");
        } catch (error) {
          alert("Hủy đơn hàng thất bại!");
        }
      },
    });
  };

  const handlePayment = async () => {
    try {
      const orderId = "ORDER" + Date.now();
      const amountToSend = totalPrice/100; // 
      console.log("amountToSend",amountToSend);
      const url = await createPaymentUrl(dispatch, amountToSend, orderId);
      setPaymentUrl(url);
      console.log("url", url);
      setShowQR(true); // mở QR lên
    } catch (error) {
      console.error("Lỗi khi tạo link thanh toán:", error);
    }
  };

  const isCancelled = status === "Đã hủy";

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8 relative">
      <h1 className="text-2xl font-bold text-indigo-600 mb-4 flex justify-center">Chi tiết đơn hàng</h1>

      {/* Thông tin người đặt */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-indigo-600 mb-4">Thông tin người đặt</h2>
        <div className="space-y-2">
          <p><span className="font-semibold">Họ tên:</span> {buyerInfo?.name || "Không có"}</p>
          <p><span className="font-semibold">Số điện thoại:</span> {buyerInfo?.phone || "Không có"}</p>
          <p><span className="font-semibold">Địa chỉ giao hàng:</span> {buyerInfo?.address || "Không có"}</p>
        </div>
        {!isCancelled && (
          <div className="flex justify-end mt-5">
            <Button title="Thay đổi địa chỉ" />
          </div>
        )}
      </div>

      {/* Danh sách sản phẩm */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-indigo-600 mb-4">Sản phẩm đã đặt</h2>
        <div className="space-y-4">
          {items?.map((item, index) => (
            <div key={index} className="flex items-center gap-4 p-4 border rounded-md hover:bg-gray-50">
              <img
                src={`http://localhost:5000${item.productId?.images?.[0] || "/default-image.jpg"}`}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-md"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                <p className="text-gray-600">Giá: {formatCurrency(item.productId?.price)}</p>
                <p className="text-gray-600">Số lượng: {item.quantity}</p>
              </div>
              <div className="text-lg font-bold text-indigo-600">
                {formatCurrency(item.productId?.price * item.quantity)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tổng tiền */}
      <div className="border-t pt-6 text-right">
        <p className="text-2xl font-bold text-gray-800">
          Tổng tiền: <span className="text-indigo-600">{formatCurrency(totalPrice)}</span>
        </p>
      </div>

      {/* Các nút thao tác */}
      <div className="flex gap-10 items-center float-end mt-4">
        {!isCancelled && (
          <div onClick={handleCancelOrder}>
            <Button title="Hủy đơn" />
          </div>
        )}
        <div onClick={!isCancelled ? handlePayment : undefined}>
          <Button
            title={isCancelled ? "Mua lại" : "Thanh toán"}
            className="bg-transparent"
          />
        </div>
      </div>

      {/* Modal QR Code */}
      {showQR && paymentUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg flex flex-col items-center space-y-4">
            <h2 className="text-xl font-bold text-indigo-600">Quét QR để thanh toán</h2>
            <QRCodeSVG value={paymentUrl} size={250} />
            <button
              onClick={() => setShowQR(false)}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
