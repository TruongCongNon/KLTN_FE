import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    userId: null,
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
  },
  reducers: {
    setCart: (state, action) => {
      state.userId = action.payload.userId;
      state.items = action.payload.items;
      state.totalQuantity = action.payload.totalQuantity;
      state.totalPrice = action.payload.totalPrice;
    },
  },
});

export const { setCart } = cartSlice.actions;
export default cartSlice.reducer;
