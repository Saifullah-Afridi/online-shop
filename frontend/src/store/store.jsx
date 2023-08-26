import { configureStore } from "@reduxjs/toolkit";

import productSlice from "./productSlice";
import CartSlice from "./CartSlice";

import productDetailSlice from "./productDetailSlice";
import userSlice from "./UserSlice";

const store = configureStore({
  reducer: {
    cart: CartSlice,
    product: productSlice,
    productDetail: productDetailSlice,
    user: userSlice,
  },
});

export default store;
