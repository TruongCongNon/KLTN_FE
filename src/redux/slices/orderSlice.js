import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    addOrder: {
      data: null,
      isFetching: false,
      error: false,
    },
    getOrderByUSerId: {
      data: [],
      isFetching: false,
      error: false,
    },
    getOrderById: {
      data: null,
      isFetching: false,
      error: false,
    },
    cancelOrder:{
      data: null,
      isFetching: false,
      error: false,
    },
    updateAddress:{
      data: null,
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    addOrderStart: (state) => {
      state.addOrder.isFetching = true;
    },
    addOrderSuccess: (state, action) => {
      state.addOrder.data = action.payload;
      state.addOrder.isFetching = false;
      state.addOrder.error = false;
    },
    addOrderFailed: (state) => {
      state.addOrder.isFetching = false;
      state.addOrder.error = true;
    },
    getOrderByUSerIdStart: (state) => {
      state.getOrderByUSerId.isFetching = true;
    },
    getOrderByUSerIdSuccess: (state, action) => {
      state.getOrderByUSerId.data = action.payload;
      state.getOrderByUSerId.isFetching = false;
      state.getOrderByUSerId.error = false;
    },
    getOrderByUSerIdFailed: (state) => {
      state.getOrderByUSerId.isFetching = false;
      state.getOrderByUSerId.error = true;
    },
    getOrderByIdStart: (state) => {
      state.getOrderById.isFetching = true;
      state.getOrderById.error = false;
    },
    getOrderByIdSuccess: (state, action) => {
      state.getOrderById.data = action.payload;
      state.getOrderById.isFetching = false;
      state.getOrderById.error = false;
    },
    getOrderByIdFailed: (state) => {
      (state.getOrderById.isFetching = false),
        (state.getOrderById.error = true);
    },
    cancelOrderStart: (state) => {
      state.cancelOrder.isFetching = true;
    },
    cancelOrderSuccess: (state, action) => {
      state.cancelOrder.data = action.payload;
      state.cancelOrder.isFetching = false;
      state.cancelOrder.error = false;
    },
    cancelOrderFailed: (state) => {
      state.cancelOrder.isFetching = false;
      state.cancelOrder.error = true;
    },
    updateAddressStart: (state) => {
      state.updateAddress.isFetching = true;
    },
    updateAddressSuccess: (state, action) => {
      state.updateAddress.data = action.payload;
      state.updateAddress.isFetching = false;
      state.updateAddress.error = false;
    },
    updateAddressFailed: (state) => {
      state.updateAddress.isFetching = false;
      state.updateAddress.error = true;
    },
    
  },
});
export const {
  addOrderStart,
  addOrderFailed,
  addOrderSuccess,
  getOrderByUSerIdStart,
  getOrderByUSerIdSuccess,
  getOrderByUSerIdFailed,
  getOrderByIdStart,
  getOrderByIdSuccess,
  getOrderByIdFailed,
  cancelOrderStart,
  cancelOrderSuccess,
  cancelOrderFailed,
  updateAddressStart,
  updateAddressSuccess,
  updateAddressFailed,
} = orderSlice.actions;
export default orderSlice.reducer;
