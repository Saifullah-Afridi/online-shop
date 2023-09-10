import { createSlice, current } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const prod = state.cartItems.find((i) => i.id === action.payload.id);

      if (prod) {
        const index = state.cartItems.findIndex((el) => el.id === prod.id);
        if (index !== -1) {
          state.cartItems[index] = item; // Update the existing item
        }
      } else {
        state.cartItems.push(item); // Add the new item if it doesn't exist
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeCartItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});
export const { addToCart, removeCartItem } = cartSlice.actions;
export default cartSlice.reducer;
