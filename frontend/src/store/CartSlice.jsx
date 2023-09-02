import { createSlice, current } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
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
    },
  },
});
export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
