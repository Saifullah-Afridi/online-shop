import { configureStore } from "@reduxjs/toolkit";

import productSlice from "./productSlice";
import CartSlice from "./CartSlice";

const store = configureStore({
  reducer: {
    cart: CartSlice,
    product: productSlice,
  },
});

export default store;
