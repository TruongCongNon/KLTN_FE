import axios from "axios";
import {
    getAllProductFailed,
    getAllProductStart,
    getAllProductSuccess,
    getProductByIdStart,
    getProductByIdSuccess,
    getProductByIdFailed,
    getProductRelatedStart,
    getProductRelatedSuccess,
    getProductRelatedFailed,
  } from "../slices/productSlice";
  export const getAllProduct = async (dispatch, category = "") => {
    console.log("Category in API call:", category);
    dispatch(getAllProductStart());
    try {
      const res = await axios.get(
        `http://localhost:5000/v1/product?category=${category}`
      );
      dispatch(getAllProductSuccess({ category, products: res.data }));
    } catch {
      dispatch(getAllProductFailed());
    }
  };
  export const getProductById = async (dispatch, id, accessToken) => {
    dispatch(getProductByIdStart());
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken.trim()}`, 
        },
      };
      const res = await axios.get(`http://localhost:5000/v1/product/${id}`, config);
      dispatch(getProductByIdSuccess(res.data));
    } catch {
      dispatch(getProductByIdFailed());
    }
  };
  export const getProductRelated = async (dispatch, id, accessToken) => {
    dispatch(getProductRelatedStart());
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken.trim()}`, 
        },
      };
      const res = await axios.get(`http://localhost:5000/v1/product/related/${id}`, config);
      dispatch(getProductRelatedSuccess(res.data));
      console.log("res+data", res.data);
    } catch {
      dispatch(getProductRelatedFailed());
    }
  };
  