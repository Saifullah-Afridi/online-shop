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

export const updateProfile = createAsyncThunk(
  "update/updateUser",
  async (updatingData, thunkAPI) => {
    try {
      const { data } = await axios.patch(
        "http://localhost:3001/api/v1/users/updateme",
        updatingData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
          credentials: "include",
        }
      );

      return data.user;
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updatePassword = createAsyncThunk(
  "password/updatePassoword",
  async (passwords, thunkAPI) => {
    try {
      const { data } = await axios.patch(
        "http://localhost:3001/api/v1/users/updatepassword",
        passwords,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
          credentials: "include",
        }
      );
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "forgot/forgotPassword",
  async (email, thunkAPI) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3001/api/v1/users/forgotpassword",
        email,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(data.message);
      return data.message;
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const resetPassword = createAsyncThunk(
  "reset/resetPasssword",
  async ({ token, myForm }, thunkAPI) => {
    try {
      const { data } = await axios.patch(
        `http://localhost:3001/api/v1/users/resetpassword/${token}`,
        myForm,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return data.user;
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
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
    updatedUser: null,
  },
  reducers: {
    resetUpdatedUser: (state) => {
      state.updatedUser = false;
    },
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
    builder.addCase(updateProfile.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.updatedUser = true;
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload;
    });
    builder.addCase(updatePassword.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updatePassword.fulfilled, (state, action) => {
      state.isLoading = false;
      state.updatedUser = true;
    });
    builder.addCase(updatePassword.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload;
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.updatedUser = action.payload;
      console.log(action.payload);
    });
    builder.addCase(forgotPassword.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload;
    });
    builder.addCase(resetPassword.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.updatedUser = action.payload;
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload;
      console.log(action.payload);
    });
  },
});
export const { resetUpdatedUser } = userSlice.actions;
export default userSlice.reducer;
