import API from "../../core/axiosInterceptor";
import {
  addCartFailed,
  addCartStart,
  addCartSuccess,
  clearCartFailed,
  clearCartStart,
  clearCartSuccess,
  getCartFailed,
  getCartStart,
  getCartSuccess,
  removeFromCartFailed,
  removeFromCartStart,
  removeFromCartSuccess,
  updateCartStart,
  updateCartSuccess,
} from "../slices/cartSlice";
export const getCart = (userId) => async (dispatch) => {
  dispatch(getCartStart());
  try {
    const res = await API.get(`/cart/${userId}`, {});
    dispatch(getCartSuccess(res.data));
   
  } catch (error) {
    dispatch(getCartFailed());
  }
};

export const addToCart = (userId, productId, quantity,priceSale) => async (dispatch) => {
  dispatch(addCartStart());
  try {
    const res = await API.post("/cart/add", { userId, productId, quantity,priceSale, });
    console.log("Response from API:", res);
    dispatch(addCartSuccess(res?.data));
  } catch (error) {
    dispatch(addCartFailed());
  }
};

export const removeCart = (userId, productId) => async (dispatch) => {
  dispatch(removeFromCartStart());
  try {
    const res = await API.post("/cart/remove", { userId, productId });
    console.log("Response from API:", res.data);
    dispatch(removeFromCartSuccess(res.data));
  } catch (error) {
    dispatch(removeFromCartFailed());
    console.error(
      "Lỗi khi xóa sp giỏ hàng:",
      error.response?.data || error.message
    );
  }
};
export const updateCart = (userId, productId, quantity) => async (dispatch) => {
  dispatch(updateCartStart());
  try {
    const res = await API.post("/cart/update", { userId, productId, quantity });
    dispatch(updateCartSuccess(res.data));
    console.log("data",res.data);
  } catch (error) {
    dispatch(updateCartFailed());
    console.log(error);
  }
};
export const clearCart =(userId)=> async ( dispatch) => {
  dispatch(clearCartStart());
  try {
    await API.post("/cart/clear", { userId });
    dispatch(clearCartSuccess());
  } catch (error) {
    dispatch(clearCartFailed());
    console.log(error);
  }
};
