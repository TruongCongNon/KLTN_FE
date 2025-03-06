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
      state.userId = action.payload.cart.userId || null;
      state.items = action.payload.cart.items || [];
      state.totalPrice = action.payload.cart.totalPrice || 0;
      state.totalQuantity = action.payload.cart.totalQuantity || 0;
    },

    addItem: (state, action) => {
      console.log("Trước khi thêm:", state.items);
      const product = action.payload;
      const existingItem = state.items.find(
        (item) => item.productId === product.productId
      );
      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice += product.price;
      } else {
        state.items.push({
          ...product,
          quantity: 1,
          totalPrice: product.price,
        });
      }
      state.totalQuantity += 1;
      state.totalPrice += product.price;
      console.log("Sau khi thêm:", state.items);
    },
    removeCart: (state, action) => {
      const productId = action.payload;
      const existingItem = state.items.find(
        (item) => item.productId === productId
      );

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalPrice -= existingItem.totalPrice;
        state.items = state.items.filter(
          (item) => item.productId !== productId
        );
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.totalQuantity = 0;
    },
  },
});

export const { addItem, setCart ,removeCart,clearCart
} = cartSlice.actions;
export default cartSlice.reducer;
