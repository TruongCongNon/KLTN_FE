
import API from "../../core/axiosInterceptor";
import {
  getAllCategoryFailed,
  getAllCategoryStart,
  getAllCategorySuccess,
} from "../slices/categorySlice";

export const getAllCategory = async (dispatch) => {
  dispatch(getAllCategoryStart());
  try {
    const res = await API.get("/category/");
    dispatch(getAllCategorySuccess(res.data));
  } catch (error) {
    console.error("Lỗi khi gọi API :", error.response?.data || error.message);
    dispatch(getAllCategoryFailed());
  }
};
