import axios from "axios";
import { getDistrictsFailed, getDistrictsStart, getDistrictsSuccess, getProvincesFailed, getProvincesStart, getProvincesSuccess, getWardsFailed, getWardsStart, getWardsSuccess } from "../slices/locationSlice";

export const getProvinces = async (dispatch) => {
    dispatch(getProvincesStart());
    try {
      const res = await axios.get("https://provinces.open-api.vn/api/p/");
      dispatch(getProvincesSuccess(res.data));
    } catch (error) {
      console.error("Lỗi khi lấy tỉnh:", error);
      dispatch(getProvincesFailed());
    }
  };
  
  // Lấy danh sách huyện
  export const getDistricts = async (dispatch, provinceCode) => {
    dispatch(getDistrictsStart());
    try {
      const res = await axios.get(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`);
      dispatch(getDistrictsSuccess(res.data.districts));
    } catch (error) {
      console.error("Lỗi khi lấy huyện:", error);
      dispatch(getDistrictsFailed());
    }
  };

  
  // Lấy danh sách xã
  export const getWards = async (dispatch, districtCode) => {
    dispatch(getWardsStart());
    try {
      const res = await axios.get(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`);
      dispatch(getWardsSuccess(res.data.wards));
    } catch (error) {
      console.error("Lỗi khi lấy xã:", error);
      dispatch(getWardsFailed());
    }}