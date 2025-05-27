import { get } from "lodash";
import API from "../../core/axiosInterceptor";
import {
  addOrderFailed,
  addOrderStart,
  addOrderSuccess,
  cancelOrderFailed,
  cancelOrderStart,
  cancelOrderSuccess,
  getOrderByIdFailed,
  getOrderByIdStart,
  getOrderByIdSuccess,
  getOrderByUSerIdFailed,
  getOrderByUSerIdStart,
  getOrderByUSerIdSuccess,
  updateAddressFailed,
  updateAddressStart,
  updateAddressSuccess,
} from "../slices/orderSlice";

export const addOrder = (orderData) => async (dispatch) => {
  dispatch(addOrderStart());
  try {
    const res = await API.post("/order", orderData);
    dispatch(addOrderSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(addOrderFailed());
    throw error;
  }
};

export const getOrderByUserId = (userId) => async (dispatch) => {
  dispatch(getOrderByUSerIdStart());
  try {
    const res = await API.get(`/order/${userId}`);
    dispatch(getOrderByUSerIdSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(getOrderByUSerIdFailed());
  }
};
export const getOrderById = (id) => async (dispatch) => {
  dispatch(getOrderByIdStart());
  try {
    const res = await API.get(`/order/order/${id}`);
    dispatch(getOrderByIdSuccess(res.data));
    // console.log("Dữ liệu đơn hàng theo id", res.data);
    return res.data;
  } catch (error) {
    dispatch(getOrderByIdFailed());
  }
};
export const cancelOrder =
  (orderId, accessToken, navigate) => async (dispatch) => {
    try {
      dispatch(cancelOrderStart());
      const res = await API.put(`/order/cancel/${orderId}`);
      dispatch(cancelOrderSuccess());
      console.log("Cancel order thành công:", res.data);
      navigate("/order");
    } catch (error) {
      dispatch(cancelOrderFailed());
      console.error("Cancel order thất bại:", error);
      throw error;
    }
  };
export const updateAddress = async (dispatch, orderId, dataAddress) => {
  dispatch(updateAddressStart());
  try {
    const res = await API.put(`/order/update-address/${orderId}`,dataAddress);
    dispatch(updateAddressSuccess(res.data));

    return res.data;
  } catch (error) {
    dispatch(updateAddressFailed());
  }
};
