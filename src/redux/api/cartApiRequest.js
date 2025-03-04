import axios from "axios";
import { setCart } from "../slices/cartSlice";

export const getCart = async (userId, dispatch) => {
  try {
    const res = await axios.get(`http://localhost:5000/v1/cart/${userId}`);
    dispatch(setCart(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const addToCart = async (userId, product, dispatch) => {
  try {
    const res = await axios.post("http://localhost:5000/v1/cart/add", {
      userId,
      product,
    });
    dispatch(setCart(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const removeFromCart = async (userId, productId, dispatch) => {
  try {
    const res = await axios.post("http://localhost:5000/v1/cart/remove", {
      userId,
      productId,
    });
    dispatch(setCart(res.data));
  } catch (error) {
    console.error("Lỗi khi xóa sản phẩm khỏi giỏ hàng:", error);
  }
};

export const clearCart = async (userId, dispatch) => {
  try {
    await axios.post("http://localhost:5000/v1/cart/clear", { userId });
    dispatch(setCart({ userId, items: [], totalQuantity: 0, totalPrice: 0 }));
  } catch (error) {
    console.log(error);
  }
};