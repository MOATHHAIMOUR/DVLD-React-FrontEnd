import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthResponse } from "../interfaces";

interface AuthSliceState {
  token: string | null;
  refreshToken: string | null;
  authInitialized: boolean;
}

const initialState: AuthSliceState = {
  token: null,
  refreshToken: null,
  authInitialized: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Set credentials with token and refresh token
    setCredentials: (state, action: PayloadAction<IAuthResponse>) => {
      state.token = action.payload.jwtToken;
      state.refreshToken = action.payload.refreshToken;
    },
    // Clear auth information on logout
    logout: (state) => {
      state.token = null;
      state.refreshToken = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
