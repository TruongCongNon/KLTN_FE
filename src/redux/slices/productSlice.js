import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    getAllProduct: {
      productsByCategory: {},
      isFetching: false,
      error: false,
    },
    getProductById: {
      data: null,
      isFetching: false,
      error: false,
      success: false,
    },
  },
  reducers: {
    getAllProductStart: (state) => {
      state.getAllProduct.isFetching = true;
    },
    getAllProductSuccess: (state, action) => {
      const { category, products } = action.payload;
      state.getAllProduct.isFetching = false;
      state.getAllProduct.productsByCategory = {
        ...state.getAllProduct.productsByCategory,
        [category]: products,
      };
    },
    getAllProductFailed: (state) => {
      state.getAllProduct.isFetching = false;
      state.getAllProducts.error = "Lỗi khi tải sản phẩm";
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
  },
});

export const {
  getAllProductStart,
  getAllProductSuccess,
  getAllProductFailed,
  getProductByIdStart,
  getProductByIdSuccess,
  getProductByIdFailed,
} = productSlice.actions;
export default productSlice.reducer;
