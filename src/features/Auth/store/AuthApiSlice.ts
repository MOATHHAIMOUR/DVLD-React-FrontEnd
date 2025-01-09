import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IAuthResponse, ILogin } from "../interfaces";
import { IGenericApiResponse } from "../../../interfaces/IApiResponse";
import { logout, setCredentials } from "./AuthSlice";

export const AuthApiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5121/Api", // Base URL for all API endpoints
    credentials: "include", // Include cookies
  }),
  endpoints: (builder) => ({
    login: builder.mutation<IGenericApiResponse<IAuthResponse>, ILogin>({
      query: (credentials) => ({
        url: "/v1/Auth/Login",
        method: "POST",
        body: credentials,
      }),
    }),
    refreshToken: builder.query<IGenericApiResponse<IAuthResponse>, void>({
      queryFn: async (_, api, extraOptions, baseQuery) => {
        try {
          const result = await baseQuery({
            url: "/v1/Auth/RefreshToken",
            method: "POST",
          });

          if (result?.data) {
            console.log("result.data:", result.data?.data);

            // Dispatch the new credentials to Redux
            api.dispatch(setCredentials(result.data?.data));

            // Return successful data response
            return { data: result.data as IGenericApiResponse<IAuthResponse> };
          } else {
            console.error("Refresh token error:", result.error);

            // If there's an error, log the user out
            api.dispatch(logout());
            return { error: result.error as FetchBaseQueryError };
          }
        } catch (error) {
          console.error("Unexpected error:", error);

          // Return an unexpected error
          return {
            error: {
              status: "FETCH_ERROR",
              data: "Unexpected error",
            } as FetchBaseQueryError,
          };
        }
      },
    }),
  }),
});

export const { useLoginMutation, useLazyRefreshTokenQuery } = AuthApiSlice;
