import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    isFetching: false,
    error: false,
    checkedItems: {},
  },
  reducers: {
    getCartStart: (state) => {
      state.isFetching = true;
    },
    getCartSuccess: (state, action) => {
      state.isFetching = false;
      state.items = action.payload;
      state.error = false;
    },
    getCartFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    addCartStart: (state) => {
      state.isFetching = true;
    },
    addCartSuccess: (state, action) => {
      state.isFetching = false;
      state.items = action.payload||[];
      state.error = false;
    },
    addCartFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    removeFromCartStart: (state) => {
      state.isFetching = true;
    },
    removeFromCartSuccess: (state, action) => {
      state.isFetching = false;
      state.items = action.payload;
      state.error = false;
    },
    removeFromCartFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    clearCartStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    clearCartSuccess: (state) => {
      state.isFetching = false;
      state.items = [];
    },
    clearCartFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    updateCartStart: (state) => {
      state.isFetching = true;
    },
    updateCartSuccess: (state, action) => {
      state.isFetching = false;
      state.items = action.payload;
    },
    updateCartFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    setCheckedItems: (state, action) => {
      state.checkedItems = action.payload;
    },
  },
});

export const {
  getCartStart,
  getCartSuccess,
  getCartFailed,
  addCartStart,
  addCartSuccess,
  addCartFailed,
  removeFromCartStart,
  removeFromCartSuccess,
  removeFromCartFailed,
  clearCartStart,
  clearCartSuccess,
  clearCartFailed,
  updateCartStart,
  updateCartSuccess,
  updateCartFailed,
  setCheckedItems
} = cartSlice.actions;
export default cartSlice.reducer;