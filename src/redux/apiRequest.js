import {
  loginFailed,
  loginStart,
  loginSuccess,
  logOutFailed,
  logOutStart,
  logOutSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
} from "./slices/authSlice";
import axios from "axios";
import { persistor } from "./store";
import {
  getAllProductFailed,
  getAllProductStart,
  getAllProductSuccess,
  getProductByIdStart,
  getProductByIdSuccess,
  getProductByIdFailed
} from "./slices/productSlice";
export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("http://localhost:5000/v1/auth/login", user);
    dispatch(loginSuccess(res.data));
    navigate("/");
  } catch {
    dispatch(loginFailed());
  }
};
export const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    const res = await axios.post(
      "http://localhost:5000/v1/auth/register",
      user
    );
    dispatch(registerSuccess(res.data));
    navigate("/login");
  } catch {
    dispatch(registerFailed());
  }
};
export const logOut = async (dispatch, navigate, accessToken) => {
  dispatch(logOutStart());
  try {
    const res = await axios.post(
      "http://localhost:5000/v1/auth/logout",
      {},
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    dispatch(logOutSuccess(res.data));
    await persistor.purge();
    navigate("/login");
  } catch (error) {
    console.error("Lỗi logout:", error.response?.data || error.message);
    dispatch(logOutFailed());
  }
};

export const getAllProduct = async (dispatch, category = "") => {
  console.log("Category in API call:", category);
  dispatch(getAllProductStart());
  try {
    const res = await axios.get(
      `http://localhost:5000/v1/product?category=${category}`
    );
    dispatch(getAllProductSuccess({ category, products: res.data }));
  } catch {
    dispatch(getAllProductFailed());
  }
};
export const getProductById = async (dispatch,accessToken,id) => {
  dispatch(getProductByIdStart());
  try {
    const res = await axios.get(
      `http://localhost:5000/v1/product/${id}`,
      {},
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    dispatch(getProductByIdSuccess(res.data));
    // await persistor.purge();
  } catch {
    dispatch(getProductByIdFailed());
  }
};
