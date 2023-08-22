import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    amount: 0,
    totel: 0,
    items: [],
  },
});

export default cartSlice.reducer;
