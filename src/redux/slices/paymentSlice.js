import { createSlice } from "@reduxjs/toolkit";
import { getFlashSaleByProductId } from "../api/apiRequestFlashSale";

export const flashSaleSlice = createSlice({
  name: "payment",
  initialState: {
    createPaymentUrl: {
      data: [],
      isFetching: false,
      error: false,
    },
  },
  reducers: {

    createPaymentUrlStart: (state) => {
      state.createPaymentUrl.isFetching = true;
      state.createPaymentUrl.error = false;
    },
    createPaymentUrlSuccess: (state, action) => {
      state.createPaymentUrl.isFetching = false;
      state.createPaymentUrl.data = action.payload;
      state.createPaymentUrl.error = false;
    },
    createPaymentUrlFailed: (state) => {
      state.createPaymentUrl.isFetching = false;
      state.createPaymentUrl.error = true;
    },
  },
});

export const {
  createPaymentUrlStart,
  createPaymentUrlSuccess,
  createPaymentUrlFailed,
} = flashSaleSlice.actions;
export default flashSaleSlice.reducer;
