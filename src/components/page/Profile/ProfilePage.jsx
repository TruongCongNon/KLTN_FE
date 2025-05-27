import React, { useState, useEffect } from "react";
import {
  HomeIcon,
  MailIcon,
  PencilLineIcon,
  PhoneIcon,
  ShieldCheck,
  UserCircleIcon,
  X
} from "lucide-react";

const ProfilePage = () => {
  const [user, setUser] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    setUser(currentUser);
    setFormData(currentUser);
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = () => {
    localStorage.setItem("currentUser", JSON.stringify(formData));
    setUser(formData);
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-5xl mx-auto mt-20 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-6">
            <img
              src={`http://localhost:5000${user.images}`}
              alt="Avatar"
              className="w-28 h-28 rounded-full border-4 border-indigo-600 object-cover shadow"
            />
            <div>
              <h2 className="text-3xl font-bold text-gray-800">{user.username}</h2>
              <p className="text-gray-500 flex items-center gap-1 mt-1">
                <ShieldCheck className="w-5 h-5 text-indigo-500" />
                {user.role || "Người dùng"}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
          >
            <PencilLineIcon className="w-5 h-5" />
            Cập nhật thông tin
          </button>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <ProfileField icon={<MailIcon className="h-5 w-5" />} label="Email" value={user.email} />
          <ProfileField icon={<PhoneIcon className="h-5 w-5" />} label="Số điện thoại" value={user.phone || "Chưa cập nhật"} />
          <ProfileField icon={<HomeIcon className="h-5 w-5" />} label="Địa chỉ" value={user.address || "Chưa cập nhật"} />
          <ProfileField icon={<UserCircleIcon className="h-5 w-5" />} label="Trạng thái" value={user.status || "Chưa rõ"} />
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full shadow-md relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
              onClick={() => setIsModalOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold text-indigo-600 mb-4">Cập nhật thông tin</h2>

            <div className="space-y-4">
              <input
                type="text"
                name="username"
                placeholder="Tên người dùng"
                value={formData.username}
                onChange={handleChange}
                className="w-full border p-2 rounded-md"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border p-2 rounded-md"
              />
              <input
                type="text"
                name="phone"
                placeholder="Số điện thoại"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border p-2 rounded-md"
              />
              <input
                type="text"
                name="address"
                placeholder="Địa chỉ"
                value={formData.address}
                onChange={handleChange}
                className="w-full border p-2 rounded-md"
              />
            </div>

            <div className="mt-6 text-right">
              <button
                onClick={handleUpdate}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                Lưu thay đổi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ProfileField = ({ icon, label, value }) => (
  <div className="flex items-start bg-gray-50 p-4 rounded-lg border shadow-sm hover:shadow-md transition">
    <div className="p-2 bg-indigo-100 text-indigo-600 rounded-full mr-4">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-lg font-medium text-gray-800 mt-1">{value}</p>
    </div>
  </div>
);

export default ProfilePage;
