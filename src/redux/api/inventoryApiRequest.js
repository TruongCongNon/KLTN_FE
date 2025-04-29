import API from "../../core/axiosInterceptor";
import { sellProductFailed, sellProductStart, sellProductSuccess } from "../slices/inventorySlice";

export const sellProduct = async (productId, quantity, dispatch ) => {
dispatch(sellProductStart());
  try {
    const res = await API.put(`/inventory/${productId}/sell`, {
      quantity,
    });
    dispatch(sellProductSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(sellProductFailed());
    console.error("Lỗi khi trừ tồn kho:", error);
    throw error;
  }
};