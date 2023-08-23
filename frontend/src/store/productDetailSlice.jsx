import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProductDetail = createAsyncThunk(
  "productDe/getProductDetail",
  async (id) => {
    // try {
    const { data } = await axios.get(
      `http://localhost:3001/api/v1/products/${id}`
    );
    return data.product;
    //   } catch (err) {
    //     return thunkAPI.rejectWithValue(err.response.data.message);
    //   }
  }
);

const productDetailSlice = createSlice({
  name: "productDetail",
  initialState: {
    productDe: { id: 1 },
    isLoading: false,
    errorMessage: "",
  },
  extraReducers: (builder) => {
    builder.addCase(getProductDetail.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getProductDetail.fulfilled, (state, action) => {
      state.isLoading = false;
      state.productDe = action.payload;
    });
    builder.addCase(getProductDetail.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export default productDetailSlice.reducer;
