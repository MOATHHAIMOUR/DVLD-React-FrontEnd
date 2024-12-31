import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IGenericApiResponse } from "../../../../interfaces/IApiResponse";
import {
  AddNewLocalDrivingLicenseDTO,
  IAddLocalLicense,
  ILicenseDetailsView,
  ILocalDrivingApplication,
} from "../interfaces";

export const LocalDrivingLicenseApplicationApiSlice = createApi({
  reducerPath: "LocalDrivingLicenseApplicationApi",
  tagTypes: ["LocalDrivingApplication"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5121/Api",
  }),

  endpoints: (builder) => ({
    fetchLocalDrivingApplicationsView: builder.query<
      IGenericApiResponse<Array<ILocalDrivingApplication>>,
      string
    >({
      query: (query) => ({
        url: `/v1/LocalDrivingApplication/GetLocalDrivingApplicationsView${query}`,
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
      providesTags: [{ type: "LocalDrivingApplication", id: "LIST" }],
    }),
    addNewLocalLicense: builder.mutation<void, IAddLocalLicense>({
      query: (body) => ({
        url: "/v1/LocalDrivingApplication/AddNewLocalLicense",
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
      invalidatesTags: [{ type: "LocalDrivingApplication", id: "LIST" }],
    }),

    cancelLocalDrivingApplication: builder.mutation({
      query: (localDrivingApplicationId) => ({
        url: `/v1/LocalDrivingApplication/CancelLocalDivingApplication?LocalDrivingApplication=${localDrivingApplicationId}`,
        method: "PUT",
        headers: {
          accept: "text/plain",
        },
        invalidatesTags: [{ type: "LocalDrivingApplication", id: "LIST" }],
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

    addNewLocalDrivingLicenseApplication: builder.mutation<
      IGenericApiResponse<string>,
      AddNewLocalDrivingLicenseDTO
    >({
      query: (localDrivingApplicationData) => ({
        url: "/v1/LocalDrivingApplication/AddNewLocalDrivingLicenseApplication",
        method: "POST",
        body: localDrivingApplicationData,
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

      invalidatesTags: [{ type: "LocalDrivingApplication", id: "LIST" }],
    }),

    fetchLicenseDetailsView: builder.query<
      IGenericApiResponse<ILicenseDetailsView>,
      string
    >({
      query: (query) => ({
        url: `/v1/LocalDrivingApplication/GetLicenseView${query}`,
      }),
      providesTags: [{ type: "LocalDrivingApplication", id: "LIST" }],

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

    renewLocalDrivingLicense: builder.mutation({
      query: ({ LicenseId, CreatedByUserId, ExpirationDate }) => ({
        url: "/v1/LocalDrivingApplication/RenewLocalDrivingLicense",
        method: "POST",
        params: { LicenseId, CreatedByUserId, ExpirationDate },
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
  useFetchLicenseDetailsViewQuery,
  useLazyFetchLicenseDetailsViewQuery,
  useCancelLocalDrivingApplicationMutation,
  useFetchLocalDrivingApplicationsViewQuery,
  useAddNewLocalDrivingLicenseApplicationMutation,
  useAddNewLocalLicenseMutation,
  useRenewLocalDrivingLicenseMutation,
} = LocalDrivingLicenseApplicationApiSlice;
