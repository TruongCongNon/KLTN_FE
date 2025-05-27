import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDistricts, getProvinces, getWards } from "../../redux/api/apiRequestLocation";
import { updateAddress, getOrderById } from "../../redux/api/orderApiRequest";
import { useModelContext } from "../../context/ModelProvider";

const AddressModal = ({ orderId, onClose, onSuccess }) => {
  const dispatch = useDispatch();
  const provinces = useSelector((state) => state.address.provinces);
  const districts = useSelector((state) => state.address.districts);
  const wards = useSelector((state) => state.address.wards);
  const orderDetail = useSelector((state) => state.order.getOrderById?.data);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [street, setStreet] = useState("");
  const [loading, setLoading] = useState(false);
  const { showNotification } = useModelContext();
  const nameInputRef = useRef(null);

  useEffect(() => {
    getProvinces(dispatch);
    setTimeout(() => nameInputRef.current?.focus(), 100);
  }, []);

  useEffect(() => {
    if (province) getDistricts(dispatch, province);
  }, [province]);

  useEffect(() => {
    if (district) getWards(dispatch, district);
  }, [district]);

  useEffect(() => {
    if (orderDetail?.buyerInfo) {
      setName(orderDetail.buyerInfo.name || "");
      setPhone(orderDetail.buyerInfo.phone || "");
      setStreet(orderDetail.buyerInfo.address?.split(",")[0] || "");
    }
  }, [orderDetail]);

  const handleSubmit = async () => {
    const provinceName = provinces.find((p) => p.code === parseInt(province))?.name || "";
    const districtName = districts.find((d) => d.code === parseInt(district))?.name || "";
    const fullAddress = `${street}, ${ward}, ${districtName}, ${provinceName}`;

    if (!name.trim() || !phone.trim() || !street || !ward || !district || !province) {
      showNotification({
        message: "Vui lòng nhập đầy đủ thông tin!",
        type: "warning",
      });
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("address", fullAddress);

    setLoading(true);
    try {
      await updateAddress(dispatch, orderId, formData);
      await dispatch(getOrderById(orderId)); // ✅ fix: dùng đúng orderId
      showNotification({
        message: "Cập nhật địa chỉ thành công!",
        type: "success",
      });
      onSuccess(fullAddress);
      onClose();
    } catch (error) {
      showNotification({
        message: "Cập nhật địa chỉ thất bại!",
        type: "failed",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md w-[90%] max-w-xl">
        <h2 className="text-xl font-semibold text-indigo-600 mb-4">Cập nhật thông tin giao hàng</h2>

        <div className="space-y-3">
          <input
            type="text"
            placeholder="Họ và tên"
            className="w-full border p-2 rounded"
            ref={nameInputRef}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Số điện thoại"
            className="w-full border p-2 rounded"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="text"
            placeholder="Số nhà, tên đường"
            className="w-full border p-2 rounded"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
          <select value={province} onChange={(e) => setProvince(e.target.value)} className="w-full border p-2 rounded">
            <option value="">-- Chọn tỉnh --</option>
            {provinces.map((p) => (
              <option key={p.code} value={p.code}>{p.name}</option>
            ))}
          </select>
          <select value={district} onChange={(e) => setDistrict(e.target.value)} className="w-full border p-2 rounded" disabled={!province}>
            <option value="">-- Chọn huyện --</option>
            {districts.map((d) => (
              <option key={d.code} value={d.code}>{d.name}</option>
            ))}
          </select>
          <select value={ward} onChange={(e) => setWard(e.target.value)} className="w-full border p-2 rounded" disabled={!district}>
            <option value="">-- Chọn xã --</option>
            {wards.map((w) => (
              <option key={w.code} value={w.name}>{w.name}</option>
            ))}
          </select>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500">Hủy</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" disabled={loading}>
            {loading ? "Đang lưu..." : "Cập nhật"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressModal;
