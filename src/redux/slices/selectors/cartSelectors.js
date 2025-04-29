import { createSelector } from "@reduxjs/toolkit";

// Lấy state giỏ hàng
const selectCartState = (state) => state.cart;

// Tránh tạo mảng mới mỗi lần selector chạy
export const memoizedCartItemsSelector = createSelector(
  [selectCartState],
  (cart) => cart?.items?.items || []
);
