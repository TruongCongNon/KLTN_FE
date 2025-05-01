import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import productReducer from "./slices/productSlice";
import  cartReducer  from "./slices/cartSlice";
import orderReducer from "./slices/orderSlice";
import categoryReducer from "./slices/categorySlice"; 
import inventoryReducer  from "./slices/inventorySlice";
import addressReducer from  "./slices/locationSlice"
import flashSaleReducer from "./slices/flashSale"
import paymentReducer from "./slices/paymentSlice"
import commentReducer from "./slices/commentSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    product: productReducer,
    order: orderReducer,
    category: categoryReducer,
    inventory:inventoryReducer,
    address: addressReducer,
    flashSale: flashSaleReducer,
    payment: paymentReducer,
    comment: commentReducer,
  },
});
export default store;
