// src/app/baseQuery.js
import {
  BaseQueryApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  QueryReturnValue,
  RootState,
} from "@reduxjs/toolkit/query/react";
import { logout, setCredentials } from "./features/Auth/store/AuthSlice";
import { IGenericApiResponse } from "./interfaces/IApiResponse";
import { IAuthResponse } from "./features/Auth/interfaces";

export const baseQueryWithReauth = (baseUrl: string) => {
  const baseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
    credentials: "include", // Include httpOnly cookies
  });

  return async (
    args: string | FetchArgs,
    api: BaseQueryApi,
    extraOptions: object
  ) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 401) {
      const state = api.getState() as RootState;
      const refreshToken = state.auth.refreshToken;
      // Try to refresh the token

      const refreshResult: QueryReturnValue<
        IGenericApiResponse<IAuthResponse>,
        FetchBaseQueryError,
        unknown
      > = await baseQuery(
        {
          url: "http://localhost:5121/Auth/RefreshToken",
          method: "POST",
          body: { token: refreshToken },
        },
        api,
        extraOptions
      );

      if (refreshResult?.data) {
        api.dispatch(setCredentials(refreshResult.data.data));

        // Retry the original query
        result = await baseQuery(args, api, extraOptions);
      } else {
        // Log out if refresh fails
        api.dispatch(logout());
      }
    }

    return result;
  };
};
