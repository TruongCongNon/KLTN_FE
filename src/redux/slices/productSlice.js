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
      data:null,
      isFetching: false,
      error: false,
      success: false,
    },
  },
  reducers: {
    getAllProductStart: (state) => {
      state.isLoading = true;
    },
    getAllProductSuccess: (state, action) => {
      const { category, products } = action.payload;
      state.isLoading = false;
      state.productsByCategory = {
        ...state.productsByCategory,
        [category]: products,
      };
    },
    getAllProductFailed: (state) => {
      state.getProductById.isLoading = false;
      state.getProductById.error = "Lỗi khi tải sản phẩm";
    },
    getProductByIdStart: (state) => {
      state.getProductById.isFetching = true;
      state.getProductById.error = false;
    },
    getProductByIdSuccess: (state,action) => {
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

export const { getAllProductStart, getAllProductSuccess, getAllProductFailed,getProductByIdStart,getProductByIdSuccess,getProductByIdFailed } =
  productSlice.actions;
export default productSlice.reducer;
