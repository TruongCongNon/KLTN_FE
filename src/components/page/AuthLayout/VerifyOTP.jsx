import { MuiOtpInput } from "mui-one-time-password-input";
import React, { useEffect, useState } from "react";
import { sendOTP, verigyOTP } from "../../../redux/api/authApiRequest";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useModelContext } from "../../../context/ModelProvider";

const VerifyOTP = () => {
  const { showNotification } = useModelContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [countdown, setCountDown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const email = localStorage.getItem("email");
  const handleChange = (value) => {
    setOtp(value);
  };
  const hanldeSubmit = (e) => {
    e.preventDefault();
    try {
      verigyOTP(email, otp, dispatch, navigate);
      showNotification({
        message: "Xác thực OTP thành công!",
        type: "success",
      });
      navigate("/forgot-password");
    } catch (error) {
      showNotification({
        message: "Xác thực OTP thất bại!",
        type: "failed",
      });
    }
  };
  const handleResendOTP = async () => {
    try {
      sendOTP(email, dispatch, navigate);
      setCountDown(60);
      setCanResend(false);
    } catch (error) {
      showNotification({
        message: "Gửi lại mã OTP thất bại!",
        type: "failed",
      });
    }
  };
  useEffect(() => {
    if (countdown <=0) {
      setCanResend(true);
      return;
    }
    const timer = setInterval(() => {
      setCountDown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
        <h2 className="text-center text-2xl font-bold text-gray-900 mb-6">
          Nhập mã OTP
        </h2>

        <form onSubmit={hanldeSubmit}>
          <MuiOtpInput length={6} value={otp} onChange={handleChange} />
          <div className="mt-5 flex items-center justify-between">
            {!canResend ? (
              <p className="text-gray-600 text-sm">
                Gửi lại mã sau:{" "}
                <span className="text-indigo-600 font-bold">{countdown}s</span>
              </p>
            ) : (
              <button
                type="button"
                onClick={handleResendOTP}
                className="text-indigo-600 text-sm font-semibold hover:underline"
              >
                Gửi lại mã OTP
              </button>
            )}
          </div>
          <button
            type="submit"
            className="mt-6 w-full flex justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Xác minh
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;
