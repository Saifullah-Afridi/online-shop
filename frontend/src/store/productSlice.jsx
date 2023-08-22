import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const { data } = await axios.get("http://localhost:3001/api/v1/products/");

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
  reducers: {
    addProducts: (state, action) => {
      state.productss.push([...action.payload]);
    },
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
