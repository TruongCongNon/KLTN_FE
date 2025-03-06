import axios from "axios";
import { setCart } from "../slices/cartSlice";


export const addToCart = async (userId, product, dispatch, accessToken) => {
  try {
    const res = await axios.post(
      "http://localhost:5000/v1/cart/add",
      { userId, product },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Response from API:", res.data);
    dispatch(setCart(res.data));
  } catch (error) {
    console.error("Lỗi khi thêm vào giỏ hàng:", error.response?.data || error.message);
  }
};

export const removeCart = async ( product, dispatch, accessToken) => {
  try {
    const res = await axios.post(
      "http://localhost:5000/v1/cart/add",
      {  product },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Response from API:", res.data);
    dispatch(setCart(res.data));
  } catch (error) {
    console.error("Lỗi khi xóa sp giỏ hàng:", error.response?.data || error.message);
  }
};


