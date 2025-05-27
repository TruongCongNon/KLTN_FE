import { createSlice } from "@reduxjs/toolkit";

const addressSlice = createSlice({
  name: "address",
  initialState: {
    provinces: [],
    districts: [],
    wards: [],
    loading: false,
    error: false,
  },
  reducers: {
    getProvincesStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    getProvincesSuccess: (state, action) => {
      state.loading = false;
      state.provinces = action.payload;
    },
    getProvincesFailed: (state) => {
      state.loading = false;s
      state.error = true;
    },

    getDistrictsStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    getDistrictsSuccess: (state, action) => {
      state.loading = false;
      state.districts = action.payload;
    },
    getDistrictsFailed: (state) => {
      state.loading = false;
      state.error = true;
    },

    getWardsStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    getWardsSuccess: (state, action) => {
      state.loading = false;
      state.wards = action.payload;
    },
    getWardsFailed: (state) => {
      state.loading = false;
      state.error = true;
    },

    clearDistricts: (state) => {
      state.districts = [];
      state.wards = [];
    },
    clearWards: (state) => {
      state.wards = [];
    },
  },
});

export const {
  getProvincesStart,
  getProvincesSuccess,
  getProvincesFailed,
  getDistrictsStart,
  getDistrictsSuccess,
  getDistrictsFailed,
  getWardsStart,
  getWardsSuccess,
  getWardsFailed,
  clearDistricts,
  clearWards,
} = addressSlice.actions;

export default addressSlice.reducer;
