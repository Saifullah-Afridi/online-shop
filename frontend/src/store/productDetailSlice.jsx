import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProductDetail = createAsyncThunk(
  "productDetail/getProducts",
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/api/v1/products/${id}`
      );

      return data.products;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

const productDetailSlice = createSlice({
  name: "productDetail",
  initialState: {
    productDetail: {},
    isLoading: false,
    errorMessage: "",
  },

  extraReducers: (builder) => {
    builder.addCase(getProductDetail.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getProductDetail.fulfilled, (state, action) => {
      state.isLoading = false;
      state.productDetail = action.payload;
    });
    builder.addCase(getProductDetail.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload;
    });
  },
});

export default productDetailSlice.reducer;
