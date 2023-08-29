import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await axios.post(
        "http://localhost:3001/api/v1/users/login",
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (res.data) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }

      return res.data.user;
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk("logout/logout", async () => {
  await axios.get("http://localhost:3001/api/v1/users/logout", {
    withCredentials: true,
    credentials: "include",
  });

  localStorage.removeItem("user");
});

export const registerUser = createAsyncThunk(
  "register/registerUser",
  async (userData) => {
    try {
      const res = await axios.post(
        "http://localhost:3001/api/v1/users/signup",
        userData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.data) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }

      return res.data.user;
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const loadUser = createAsyncThunk("loaduser/loadUser", async () => {
  try {
    const { data } = await axios.get("http://localhost:3001/api/v1/users/me", {
      withCredentials: true,
      credentials: "include",
    });

    return data.user;
  } catch (error) {
    const message = error.response.data.message;
    return thunkAPI.rejectWithValue(message);
  }
});

export const updateUser = createAsyncThunk(
  "update/updateUser",
  async (updatingData, thunkAPI) => {
    try {
      const { data } = await axios.patch("", updatingData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
        credentials: "include",
      });
      return data.updatedUser;
    } catch (error) {
      const message = error.response.data.message;
      thunkAPI.rejectWithValue(message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    userr: null,
    isAuthenticated: false,
    isLoading: false,
    isError: false,
    errorMessage: " ",
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state, action) => {
      state.isLoading = true;
      state.isAuthenticated = false;
      state.isError = false;
      state.userr = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.userr = action.payload;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.userr = null;
      state.isError = true;
      state.errorMessage = action.payload;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isAuthenticated = false;
      state.userr = null;
    });
    builder.addCase(registerUser.pending, (state, action) => {
      state.isLoading = true;
      state.isAuthenticated = false;
      state.isError = false;
      state.userr = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isError = false;
      state.isLoading = false;
      state.isAuthenticated = true;
      state.userr = action.payload;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.userr = null;
      state.isError = true;
      state.errorMessage = action.payload;
    });

    builder.addCase(loadUser.fulfilled, (state, action) => {
      state.isError = false;
      state.isLoading = false;
      state.isAuthenticated = true;
      state.userr = action.payload;
    });
    builder.addCase(loadUser.rejected, (state, action) => {
      state.isLoading = false;
      state.userr = null;
      state.isError = true;
      state.errorMessage = action.payload;
    });
  },
});

export default userSlice.reducer;
