import API from "../../core/axiosInterceptor";
import {
  forgotPasswordFailed,
  forgotPasswordStart,
  forgotPasswordSuccess,
  loginFailed,
  loginStart,
  loginSuccess,
  logOutFailed,
  logOutStart,
  logOutSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
  sendOTPFailed,
  sendOTPStart,
  sendOTPSuccess,
  verifyOTPFailed,
  verifyOTPStart,
  verifyOTPSuccess,
} from "../slices/authSlice";
import { clearCartSuccess } from "../slices/cartSlice";

import { getCart } from "./cartApiRequest";

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await API.post("/auth/login", user);

    // Lưu thông tin user vào Redux
    dispatch(loginSuccess(res.data));
    localStorage.setItem("accessToken", res.data.accessToken);
    localStorage.setItem("refreshToken", res.data.refreshToken);
    localStorage.setItem("role", res.data.role); // lưu vai trò

    // Lưu avatar nếu có
    if (res.data.images) {
      localStorage.setItem(
        "userAvatar",
        `http://localhost:5000${res.data.images}`
      );
    }

    // Gọi API lấy giỏ hàng nếu là người dùng
    if (res.data.role === "user") {
      dispatch(getCart(res.data._id));
    }

    //  PHÂN QUYỀN: Điều hướng theo vai trò
    const role = res.data.role;
    if (role === "user" || role === "admin") {
      navigate("/"); 
    } else {
      alert("Bạn không có quyền truy cập.");
      navigate("/login");
    }
  } catch (error) {
    dispatch(loginFailed());
    console.error("Lỗi đăng nhập:", error);
  }
};

export const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    const res = await API.post("/auth/register", user);
    dispatch(registerSuccess(res.data));
    navigate("/login");
  } catch {
    dispatch(registerFailed());
  }
};
export const logOut = async (dispatch, navigate, accessToken) => {
  dispatch(logOutStart());
  try {
    const res = await API.post("/auth/logout");
    dispatch(logOutSuccess(res.data));
    navigate("/login");
    dispatch(clearCartSuccess());
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  } catch (error) {
    console.error("Lỗi logout:", error.response?.data || error.message);
    dispatch(logOutFailed());
  }
};
export const sendOTP = async (email, dispatch, navigate) => {
  dispatch(sendOTPStart());
  try {
    const res = await API.post("/auth/forgot-password", { email });
    localStorage.setItem("email", email);
    dispatch(sendOTPSuccess(res.data));
    alert("Đã gửi OTP: " + res.data.otp);

    navigate("/otp-verify");
  } catch (error) {
    console.error("Lỗi sendOTP:", error.response?.data || error.message);
    dispatch(sendOTPFailed());
  }
};
export const verigyOTP = async (email, otp, dispatch, navigate) => {
  dispatch(verifyOTPStart());
  try {
    localStorage.getItem("email");
    const res = await API.post("/auth/verify-otp", { email, otp });

    dispatch(verifyOTPSuccess(res.data));

    navigate("/forgot-password");
  } catch (error) {
    console.error("Lỗi verigyOTP :", error.response?.data || error.message);
    dispatch(verifyOTPFailed());
  }
};
export const resetPassword = async (email, dataPass, dispatch, navigate) => {
  dispatch(forgotPasswordStart());
  try {
    const res = await API.post("/auth/reset-password", {
      email,
      ...dataPass,
    });
    dispatch(forgotPasswordSuccess(res.data));
    navigate("/login");
  } catch (error) {
    dispatch(forgotPasswordFailed());
  }
};
