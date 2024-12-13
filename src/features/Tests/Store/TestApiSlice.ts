import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IAddScheduleTest,
  IAddTestResult,
  IScheduleTestView,
  ITestAppointmentsView,
  ITestLocalDrivingLicenseAppointmentView,
} from "../interfaces";
import { IGenericApiResponse } from "../../../interfaces/IApiResponse";

// Define the API slice
export const TestApiSlice = createApi({
  reducerPath: "Test",
  tagTypes: ["Test"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5121/Api/v1/Test",
  }),
  endpoints: (builder) => ({
    fetchTestLocalDrivingApplicationAppointmentView: builder.query<
      IGenericApiResponse<ITestLocalDrivingLicenseAppointmentView>,
      string
    >({
      query: (localDrivingApplicationId) => ({
        url: `/GetTestLocalDrivingLicenseDetail/${localDrivingApplicationId}`, // Append the query to the endpoint
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

    fetchScheduleTestInfoView: builder.query<
      IGenericApiResponse<IScheduleTestView>,
      string
    >({
      query: (query) => ({
        url: `/GetScheduleTestInfoView${query}`, // Append the query to the endpoint
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
    }),

    addTestResult: builder.mutation<
      IGenericApiResponse<string>,
      IAddTestResult
    >({
      query: (testResult) => ({
        url: "/AddTestResult",
        method: "POST",
        body: testResult,
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
    AddScheduleTest: builder.mutation<
      IGenericApiResponse<string>,
      IAddScheduleTest
    >({
      query: (data) => ({
        url: "/AddTestAppointment", // API endpoint for the POST request
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
  useFetchTestLocalDrivingApplicationAppointmentViewQuery,
} = TestApiSlice;
