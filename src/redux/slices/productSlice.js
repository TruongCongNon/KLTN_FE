import { createSlice } from "@reduxjs/toolkit";
import { get } from "lodash";

const productSlice = createSlice({
  name: "product",
  initialState: {
    getAllProduct: {
      allProducts: [],
      isFetching: false,
      error: false,
    },
    getProductById: {
      data: null,
      isFetching: false,
      error: false,
      success: false,
    },
    getProductRelated: {
      productByTag: [],
      isFetching: false,
      error: false,
    },
    getProductByCategoryName: {
      data: [],
      isFetching: false,
      error: false,
    },
    getAllProductBySeries: {
      data: null,
      isFetching: false,
      error: false,
    },
    filteredProducts: [],
  },
  reducers: {
    getAllProductStart: (state) => {
      state.getAllProduct.isFetching = true;
    },
    getAllProductSuccess: (state, action) => {
      state.getAllProduct.isFetching = false;
      state.getAllProduct.allProducts = action.payload;
      state.getAllProduct.error = false;
    },
    getAllProductFailed: (state) => {
      state.getAllProduct.isFetching = false;
      state.getAllProduct.error = "Lỗi khi tải sản phẩm";
    },

    //
    getProductByIdStart: (state) => {
      state.getProductById.isFetching = true;
      state.getProductById.error = false;
    },
    getProductByIdSuccess: (state, action) => {
      state.getProductById.isFetching = false;
      state.getProductById.success = true;
      state.getProductById.error = false;
      state.getProductById.data = action.payload;
    },
    getProductByIdFailed: (state) => {
      state.getProductById.isFetching = false;
      state.getProductById.error = true;
    },
    getProductRelatedStart: (state) => {
      if (!state.getProductRelated) {
        state.getProductRelated = {
          productByTag: [],
          isFetching: false,
          error: false,
        };
      }
      state.getProductRelated.isFetching = true;
      state.getProductRelated.error = false;
    },
    getProductRelatedSuccess: (state, action) => {
      state.getProductRelated.isFetching = false;
      state.getProductRelated.error = false;
      state.getProductRelated.productByTag = action.payload || [];
    },
    getProductRelatedFailed: (state) => {
      state.getProductRelated.isFetching = false;
      state.getProductRelated.error = true + "Lỗi khi tải sản phẩm liên quan";
    },
    // by  category name
    getProductByCategoryNameStart: (state) => {
      state.getProductByCategoryName.isFetching = true;
      state.getProductByCategoryName.error = false;
    },
    getProductByCategoryNameSuccess: (state, action) => {
      state.getProductByCategoryName.isFetching = false;
      state.getProductByCategoryName.error = false;
      state.getProductByCategoryName.data = action.payload || [];
    },
    getProductByCategoryNameFailed: (state) => {
      state.getProductByCategoryName.isFetching = false;
      state.getProductByCategoryName.error =
        true + "Lỗi khi tải sản phẩm theo danh mục";
    },
    // get by series
    getAllProductBySeriesStart: (state) => {
      state.getAllProductBySeries.isFetching = true;
      state.getAllProductBySeries.error = false;
    },
    getAllProductBySeriesSuccess: (state, action) => {
      state.getAllProductBySeries.isFetching = false;
      state.getAllProductBySeries.error = false;
      state.getAllProductBySeries.data = action.payload || [];
    },
    getAllProductBySeriesFailed: (state) => {
      state.getAllProductBySeries.isFetching = false;
      state.getAllProductBySeries.error =
        true + "Lỗi khi tải sản phẩm theo series";
    },
  },
});

export const {
  getAllProductStart,
  getAllProductSuccess,
  getAllProductFailed,
  getProductByIdStart,
  getProductByIdSuccess,
  getProductByIdFailed,
  getProductRelatedStart,
  getProductRelatedSuccess,
  getProductRelatedFailed,
  getProductByCategoryStart,
  getProductByCategorySuccess,
  getProductByCategoryFailed,
  getProductByCategoryNameStart,
  getProductByCategoryNameSuccess,
  getProductByCategoryNameFailed,
  getAllProductBySeriesStart,
  getAllProductBySeriesSuccess,
  getAllProductBySeriesFailed,
} = productSlice.actions;
export default productSlice.reducer;
