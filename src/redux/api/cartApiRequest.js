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
    console.error(
      "Lỗi khi thêm vào giỏ hàng:",
      error.response?.data || error.message
    );
  }
};

export const removeCart = async (userId, productId, dispatch, accessToken) => {
  try {
    const res = await axios.post(
      "http://localhost:5000/v1/cart/remove",
      { userId, productId },
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
    console.error(
      "Lỗi khi xóa sp giỏ hàng:",
      error.response?.data || error.message
    );
  }
};
export const clearCart = async (userId, dispatch, accessToken) => {
  if (!userId) {
      console.error("Lỗi: userId bị null hoặc undefined");
      return;
  }

  try {
      console.log("Gửi request xóa giỏ hàng với userId:", userId);
      const res = await axios.post(
          "http://localhost:5000/v1/cart/clear",
          { userId },
          {
              headers: {
                  Authorization: `Bearer ${accessToken}`,
                  "Content-Type": "application/json",
              },
          }
      );

      console.log("Giỏ hàng đã được xóa:", res.data);
      dispatch(setCart(res.data));

  } catch (error) {
      console.error("Lỗi khi xóa giỏ hàng:", error.response?.data || error.message);
  }
};
