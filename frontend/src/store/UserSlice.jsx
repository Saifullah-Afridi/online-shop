import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await axios.post(
        "http://localhost:3001/api/v1/users/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }
      console.log(res);
      return res.data.user;
    } catch (error) {
      console.log(error);
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createSlice("logout/logoutUser", async () => {
  await axios.get("http://localhost:3001/api/v1/users/logout");
  localStorage.removeItem("user");
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    isAuthenticated: false,
    isLoading: false,
    isError: false,
    errorMessage: " ",
  },
  reducers: {
    reset: (state, action) => {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.isError = false;
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state, action) => {
      state.isLoading = true;
      state.isAuthenticated = false;
      state.isError = false;
      state.user = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.user = null;
      state.isError = true;
      state.errorMessage = action.payload;
    });
  },
});
export const { reset } = userSlice.actions;
export default userSlice.reducer;
