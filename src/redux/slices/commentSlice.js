import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    comments: {
      tree: [],
      userComments: [],
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    // GET TREE
    fetchCommentsTreeStart: (state) => {
      state.comments.isFetching = true;
    },
    fetchCommentsTreeSuccess: (state, action) => {
      state.comments.isFetching = false;
      state.comments.tree = action.payload;
      state.comments.error = false;
    },
    fetchCommentsTreeFailed: (state) => {
      state.comments.isFetching = false;
      state.comments.error = true;
    },

    // GET BY USER
    fetchCommentsByUserStart: (state) => {
      state.comments.isFetching = true;
    },
    fetchCommentsByUserSuccess: (state, action) => {
      state.comments.isFetching = false;
      state.comments.userComments = action.payload;
      state.comments.error = false;
    },
    fetchCommentsByUserFailed: (state) => {
      state.comments.isFetching = false;
      state.comments.error = true;
    },

    // ADD COMMENT
    addCommentStart: (state) => {
      state.comments.isFetching = true;
    },
    addCommentSuccess: (state) => {
      state.comments.isFetching = false;
      state.comments.error = false;
    },
    addCommentFailed: (state) => {
      state.comments.isFetching = false;
      state.comments.error = true;
    },

    // UPDATE COMMENT
    updateCommentStart: (state) => {
      state.comments.isFetching = true;
    },
    updateCommentSuccess: (state) => {
      state.comments.isFetching = false;
      state.comments.error = false;
    },
    updateCommentFailed: (state) => {
      state.comments.isFetching = false;
      state.comments.error = true;
    },

    // DELETE COMMENT
    deleteCommentStart: (state) => {
      state.comments.isFetching = true;
    },
    deleteCommentSuccess: (state) => {
      state.comments.isFetching = false;
      state.comments.error = false;
    },
    deleteCommentFailed: (state) => {
      state.comments.isFetching = false;
      state.comments.error = true;
    },
  },
});

export const {
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
} = commentSlice.actions;

export default commentSlice.reducer;
