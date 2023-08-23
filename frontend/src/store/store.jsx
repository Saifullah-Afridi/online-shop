import { configureStore } from "@reduxjs/toolkit";

import productSlice from "./productSlice";
import CartSlice from "./CartSlice";

import productDetailSlice from "./productDetailSlice";

const store = configureStore({
  reducer: {
    cart: CartSlice,
    product: productSlice,
    productDetail: productDetailSlice,
  },
});

export default store;
