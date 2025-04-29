import API from "../../core/axiosInterceptor";
import {
  getAllProductFailed,
  getAllProductStart,
  getAllProductSuccess,
  getProductByCategoryNameFailed,
  getProductByCategoryNameStart,
  getProductByCategoryNameSuccess,
  getProductByIdFailed,
  getProductByIdStart,
  getProductByIdSuccess,
  getProductRelatedFailed,
  getProductRelatedStart,
  getProductRelatedSuccess
} from "../slices/productSlice";
export const getAllProduct = async (dispatch) => {
  dispatch(getAllProductStart());
  try {
    const res = await API.get(`/product/all/category`);
    dispatch(getAllProductSuccess(res.data));
    console.log(res.data)
  } catch (error) {
    console.log(error);
    dispatch(getAllProductFailed());
  }
};
export const getProductById = async (dispatch, id) => {
  dispatch(getProductByIdStart());

  const res = await API.get(`/product/${id}`);
  dispatch(getProductByIdSuccess(res.data));

  dispatch(getProductByIdFailed());
};
export const getProductRelated = async (dispatch, id) => {
  dispatch(getProductRelatedStart());

  const res = await API.get(`/product/related/${id}`);
  dispatch(getProductRelatedSuccess(res.data));
  console.log("res+data", res.data);

  dispatch(getProductRelatedFailed());
};
export const getProductByCategoryName = async (dispatch, name) => {
  dispatch(getProductByCategoryNameStart());
  try {
    const res = await API.get(`/product/category/${name}`);
    dispatch(getProductByCategoryNameSuccess(res.data));
  } catch (error) {
    console.log(error);
    dispatch(getProductByCategoryNameFailed());
  }
};

