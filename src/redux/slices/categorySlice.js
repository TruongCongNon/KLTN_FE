import { createSlice } from "@reduxjs/toolkit";
import { get } from "lodash";

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    getAllCategory: {
      data: [],
      isFetching: false,
      error: false,
    },

  },
  reducers: {
    //all
    getAllCategoryStart: (state) => {
      state.getAllCategory.isFetching = true;
      state.getAllCategory.error = false;
    },
    getAllCategorySuccess: (state, action) => {
      state.getAllCategory.isFetching = false;
      state.getAllCategory.data = action.payload;
      state.getAllCategory.error = false;
    },
    getAllCategoryFailed: (state) => {
      state.getAllCategory.isFetching = false;
      state.getAllCategory.error = true;
    },
    
  },
});

export const {
  getAllCategoryStart,
  getAllCategorySuccess,
  getAllCategoryFailed,
  
} = categorySlice.actions;
export default categorySlice.reducer;
