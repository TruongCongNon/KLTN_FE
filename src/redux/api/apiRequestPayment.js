import API from "../../core/axiosInterceptor";
import {
  createPaymentUrlFailed,
  createPaymentUrlStart,
  createPaymentUrlSuccess,
} from "../slices/paymentSlice";

export const createPaymentUrl = async (dispatch, amount, orderId) => {
  dispatch(createPaymentUrlStart());
  try {
    const res = await API.post("/payment/create_payment_url", {
      amount,
      orderId,
    });
    dispatch(createPaymentUrlSuccess(res.data));
    return res.data.paymentUrl;
  } catch (error) {
    dispatch(createPaymentUrlFailed());
    console.log(error);
  }
};
