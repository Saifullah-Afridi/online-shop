import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async ({ page = 1, limit = 8 }) => {
    const { data } = await axios.get("http://localhost:3001/api/v1/products", {
      params: {
        page,
        limit,
      },
    });

    return data;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    productss: [],
    isLoading: false,
    errorMessage: "",
    totelProducts: 0,
    resultPerPage: 0,
  },

  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.productss = action.payload.products;
      state.resultPerPage = action.payload.resultPerPage;
      state.totelProducts = action.payload.totelProducts;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload;
    });
  },
});

export default productSlice.reducer;
