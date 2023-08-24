import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const url = `http://localhost:3001/api/v1/products/`;
    const { data } = await axios.get(url);

    return data.products;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    productss: [],
    isLoading: false,
    errorMessage: "",
  },

  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.productss = action.payload;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload;
    });
  },
});

export default productSlice.reducer;
