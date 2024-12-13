import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IGenericApiResponse } from "../../../../interfaces/IApiResponse";
import {
  IAddNewInternationalLicense,
  IInternationalLicense,
  IInternationalLicenseResult,
} from "../interfaces";

export const InternationalLicenseApiSlice = createApi({
  reducerPath: "InternationalLicense",
  tagTypes: ["InternationalLicense"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5121/Api/v1/InternationalLicense",
  }),
  endpoints: (builder) => ({
    addNewInternationalLicense: builder.mutation<
      IGenericApiResponse<IInternationalLicenseResult>,
      IAddNewInternationalLicense
    >({
      query: (internationalLicenseData) => ({
        url: "/AddNewInternationalLicense", // Replace with your API endpoint
        method: "POST",
        body: internationalLicenseData,
      }),
      invalidatesTags: [
        { type: "InternationalLicense", id: "InternationalLicenseList" },
      ],
    }),
    fetchAllInternationalLicenses: builder.query<
      IGenericApiResponse<Array<IInternationalLicense>>,
      void
    >({
      query: () => ({
        url: "/GetAllInternationalLicense", // Replace with your API endpoint
        method: "GET",
      }),
    }),
  }),
});

export const {
  useFetchAllInternationalLicensesQuery,
  useAddNewInternationalLicenseMutation,
} = InternationalLicenseApiSlice;
