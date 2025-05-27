import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useModelContext } from "../../../context/ModelProvider";
import { cancelOrder, getOrderById } from "../../../redux/api/orderApiRequest";
import { formatCurrency } from "../../../utils/format";
import Button from "../../Button/Button";
import AddressModal from "../../Modal/ModalAddress";

const ProductDetailPage = () => {
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState("");

  const navigate = useNavigate();
  const { showAlert ,showNotification} = useModelContext();
  const { id } = useParams();
  const dispatch = useDispatch();
  const dataOrderDetail = useSelector(
    (state) => state.order.getOrderById?.data
  );
  const accessToken = useSelector(
    (state) => state.auth.login.currentUser?.accessToken
  );

  const isLoading = !dataOrderDetail;
  const isCancelled = dataOrderDetail?.status === "Đã hủy";
  const isDelivered = dataOrderDetail?.status === "Đã giao hàng";

  useEffect(() => {
    if (id) {
      dispatch(getOrderById(id));
    }
  }, [dispatch, id]);

  const handleCancelOrder = () => {
    showAlert({
      title: "Xác nhận hủy đơn",
      description: "Bạn có chắc chắn muốn hủy đơn hàng này?",
      onConfirm: async () => {
        try {
          await dispatch(cancelOrder(id, accessToken, navigate));
          dispatch(getOrderById(id));
          showNotification({
            message: "Hủy đơn hàng thành công!",
            type: "success",
          });
          navigate("/order/");
        } catch (error) {
          alert("Hủy đơn hàng thất bại!");
        }
      },
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8 relative">
      {isLoading ? (
        <div className="flex justify-center items-center h-96">
          <p className="text-gray-500 text-xl">Đang tải đơn hàng...</p>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold text-indigo-600 mb-4 text-center">
            Chi tiết đơn hàng
          </h1>

          <div className="mb-6">
            <h2 className="text-xl font-bold text-indigo-600 mb-4">
              Thông tin người đặt
            </h2>
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Họ tên:</span>{" "}
                {dataOrderDetail.buyerInfo?.name || "Không có"}
              </p>
              <p>
                <span className="font-semibold">Số điện thoại:</span>{" "}
                {dataOrderDetail.buyerInfo?.phone || "Không có"}
              </p>
              <p>
                <span className="font-semibold">Địa chỉ giao hàng:</span>{" "}
                {dataOrderDetail.buyerInfo?.address || "Không có"}
              </p>
              <p>
                <span className="font-semibold">Phương thức thanh toán:</span>{" "}
                {dataOrderDetail.paymentMethod === "creditCard"
                  ? "Thẻ tín dụng"
                  : "Thanh toán tiền mặt"}
              </p>
            </div>
            {!isCancelled && (
              <div className="flex justify-end mt-5">
                <Button
                  title="Thay đổi địa chỉ"
                  onClick={() => setShowAddressModal(true)}
                />
              </div>
            )}
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-bold text-indigo-600 mb-4">
              Sản phẩm đã đặt
            </h2>
            <div className="space-y-4">
              {dataOrderDetail.items?.map((item, index) => {
                // nếu có flash sale, dùng finalPrice, ngược lại giá gốc
                const unitPrice =
                  item.finalPrice ?? item.productId?.price;
                const subtotal = unitPrice * item.quantity;

                return (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 border rounded-md hover:bg-gray-50"
                  >
                    <img
                      src={`http://localhost:5000${
                        item.productId?.images?.[0] ||
                        "/default-image.jpg"
                      }`}
                      alt={item.name}
                      className="w-20 h-20 rounded-md"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {item.name}
                      </h3>
                      <p className="text-gray-600">
                        Giá: {formatCurrency(unitPrice)}
                      </p>
                      <p className="text-gray-600">
                        Số lượng: {item.quantity}
                      </p>
                    </div>
                    <div className="text-lg font-bold text-indigo-600">
                      {formatCurrency(subtotal)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="border-t pt-6 text-right">
            <p className="text-2xl font-bold text-gray-800">
              Tổng tiền:{" "}
              <span className="text-indigo-600">
                {formatCurrency(dataOrderDetail.totalPrice)}
              </span>
            </p>
          </div>

          <div className="flex gap-10 items-center justify-end mt-4">
            {!isCancelled && !isDelivered && (
              <>
                <Button title="Hủy đơn" onClick={handleCancelOrder} />
                {dataOrderDetail.paymentMethod === "creditCard" && (
                  <Button title="Thanh toán" onClick={() => setShowQR(true)} />
                )}
              </>
            )}

            {(isCancelled || isDelivered) && (
              <Button title="Mua lại" onClick={() => navigate("/")} />
            )}
          </div>
        </>
      )}

      {showAddressModal && (
        <AddressModal
          orderId={id}
          onClose={() => setShowAddressModal(false)}
          onSuccess={() => dispatch(getOrderById(id))}
        />
      )}
    </div>
  );
};

export default ProductDetailPage;
