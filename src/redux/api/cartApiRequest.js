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

export const removeCart = async (userId, productId,  dispatch, accessToken) => {
  console.log("id tỏng api"+productId);
  console.log("id user tỏng api"+userId);
  console.log("access tỏng api"+accessToken);
  try {
    
    const res = await axios.post(
      "http://localhost:5000/v1/cart/remove",
      {  userId, productId}, //  Đảm bảo gửi đúng dữ liệu
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
