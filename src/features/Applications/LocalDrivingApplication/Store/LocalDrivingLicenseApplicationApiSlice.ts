import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IGenericApiResponse } from "../../../../interfaces/IApiResponse";
import {
  AddNewLocalDrivingLicenseDTO,
  ILicenseClass,
  ILicenseDetailsView,
  ILocalDrivingApplication,
} from "../interfaces";

export const LocalDrivingLicenseApplicationApiSlice = createApi({
  reducerPath: "LocalDrivingLicenseApplicationApi",
  tagTypes: ["LocalDrivingApplication"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5121/Api/v1/LocalDrivingApplication",
  }),
  endpoints: (builder) => ({
    fetchLocalDrivingApplicationsView: builder.query<
      IGenericApiResponse<Array<ILocalDrivingApplication>>,
      string
    >({
      query: (query) => ({
        url: `/GetLocalDrivingApplicationsView${query}`,
      }),
      providesTags: [
        { type: "LocalDrivingApplication", id: "LocalDrivingLicenseList" },
      ],

      transformErrorResponse: (response: {
        status: number;
        data: IGenericApiResponse<Array<ILocalDrivingApplication>>;
      }): string => {
        // Check if the response contains errors
        if (response.data.errors && Array.isArray(response.data.errors)) {
          return response.data.errors[0]; // Return the first error
        }
        return "An unexpected error occurred";
      },
    }),

    addNewLocalDrivingLicense: builder.mutation<
      IGenericApiResponse<string>,
      AddNewLocalDrivingLicenseDTO
    >({
      query: (newLicenseData) => ({
        url: "/AddNewLocalDrivingLicenseApplication", // Replace with your API endpoint
        method: "POST",
        body: newLicenseData,
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

      invalidatesTags: [
        { type: "LocalDrivingApplication", id: "LocalDrivingLicenseList" },
      ],
    }),

    fetchLicenseDetailsView: builder.query<
      IGenericApiResponse<ILicenseDetailsView>,
      string
    >({
      query: (query) => ({
        url: `/GetLicenseView${query}`,
      }),
      providesTags: [
        { type: "LocalDrivingApplication", id: "LicenseClassesList" },
      ],
      transformErrorResponse: (response: {
        status: number;
        data: IGenericApiResponse<Array<ILicenseClass>>;
      }): string => {
        if (response.data.errors && Array.isArray(response.data.errors)) {
          return response.data.errors[0]; // Return the first error
        }
        return "An unexpected error occurred";
      },
    }),
  }),
});

export const {
  useFetchLicenseDetailsViewQuery,
  useLazyFetchLicenseDetailsViewQuery,
  useAddNewLocalDrivingLicenseMutation,
  useFetchLocalDrivingApplicationsViewQuery,
} = LocalDrivingLicenseApplicationApiSlice;
