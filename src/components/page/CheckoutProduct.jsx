import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getProvinces, getDistricts, getWards } from "../../redux/api/apiRequestLocation";
import { getCart, removeCart } from "../../redux/api/cartApiRequest";
import { sellProduct } from "../../redux/api/inventoryApiRequest";
import { addOrder } from "../../redux/api/orderApiRequest";
import { memoizedCartItemsSelector } from "../../redux/slices/selectors/cartSelectors";
import { clearDistricts, clearWards } from "../../redux/slices/locationSlice";
import { useModelContext } from "../../context/ModelProvider";
import { formatCurrency } from "../../utils/format";
import { buyProductFlashSale } from "../../redux/api/apiRequestFlashSale";

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showNotification } = useModelContext();

  const user = useSelector((state) => state.auth.login.currentUser);
  const accessToken = user?.accessToken;
  const userId = user?._id;
  const checkedItems = useSelector((state) => state.cart.checkedItems);
  const cartItemsRedux = useSelector(memoizedCartItemsSelector);
  const { provinces, districts, wards } = useSelector((state) => state.address);
  const flashSales = useSelector((state) => state.flashSale?.getAllFlashSale?.data || []);

  const [cartItems, setCartItems] = useState([]);
  const [provinceCode, setProvinceCode] = useState("");
  const [districtCode, setDistrictCode] = useState("");
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

  const selectedItems = cartItems.filter((item) => checkedItems[item.productId._id]);

  const fullAddress = `${formData.address}, ${formData.ward}, ${formData.district}, ${formData.province}`;

  useEffect(() => {
    getProvinces(dispatch);
  }, [dispatch]);

  useEffect(() => {
    const updatedCart = JSON.parse(localStorage.getItem("updatedCart")) || [];
    if (updatedCart.length > 0) {
      const merged = cartItemsRedux.map((item) => {
        const updated = updatedCart.find((u) => u.productId._id === item.productId._id);
        return updated ? { ...item, quantity: updated.quantity } : item;
      });
      setCartItems(merged);
    } else {
      setCartItems(cartItemsRedux);
    }
  }, [cartItemsRedux]);

  const handleProvinceChange = (e) => {
    const code = e.target.value;
    const selected = provinces.find((p) => p.code === +code);
    setProvinceCode(code);
    setDistrictCode("");
    dispatch(clearDistricts());
    getDistricts(dispatch, code);
    setFormData((prev) => ({ ...prev, province: selected?.name || "", district: "", ward: "" }));
  };

  const handleDistrictChange = (e) => {
    const code = e.target.value;
    const selected = districts.find((d) => d.code === +code);
    setDistrictCode(code);
    dispatch(clearWards());
    getWards(dispatch, code);
    setFormData((prev) => ({ ...prev, district: selected?.name || "", ward: "" }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const totalPrice = selectedItems.reduce((total, item) => {
    const flash = flashSales.find(fs => fs.productId._id === item.productId._id);
    const flashLeft = (flash?.quantity || 0) - (flash?.sold || 0);
    const validFlash = flash && flashLeft > 0;

    const finalPrice = validFlash ? flash.discountPrice : item.productId.price;
    return total + finalPrice * item.quantity;
  }, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nameUser, phone, address, ward, district, province } = formData;
    if (!nameUser || !phone || !address || !ward || !district || !province) {
      showNotification({
        message: "Vui lòng điền đầy đủ thông tin.",
        type: "warning",
      });
      return;
    }
    const itemsToOrder = selectedItems.map((item) => {
      const flash = flashSales.find(fs => fs.productId._id === item.productId._id);
      const flashLeft = (flash?.quantity || 0) - (flash?.sold || 0);
      const validFlash = flash && flashLeft > 0;

      return {
        productId: item.productId._id,
        quantity: item.quantity,
        finalPrice: validFlash ? flash.discountPrice : item.productId.price,
        priceSale: validFlash ? flash.discountPrice : 0,
      };
    });

    const orderData = {
      user: userId,
      totalPrice,
      items: itemsToOrder,
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
      for (const item of selectedItems) {
        dispatch(removeCart(userId, item.productId._id));
        await sellProduct(item.productId._id, item.quantity, dispatch);

        const flash = flashSales.find(fs => fs.productId._id === item.productId._id);
        const flashLeft = (flash?.quantity || 0) - (flash?.sold || 0);
        const validFlash = flash && flashLeft > 0;

        if (validFlash) {
          await buyProductFlashSale(dispatch, {
            productId: item.productId._id,
            quantity: item.quantity,
          });
        }
      }
      dispatch(getCart(userId));
      showNotification({ message: "Đặt hàng thành công!", type: "success" });
      setTimeout(() => navigate("/order"), 1500);
    } catch (error) {
      console.error(error);
      showNotification({ message: "Đặt hàng thất bại!", type: "error" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-indigo-600 mb-8 text-center">Thanh toán</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Giỏ hàng */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Giỏ hàng</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {selectedItems.length > 0 ? (
                selectedItems.map((item) => {
                  const flash = flashSales.find(fs => fs.productId._id === item.productId._id);
                  const flashLeft = (flash?.quantity || 0) - (flash?.sold || 0);
                  const validFlash = flash && flashLeft > 0;
                  const unitPrice = validFlash ? flash.discountPrice : item.productId.price;

                  return (
                    <div key={item.productId._id} className="flex items-center gap-4 border-b pb-4">
                      <img
                        src={`http://localhost:5000${item.productId.images[0] || "/default.jpg"}`}
                        className="w-10 h-auto object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900">{item.productId.name}</h3>
                        <p className="text-sm text-gray-500">Màu: {item.productId.color}</p>
                        <p className="text-sm text-gray-500">Số lượng: {item.quantity}</p>
                        {validFlash && (
                          <p className="text-sm text-orange-500">
                            Flash Sale: {formatCurrency(unitPrice)}
                          </p>
                        )}
                      </div>
                      <p className="text-lg font-semibold text-gray-800">
                        {formatCurrency(unitPrice * item.quantity)}
                      </p>
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-500 text-center">Giỏ hàng của bạn trống</p>
              )}
              <div className="mt-6 border-t pt-4">
                <div className="flex justify-between text-lg font-semibold text-gray-900">
                  <span>Tổng tiền</span>
                  <span className="text-indigo-600">{formatCurrency(totalPrice)}</span>
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
              <input name="nameUser" className="w-full p-2 border rounded" value={formData.nameUser} onChange={handleChange} placeholder="Họ tên" />
              <input name="phone" type="tel" className="w-full p-2 border rounded" value={formData.phone} onChange={handleChange} placeholder="Số điện thoại" />


              <select value={provinceCode} onChange={handleProvinceChange} className="w-full p-2 border rounded">
                <option value="">-- Chọn tỉnh --</option>
                {provinces.map((p) => <option key={p.code} value={p.code}>{p.name}</option>)}
              </select>

              <select value={districtCode} onChange={handleDistrictChange} className="w-full p-2 border rounded" disabled={!districts.length}>
                <option value="">-- Chọn huyện --</option>
                {districts.map((d) => <option key={d.code} value={d.code}>{d.name}</option>)}
              </select>

              <select onChange={(e) => {
                const selected = wards.find((w) => w.code === +e.target.value);
                setFormData((prev) => ({ ...prev, ward: selected?.name || "" }));
              }} className="w-full p-2 border rounded" disabled={!wards.length}>
                <option value="">-- Chọn xã --</option>
                {wards.map((w) => <option key={w.code} value={w.code}>{w.name}</option>)}
              </select>
              <input name="address" value={formData.address} onChange={handleChange} placeholder="Số nhà, tên đường..." className="w-full p-2 border rounded" />
              <input name="voucher" value={formData.voucher} onChange={handleChange} placeholder="Nhập mã voucher (nếu có)" className="w-full p-2 border rounded" />

              <div className="mt-2 space-y-2">
                <label><input type="radio" name="paymentMethod" value="creditCard" checked={formData.paymentMethod === "creditCard"} onChange={handleChange} /> Chuyển khoản ngân hàng</label><br />
                <label><input type="radio" name="paymentMethod" value="cashOnDelivery" checked={formData.paymentMethod === "cashOnDelivery"} onChange={handleChange} /> Thanh toán khi nhận hàng</label>
              </div>

              <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded font-semibold hover:bg-indigo-700">
                Đặt hàng
              </button>
              <Link to="/" className="block text-center text-sm text-indigo-600 hover:underline mt-2">Quay lại trang chủ</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
