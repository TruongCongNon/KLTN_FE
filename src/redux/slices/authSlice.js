  import { createSlice } from "@reduxjs/toolkit";
  export const authSlice = createSlice({
    name: "auth",
    initialState: {
      login: {
        currentUser: null,
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
    },
    reducers: {
      //login
      loginStart: (state) => {
        state.login.isFetching = true;
      },
      loginSuccess: (state, action) => {
        state.login.isFetching = false;
        state.login.currentUser = action.payload;
        state.login.error = false;
      },
      loginFailed: (state) => {
        state.login.isFetching = false;
        state.login.error = true;
      },

      //register
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
      //logout
      logOutStart: (state) => {
        if (!state.logout) {
          state.logout = { isFetching: false, error: false }; 
        }
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
  } = authSlice.actions;
  export default authSlice.reducer;
