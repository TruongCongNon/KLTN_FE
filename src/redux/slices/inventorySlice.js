import { createSlice } from "@reduxjs/toolkit";


export const inventorySlice = createSlice({
  name: "inventory",
  initialState: {
    sellProduct: {
        data: null,
        isFetching: false,
        error: false,
    }

  },
  reducers: {
    sellProductStart: (state) => {
      state.sellProduct.isFetching = true;
      state.sellProduct.error = false;
    },  
    sellProductSuccess: (state, action) => {
      state.sellProduct.isFetching = false;
      state.sellProduct.data = action.payload;
      state.sellProduct.error = false;
    },
    sellProductFailed: (state) => {
      state.sellProduct.isFetching = false;
      state.sellProduct.error = true;
    },
    
  },
});

export const {
  sellProductStart,
  sellProductSuccess,
  sellProductFailed,
  
} = inventorySlice.actions;
export default inventorySlice.reducer;
