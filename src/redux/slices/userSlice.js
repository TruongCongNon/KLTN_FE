import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user ",
  initialState: {
    getAllUser: {
      data: null,
      isFetching: false,
      error: false,
    },
    getUserById: {
      data: null,
      isFetching: false,
      error: false,
    },
    cancelUser:{
      data: null,
      isFetching: false,
      error: false,
    },
    updateUserById:{
      data: null,
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    getAllUserStart: (state) => {
      state.getAllUser.isFetching = true;
    },
    getAllUserSuccess: (state, action) => {
      state.getAllUser.data = action.payload;
      state.getAllUser.isFetching = false;
      state.getAllUser.error = false;
    },
    getAllUserFailed: (state) => {
      state.getAllUser.isFetching = false;
      state.getAllUser.error = true;
    },
    getUserByUSerIdStart: (state) => {
      state.getUserByUSerId.isFetching = true;
    },
    getUserByUSerIdSuccess: (state, action) => {
      state.getUserByUSerId.data = action.payload;
      state.getUserByUSerId.isFetching = false;
      state.getUserByUSerId.error = false;
    },
    getUserByUSerIdFailed: (state) => {
      state.getUserByUSerId.isFetching = false;
      state.getUserByUSerId.error = true;
    },
    getUserByIdStart: (state) => {
      state.getUserById.isFetching = true;
      state.getUserById.error = false;
    },
    getUserByIdSuccess: (state, action) => {
      state.getUserById.data = action.payload;
      state.getUserById.isFetching = false;
      state.getUserById.error = false;
    },
    getUserByIdFailed: (state) => {
      (state.getUserById.isFetching = false),
        (state.getUserById.error = true);
    },
    cancelUserStart: (state) => {
      state.cancelUser.isFetching = true;
    },
    cancelUserSuccess: (state, action) => {
      state.cancelUser.data = action.payload;
      state.cancelUser.isFetching = false;
      state.cancelUser.error = false;
    },
    cancelUserFailed: (state) => {
      state.cancelUser.isFetching = false;
      state.cancelUser.error = true;
    },
    updateUserByIdStart: (state) => {
      state.updateUserById.isFetching = true;
    },
    updateUserByIdSuccess: (state, action) => {
      state.updateUserById.data = action.payload;
      state.updateUserById.isFetching = false;
      state.updateUserById.error = false;
    },
    updateUserByIdFailed: (state) => {
      state.updateUserById.isFetching = false;
      state.updateUserById.error = true;
    },
    
  },
});
export const {
  getAllUserStart,
  getAllUserFailed,
  getAllUserSuccess,
  getUserByUSerIdStart,
  getUserByUSerIdSuccess,
  getUserByUSerIdFailed,
  getUserByIdStart,
  getUserByIdSuccess,
  getUserByIdFailed,
  cancelUserStart,
  cancelUserSuccess,
  cancelUserFailed,
  updateUserByIdStart,
  updateUserByIdSuccess,
  updateUserByIdFailed,
} = userSlice.actions;
export default userSlice.reducer;
