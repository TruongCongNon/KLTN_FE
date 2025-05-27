import API from "../../core/axiosInterceptor";
import {
  buyProductFlashSaleFailed,
  buyProductFlashSaleStart,
  buyProductFlashSaleSuccess,
  getAllFlashSaleFailed,
  getAllFlashSaleStart,
  getAllFlashSaleSuccess,
  getFlashSaleByProductIdFailed,
  getFlashSaleByProductIdStart,
  getFlashSaleByProductIdSuccess,
} from "../slices/flashSale";

export const getAllFlashSale = async (dispatch) => {
  dispatch(getAllFlashSaleStart());
  try {
    const res = await API.get("/flashSale/success");
    dispatch(getAllFlashSaleSuccess(res.data));
  } catch (error) {
    console.error(
      "Lỗi khi gọi API lay tat ca slae:",
      error.response?.data || error.message
    );
    dispatch(getAllFlashSaleFailed());
  }
};
export const getFlashSaleByProductId = async (dispatch, productId) => {
  dispatch(getFlashSaleByProductIdStart());
  try {
    const res = await API.get(`/flashSale/product/${productId}`);
    dispatch(getFlashSaleByProductIdSuccess(res.data));
  } catch (error) {
    dispatch(getFlashSaleByProductIdFailed());
    console.error("Không tìm thấy flash sale:", error);
  }
};
export const buyProductFlashSale = async (dispatch, dataBuyFlashSale) => {
  dispatch(buyProductFlashSaleStart());
  try {
    const res = await API.post("/flashSale/buy", dataBuyFlashSale);
    dispatch(buyProductFlashSaleSuccess(res.data));
  } catch (error) {
    console.error(
      "Lỗi khi gọi tru sale:",
      error.response?.data || error.message
    );
    dispatch(buyProductFlashSaleFailed());
  }
};

// export const getDiscountFlashSale = async (dispatch, productId) => {
//   dispatch(getDiscountFlashSaleStart());
//   try {
//     const res = await API.get(`/flashSale/discount/${productId}`);
//     dispatch(getDiscountFlashSaleSuccess(res.data));
//   } catch (error) {
//     console.error(
//       "Lỗi khi gọi product sale:",
//       error.response?.data || error.message
//     );
//     dispatch(getDiscountFlashSaleFailed());
//   }
// };
