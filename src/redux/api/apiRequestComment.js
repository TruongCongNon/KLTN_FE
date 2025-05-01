
import API from "../../core/axiosInterceptor";
import {
  fetchCommentsTreeStart,
  fetchCommentsTreeSuccess,
  fetchCommentsTreeFailed,
  fetchCommentsByUserStart,
  fetchCommentsByUserSuccess,
  fetchCommentsByUserFailed,
  addCommentStart,
  addCommentSuccess,
  addCommentFailed,
  updateCommentStart,
  updateCommentSuccess,
  updateCommentFailed,
  deleteCommentStart,
  deleteCommentSuccess,
  deleteCommentFailed,
} from "../slices/commentSlice";

// GET TREE
export const getCommentsTree = (productId) => async (dispatch) => {
  dispatch(fetchCommentsTreeStart());
  try {
    const res = await API.get(`/comments/product/${productId}`);
    dispatch(fetchCommentsTreeSuccess(res.data));
  } catch (err) {
    dispatch(fetchCommentsTreeFailed());
  }
};

// GET BY USER
export const getCommentsByUser = (userId) => async (dispatch) => {
  dispatch(fetchCommentsByUserStart());
  try {
    const res = await API.get(`/comments/user/${userId}`);
    dispatch(fetchCommentsByUserSuccess(res.data));
  } catch (err) {
    dispatch(fetchCommentsByUserFailed());
  }
};

// ADD
export const addComment = (data) => async (dispatch) => {
  dispatch(addCommentStart());
  try {
    await API.post("/comments", data);
    dispatch(addCommentSuccess());
  } catch (err) {
    dispatch(addCommentFailed());
  }
};

// UPDATE
export const updateComment = (commentId, data) => async (dispatch) => {
  dispatch(updateCommentStart());
  try {
    await API.put(`/comments/${commentId}`, data);
    dispatch(updateCommentSuccess());
  } catch (err) {
    dispatch(updateCommentFailed());
  }
};

// DELETE
export const deleteComment = (commentId) => async (dispatch) => {
  dispatch(deleteCommentStart());
  try {
    await API.delete(`/comments/${commentId}`);
    dispatch(deleteCommentSuccess());
  } catch (err) {
    dispatch(deleteCommentFailed());
  }
};
