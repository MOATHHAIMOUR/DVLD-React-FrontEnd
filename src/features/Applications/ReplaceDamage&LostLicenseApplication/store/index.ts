import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  ReplaceLicenseDamageResponse,
  ReplaceLicenseLostResponse,
  ReplaceLicenseRequest,
} from "../interface";
import { IGenericApiResponse } from "../../../../interfaces/IApiResponse";

export const replaceLicenseApi = createApi({
  reducerPath: "replaceLicenseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5121/Api/v1/ReplaceLostDamageController",
  }),
  endpoints: (builder) => ({
    replaceLostLicense: builder.mutation<
      ReplaceLicenseLostResponse,
      ReplaceLicenseRequest
    >({
      query: (body) => ({
        url: "/ReplaceLostLicense",
        method: "POST",
        body,
      }),
      transformErrorResponse: (response: {
        status: number;
        data: IGenericApiResponse<Array<string>>;
      }) => {
        return {
          status: response.data.statusCode,
          message: response.data.errors[0],
        };
      },
    }),
    replaceDamageLicense: builder.mutation<
      ReplaceLicenseDamageResponse,
      ReplaceLicenseRequest
    >({
      query: (body) => ({
        url: "/ReplaceDamageLicense",
        method: "POST",
        body,
      }),
      transformErrorResponse: (response: {
        status: number;
        data: IGenericApiResponse<Array<string>>;
      }) => {
        return {
          status: response.data.statusCode,
          message: response.data.errors[0],
        };
      },
    }),
  }),
});

export const {
  useReplaceLostLicenseMutation,
  useReplaceDamageLicenseMutation,
} = replaceLicenseApi;
