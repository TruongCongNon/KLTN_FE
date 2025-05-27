import { createSlice } from "@reduxjs/toolkit";
import { getFlashSaleByProductId } from "../api/apiRequestFlashSale";

export const flashSaleSlice = createSlice({
  name: "flashSale",
  initialState: {
    getAllFlashSale: {
      data: [],
      isFetching: false,
      error: false,
    },
    getFlashSaleByProductId:{
      data: [],
      isFetching: false,
      error: false,
    },
    buyProductFlashSale:{
      data: null,
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    //all
    getAllFlashSaleStart: (state) => {
      state.getAllFlashSale.isFetching = true;
      state.getAllFlashSale.error = false;
    },
    getAllFlashSaleSuccess: (state, action) => {
      state.getAllFlashSale.isFetching = false;
      state.getAllFlashSale.data = action.payload;
      state.getAllFlashSale.error = false;
    },
    getAllFlashSaleFailed: (state) => {
      state.getAllFlashSale.isFetching = false;
      state.getAllFlashSale.error = true;
    },
    getFlashSaleByProductIdStart: (state) => {
      state.getFlashSaleByProductId.isFetching = true;
      state.getFlashSaleByProductId.error = false;
    },
    getFlashSaleByProductIdSuccess: (state, action) => {
      state.getFlashSaleByProductId.isFetching = false;
      state.getFlashSaleByProductId.data = action.payload;
      state.getFlashSaleByProductId.error = false;
    },
    getFlashSaleByProductIdFailed: (state) => {
      state.getFlashSaleByProductId.isFetching = false;
      state.getFlashSaleByProductId.error = true;
    },
    buyProductFlashSaleStart: (state) => {
      state.buyProductFlashSale.isFetching = true;
      state.buyProductFlashSale.error = false;
    },
    buyProductFlashSaleSuccess: (state, action) => {
      state.buyProductFlashSale.isFetching = false;
      state.buyProductFlashSale.data = action.payload;
      state.buyProductFlashSale.error = false;
    },
    buyProductFlashSaleFailed: (state) => {
      state.buyProductFlashSale.isFetching = false;
      state.buyProductFlashSale.error = true;
    },
  },
});

export const {
  getAllFlashSaleStart,
  getAllFlashSaleSuccess,
  getAllFlashSaleFailed,
  getFlashSaleByProductIdStart,
  getFlashSaleByProductIdSuccess,
  getFlashSaleByProductIdFailed,
  buyProductFlashSaleStart,
  buyProductFlashSaleSuccess,
  buyProductFlashSaleFailed,
  
} = flashSaleSlice.actions;
export default flashSaleSlice.reducer;
