import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useModelContext } from "../../context/ModelProvider";
import {
  getDistricts,
  getProvinces,
  getWards,
} from "../../redux/api/apiRequestLocation";
import { getCart, removeCart } from "../../redux/api/cartApiRequest";
import { sellProduct } from "../../redux/api/inventoryApiRequest";
import { addOrder } from "../../redux/api/orderApiRequest";
import { memoizedCartItemsSelector } from "../../redux/slices/selectors/cartSelectors";
import { formatCurrency } from "../../utils/format";
import { clearDistricts, clearWards } from "../../redux/slices/locationSlice";

export default function CheckoutPage() {
  const checkedItems = useSelector((state) => state.cart.checkedItems);
  const accessToken = useSelector(
    (state) => state.auth.login.currentUser?.accessToken
  );
  console.log("checkedItems",checkedItems);
  const userId = useSelector((state) => state.auth.login.currentUser?._id);
  const user = useSelector((state) => state.auth.login.currentUser);
  const cartItemsRedux = useSelector(memoizedCartItemsSelector);
  const [cartItems, setCartItems] = useState([]);
  const { provinces, districts, wards } = useSelector((state) => state.address);
console.log(cartItems);
  const [provinceCode, setProvinceCode] = useState("");
  const [districtCode, setDistrictCode] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showNotification } = useModelContext();
  const selectedItems = cartItems.filter(
    (item) => checkedItems[item.productId._id]
  );console.log("selectedItems",selectedItems);
  const totalPrice = selectedItems.reduce((total, item) => {
    return total + item.productId.price * item.quantity;
  }, 0);
  const [formData, setFormData] = useState({
    nameUser: "",
    phone: "",
    address: "",
    ward: "",
    district: "",
    province: "",
    paymentMethod: "",
    voucher: "",
  });
  useEffect(() => {
    const updatedCartFromLocal = JSON.parse(localStorage.getItem("updatedCart")) || [];
  
    if (updatedCartFromLocal.length > 0) {
      const merged = cartItemsRedux.map((item) => {
        const updated = updatedCartFromLocal.find(u => u.productId._id === item.productId._id);
        if (updated) {
          return { ...item, quantity: updated.quantity };
        }
        return item;
      });
      setCartItems(merged);
    } else {
      setCartItems(cartItemsRedux);
    }
  }, [cartItemsRedux]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  useEffect(() => {
    getProvinces(dispatch);
  }, [dispatch]);
  const handleProvinceChange = (e) => {
    const code = e.target.value;
    const selected = provinces.find((p) => p.code === +code);
    setProvinceCode(code);
    setDistrictCode("");
    dispatch(clearDistricts());
    getDistricts(dispatch, code);
    setFormData((prev) => ({
      ...prev,
      province: selected?.name || "",
      district: "",
      ward: "",
    }));
  };

  const handleDistrictChange = (e) => {
    const code = e.target.value;
    const selected = districts.find((d) => d.code === +code);
    setDistrictCode(code);
    dispatch(clearWards());
    getWards(dispatch, code);
    setFormData((prev) => ({
      ...prev,
      district: selected?.name || "",
      ward: "",
    }));
  };
  const fullAddress = `${formData.address}, ${formData.ward}, ${formData.district}, ${formData.province}`;
  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      user: userId,
      totalPrice,

      items: selectedItems.map((item) => ({
        productId: item.productId._id,
        name: item.productId.name,
        image: item.productId.images,
        price: item.productId.price,
        quantity: item.quantity,
      })),
      paymentMethod: formData.paymentMethod,
      buyerInfo: {
        name: formData.nameUser,
        phone: formData.phone,
        address: fullAddress,
        voucher: formData.voucher,
      },
    };

    try {
      await dispatch(addOrder(orderData, accessToken));
      console.log("🟡 orderData gửi đi:", orderData);
      for (const item of selectedItems) {
        sellProduct(item.productId._id, item.quantity, dispatch);
        console.log("gui di trong for ", item.productId.id, item.quantity);
        console.log("Gọi sell với:", item.productId._id);
      }

      selectedItems.forEach((item) => {
        dispatch(removeCart(userId, item.productId._id));
      });
      dispatch(getCart(user._id));
      showNotification({
        message: "Đặt hàng thành công!",
        type: "success",
      });
      setTimeout(() => {
        navigate("/order");
      }, 1500);
    } catch (error) {
      console.log(error);
      showNotification({
        message: "Đặt hàng thất bại!",
        type: "error",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-indigo-600 mb-8 text-center">
          Thanh toán
        </h1>

        <div className="">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Giỏ hàng */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Giỏ hàng
              </h2>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {selectedItems.length > 0 ? (
                  selectedItems.map((item) => (
                    <div
                      key={item.productId._id}
                      className="flex items-center gap-4 border-b pb-4"
                    >
                      <img
                        src={`http://localhost:5000${item.productId?.images[0]||"/default-image.jpg"}`}
                        className="w-10 h-auto object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900">
                          {item.productId?.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Màu: {item.productId?.color}
                        </p>
                        <p className="text-sm text-gray-500">
                          Số lượng: {item.quantity}
                        </p>
                      </div>
                      <p className="text-lg font-semibold text-indigo-600">
                        {formatCurrency(item.productId?.price * item.quantity)}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center">
                    Giỏ hàng của bạn trống
                  </p>
                )}
                <div className="mt-6 border-t pt-4">
                  <div className="flex justify-between text-lg font-semibold text-gray-900">
                    <span>Tổng tiền</span>
                    <span className="text-indigo-600">
                      {formatCurrency(totalPrice)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Thông tin vận chuyển và thanh toán */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Thông tin vận chuyển và thanh toán
              </h2>
              <div className="space-y-4">
                {/* Họ tên */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Họ tên
                  </label>
                  <input
                    type="text"
                    name="nameUser"
                    value={formData.nameUser}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="John Doe"
                  />
                </div>

                {/* Số điện thoại */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Số điện thoại
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="+84"
                  />
                </div>

                {/* Địa chỉ */}
                <div className="">
                  <div>
                    <label>Tỉnh/Thành phố</label>
                    <select
                      value={provinceCode}
                      onChange={handleProvinceChange}
                      className="w-full p-2 border"
                    >
                      <option value="">-- Chọn tỉnh --</option>
                      {provinces.map((p) => (
                        <option key={p.code} value={p.code}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label>Quận/Huyện</label>
                    <select
                      value={districtCode}
                      onChange={handleDistrictChange}
                      className="w-full p-2 border"
                      disabled={!districts.length}
                    >
                      <option value="">-- Chọn huyện --</option>
                      {districts.map((d) => (
                        <option key={d.code} value={d.code}>
                          {d.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label>Phường/Xã</label>
                    <select
                      className="w-full p-2 border"
                      disabled={!wards.length}
                      onChange={(e) => {
                        const selected = wards.find((w) => w.code === +e.target.value);
                        setFormData((prev) => ({
                          ...prev,
                          ward: selected?.name || "",
                        }));
                      }}
                    >
                      <option value="">-- Chọn xã --</option>
                      {wards.map((w) => (
                        <option key={w.code} value={w.code}>
                          {w.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className=" ">
                <div className=" ">
  <label htmlFor="address">Số nhà, tên đường</label>
  <input
    placeholder="Nhập tên đường,..."
    type="text"
    name="address"
    value={formData.address}
    onChange={handleChange}
    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
  />
</div>
                  {/* Voucher */}
                  <div></div>

                  <label className="block text-sm font-medium text-gray-700">
                    Voucher
                  </label>
                  <input
                    type="text"
                    name="voucher"
                    value={formData.voucher}
                    onChange={handleChange}
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Nhập mã voucher"
                  />
                </div>

                {/* Phương thức thanh toán */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phương thức thanh toán
                  </label>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="creditCard"
                        checked={formData.paymentMethod === "creditCard"}
                        onChange={handleChange}
                        className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                      />
                      <label className="ml-2 text-sm text-gray-700">
                        Chuyển khoản ngân hàng
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cashOnDelivery"
                        checked={formData.paymentMethod === "cashOnDelivery"}
                        onChange={handleChange}
                        className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                      />
                      <label className="ml-2 text-sm text-gray-700">
                        Thanh toán khi nhận hàng
                      </label>
                    </div>
                  </div>
                </div>

                {/* Nút xác nhận */}
                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md font-semibold hover:bg-indigo-700 transition duration-300 shadow-md"
                  >
                    Đặt hàng
                  </button>
                </div>
                <div className="text-center mt-4">
                  <Link
                    to="/"
                    className="text-sm text-indigo-600 hover:underline"
                  >
                    Quay lại trang chủ
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
