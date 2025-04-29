import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { resetPassword } from "../../../redux/api/authApiRequest";
import { useModelContext } from "../../../context/ModelProvider";

const ForgotPasswordPage = () => {
  const { showNotification } = useModelContext();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = localStorage.getItem("email");
    if (!email) return;
    if (newPassword !== confirmPassword) return;

    const dataPass = { newPassword, confirmPassword };
   try {
    resetPassword(email, dataPass, dispatch, navigate);
    showNotification({
      message: "Đổi mật khẩu thành công!",
      type: "success",
    });
   } catch (error) {
    showNotification({
      message: "Đổi mật khẩu thất bại!",
      type: "failed",
    });
   }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
        <h2 className="text-center text-2xl font-bold text-gray-900 mb-6">Quên mật khẩu</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="username"
            autoComplete="username"
            className="hidden"
            tabIndex={-1}
          />
          <div className="relative">
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
              Nhập mật khẩu mới
            </label>
            <input
              id="newPassword"
              name="newPassword"
              type={showNewPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 pr-10 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            />
            <span
              className="absolute top-9 right-3 cursor-pointer text-gray-500"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <EyeIcon className="h-5 w-5" /> : <EyeSlashIcon className="h-5 w-5" />}
            </span>
          </div>
          <div className="relative">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Xác nhận mật khẩu mới
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              autoComplete="new-password"
              type={showConfirmPassword ? "text" : "password"}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 pr-10 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            />
            <span
              className="absolute top-9 right-3 cursor-pointer text-gray-500"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeIcon className="h-5 w-5" /> : <EyeSlashIcon className="h-5 w-5" />}
            </span>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Xác nhận
            </button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <Link to="/login" className="text-sm text-indigo-600 hover:underline">
            Quay lại đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
