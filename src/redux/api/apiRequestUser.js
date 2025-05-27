import API from "../../core/axiosInterceptor";
import {
    updateUserByIdFailed,
    updateUserByIdStart,
    updateUserByIdSuccess
} from "../slices/userSlice";

export const updateUser = async (dispatch, id, userData) => {
  dispatch(updateUserByIdStart());
  try {
    const res = await API.put(`user/update/${id}`, userData);
    dispatch(updateUserByIdSuccess(res.data));
    const user_img = res.data;

    if (user_img?.images) {
      localStorage.setItem(
        "userAvatar",
        `http://localhost:5000${user_img.images}`
      );
    }
  } catch (error) {
    console.error(
      "Lỗi khi gọi API update:",
      error.response?.data || error.message
    );
    dispatch(updateUserByIdFailed());
  }
};
// export const getUserById = async (dispatch, id) => {
//   dispatch(getUserByIdStart());
//   try {
//     const res = await API.get(`user/${id}`);
//     dispatch(getUserByIdSuccess(res.data));
//   } catch (error) {
//     console.error(
//       "Lỗi khi gọi API getusebyid:",
//       error.response?.data || error.message
//     );
//     dispatch(getUserByIdFailed());
//   }
// };
