import { createSlice } from "@reduxjs/toolkit";
import { data } from "react-router-dom";

const initialState = {
  login: {
    currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
    isFetching: false,
    error: false,
  },
  register: {
    isFetching: false,
    error: false,
    success: false,
  },
  logout: {
    isFetching: false,
    error: false,
  },
  sendOTP: {
    data: null,
    isFetching: false,
    error: false,
  },
  verifyOTP: {
    data: null,
    isFetching: false,
    error: false,
  },
  forgotPassword: {
    data: null,
    isFetching: false,
    error: false,
  },

};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Login
    loginStart: (state) => {
      state.login.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.login.isFetching = false
      state.login.currentUser = action.payload;
      state.login.error = false;
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
    },
    loginFailed: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
    },

    // Register
    registerStart: (state) => {
      state.register.isFetching = true;
    },
    registerSuccess: (state) => {
      state.register.isFetching = false;
      state.register.success = true;
      state.register.error = false;
    },
    registerFailed: (state) => {
      state.register.isFetching = false;
      state.register.error = true;
      state.register.success = false;
    },

    // Logout
    logOutStart: (state) => {
      state.logout.isFetching = true;
    },
    logOutSuccess: (state) => {
      state.logout.isFetching = false;
      state.login.currentUser = null;
      state.logout.error = false;
    },
    logOutFailed: (state) => {
      state.logout.isFetching = false;
      state.logout.error = true;
      localStorage.removeItem("currentUser");
    },
    sendOTPStart: (state) => {
      state.sendOTP.isFetching = true;
    },
    sendOTPSuccess: (state, action) => {
      state.sendOTP.isFetching = false;
      state.sendOTP.data = action.payload;
      state.sendOTP.error = false;
    },
    sendOTPFailed: (state) => {
      state.sendOTP.isFetching = false;
      state.sendOTP.error = true;
    },
    verifyOTPStart: (state) => {
      state.verifyOTP.isFetching = true;
    },
    verifyOTPSuccess: (state, action) => {
      state.verifyOTP.isFetching = false;
      state.verifyOTP.data = action.payload;
      state.verifyOTP.error = false;
    },
    verifyOTPFailed: (state) => {
      state.verifyOTP.isFetching = false;
      state.verifyOTP.error = true;
    },
    // Forgot password
    forgotPasswordStart: (state) => {
      state.forgotPassword.isFetching = true;
    },
    forgotPasswordSuccess: (state, action) => {
      state.forgotPassword.isFetching = false;
      state.forgotPassword.data = action.payload;
      state.forgotPassword.error = false;
    },
    forgotPasswordFailed: (state) => {
      state.forgotPassword.isFetching = false;
      state.forgotPassword.error = true;
    },
    
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailed,
  registerStart,
  registerSuccess,
  registerFailed,
  logOutStart,
  logOutSuccess,
  logOutFailed,
  sendOTPStart,
  sendOTPSuccess,
  sendOTPFailed,
  verifyOTPStart,
  verifyOTPSuccess,
  verifyOTPFailed,
  forgotPasswordStart,
  forgotPasswordSuccess,
  forgotPasswordFailed,
} = authSlice.actions;
export default authSlice.reducer;
