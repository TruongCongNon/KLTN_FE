import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { TABS } from "../../../constant/tabs";
import { useDispatch, useSelector } from "react-redux";
import { getOrderByUserId } from "../../../redux/api/orderApiRequest";
import Loading from "../../Loading/Loading";

const OrderPage = () => {
  const [activeId, setActiveId] = useState(0);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.login.currentUser?._id);
  const accessToken = useSelector(
    (state) => state.auth.login.currentUser?.accessToken
  );
  const data = useSelector((state) => state.order?.getOrderByUSerId.data);
  const [underlineStyle, setUnderlineStyle] = useState({ width: 0, left: 0 });
  const tabRefs = useRef([]);

  useEffect(() => {
    if (userId && accessToken) {
      dispatch(getOrderByUserId(userId));
    }
  }, [userId, accessToken, dispatch]);

  useEffect(() => {
    const activeTab = tabRefs.current[activeId];
    if (activeTab) {
      setUnderlineStyle({
        width: activeTab.offsetWidth,
        left: activeTab.offsetLeft,
      });
    }
  }, [activeId]);



  if (!data) {
    return <Loading />;
  }

  // Đếm số lượng đơn hàng theo từng trạng thái
  const orderCountByStatus = TABS.map(
    (tab) => data.filter((order) => order.status === tab.label).length
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <p className="text-3xl font-bold mb-6 text-gray-800">Đơn hàng của bạn</p>
      <div className="relative">
        <ul className="flex justify-around items-center relative">
          {TABS.map((tab, index) => (
            <li key={tab.id} ref={(el) => (tabRefs.current[tab.id] = el)}>
              <Link
                to="#"
                onClick={() => setActiveId(tab.id)}
                className={`py-2 px-4 text-gray-600 text-lg font-medium transition-colors duration-300 ${
                  activeId === tab.id
                    ? "text-indigo-600"
                    : "hover:text-indigo-500"
                }`}
              >
                {tab.label}{" "}
                <span className="ml-1 text-sm text-indigo-600">
                  ({orderCountByStatus[index]})
                </span>
              </Link>
            </li>
          ))}
          <div
            className="absolute bottom-0 h-1 bg-indigo-600 transition-all duration-300 ease-in-out rounded-xl"
            style={{ width: underlineStyle.width, left: underlineStyle.left }}
          />
        </ul>
      </div>
      <div className="mt-6">
        {data.length > 0 ? (
          <ul className="space-y-4">
            {data
              .filter((order) => order?.status === TABS[activeId]?.label)?.map((order) => {
                const totalPrice = order.items?.reduce(
                  (sum, item) => sum + item.productId?.price * item.quantity,
                  0
                );
                return (
                  <li
                    key={order._id}
                    className="p-4 bg-white rounded-lg shadow-md flex justify-between items-center"
                  >
                    <div>
                      <p className="text-lg font-semibold">
                        Đơn hàng {order._id}
                      </p>
                      <p className="text-gray-600">
                        Tổng tiền: {totalPrice.toLocaleString("vi-VN")} VNĐ
                      </p>
                      <p className="text-indigo-600">
                        Trạng thái: {order.status || "Chưa xác định"}
                      </p>
                      <p className="text-gray-500 text-sm">
                        Ngày đặt:{" "}
                        {new Date(
                          order.createdAt || Date.now()
                        ).toLocaleDateString()}
                      </p>
                    </div>
                    <Link
                      to={`detail/${order._id}  `}
                      className="text-indigo-600 hover:underline"
                    >
                      Xem chi tiết
                    </Link>
                  </li>
                );
              })}
          </ul>
        ) : (
          <p className="text-gray-600">
            Không có đơn hàng nào trong trạng thái này.
          </p>
        )}
      </div>
    </div>
  );
};

export default OrderPage;
