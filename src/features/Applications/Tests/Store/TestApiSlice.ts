import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IAddScheduleTest,
  IAddTestResult,
  IScheduleTestView,
  ITestAppointmentsView,
} from "../interfaces";
import { IGenericApiResponse } from "../../../../interfaces/IApiResponse";
import { LocalDrivingLicenseApplicationApiSlice } from "../../LocalDrivingApplication/Store/LocalDrivingLicenseApplicationApiSlice";

// Define the API slice
export const TestApiSlice = createApi({
  reducerPath: "Test",
  tagTypes: ["Test", "LocalDrivingApplication"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5121/Api",
  }),
  endpoints: (builder) => ({
    fetchScheduleTestInfoView: builder.query<
      IGenericApiResponse<IScheduleTestView>,
      string
    >({
      query: (query) => ({
        url: `/v1/Test/GetScheduleTestInfoView${query}`, // Append the query to the endpoint
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

    fetchTestAppointments: builder.query<
      IGenericApiResponse<Array<ITestAppointmentsView>>,
      { localDrivingApplication: number; testTypeId: number }
    >({
      query: ({ localDrivingApplication, testTypeId }) =>
        `/GetTestAppointments?localDrivingApplication=${localDrivingApplication}&TestTypeId=${testTypeId}`,

      transformErrorResponse: (response: {
        status: number;
        data: IGenericApiResponse<Array<string>>;
      }) => {
        return {
          status: response.data.statusCode,
          message: response.data.errors[0],
        };
      },
      providesTags: [{ type: "Test", id: "TestAppointmentList" }],
    }),

    addTestResult: builder.mutation<
      IGenericApiResponse<string>,
      IAddTestResult
    >({
      query: (testResult) => ({
        url: "/v1/Test/AddTestResult",
        method: "POST",
        body: testResult,
      }),
      invalidatesTags: [
        { type: "LocalDrivingApplication", id: "LIST" },
        { type: "Test", id: "TestAppointmentList" },
      ],
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          // Wait for the mutation to fulfill
          await queryFulfilled;

          // Manually invalidate tags in LocalDrivingLicenseApplicationApiSlice
          dispatch(
            LocalDrivingLicenseApplicationApiSlice.util.invalidateTags([
              { type: "LocalDrivingApplication", id: "LIST" },
            ])
          );
        } catch (error) {
          console.error("Error invalidating tags:", error);
        }
      },
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

    AddScheduleTest: builder.mutation<
      IGenericApiResponse<string>,
      IAddScheduleTest
    >({
      query: (data) => ({
        url: "/v1/Test/AddTestAppointment", // API endpoint for the POST request
        method: "POST",
        body: data,
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
      invalidatesTags: [{ type: "Test", id: "TestAppointmentList" }],
    }),
  }),
});

// Export hooks for the query
export const {
  useAddTestResultMutation,
  useAddScheduleTestMutation,
  useLazyFetchScheduleTestInfoViewQuery,
  useFetchScheduleTestInfoViewQuery,
  useFetchTestAppointmentsQuery,
} = TestApiSlice;
