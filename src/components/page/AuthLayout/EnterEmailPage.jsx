import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendOTP } from "../../../redux/api/authApiRequest";
import { useModelContext } from "../../../context/ModelProvider";

const EnterEmailPage = () => {
  const { showNotification } = useModelContext();
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChangeValue = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      showNotification({
        message: "Nhập email trước khi gửi !",
        type: "warning",
      });
    }
    try {
      sendOTP(email, dispatch, navigate);
      showNotification({
        message: "Gửi mã OTP thành công !",
        type: "success",
      });
      navigate("/otp-verify");
    } catch (error) {
      showNotification({
        message: " Sai email hoặc không tồn tại !",
        type: "failed",
      });
    }
  };
  return (
    <div>
      <div className="flex-shrink flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Quên mật khẩu
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                name="username"
                autoComplete="username"
                className="hidden"
                tabIndex={-1}
              />
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Nhập email của bạn
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={handleChangeValue}
                  placeholder="Nhập email để gửi OTP"
                  className="block w-full border rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Gửi OTP
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EnterEmailPage;
