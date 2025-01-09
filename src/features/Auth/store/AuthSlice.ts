import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthResponse } from "../interfaces";

interface AuthSliceState {
  token: string | null;
  refreshToken: string | null;
  userName: string | null;
  isLoading: boolean;
  imagePath: string | null;
}

const initialState: AuthSliceState = {
  token: null,
  userName: null,
  refreshToken: null,
  imagePath: null,
  isLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Set credentials with token and refresh token
    setCredentials: (state, action: PayloadAction<IAuthResponse>) => {
      state.userName = action.payload.userName;
      state.token = action.payload.jwtToken;
      state.refreshToken = action.payload.refreshToken;
      state.imagePath = action.payload.imageUrl;
      state.isLoading = false;
    },

    // Clear auth information on logout
    logout: (state) => {
      state.token = null;
      state.refreshToken = null;
      state.isLoading = false;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
