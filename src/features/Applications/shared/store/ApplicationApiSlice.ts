import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IApplicationType } from "../interfaces";
import { IGenericApiResponse } from "../../../../interfaces/IApiResponse";
import { ILicenseClass } from "../../LocalDrivingApplication/interfaces";
import { ITestLocalDrivingLicenseAppointmentView } from "../../Tests/interfaces";

// Create the shared API slice
export const applicationApiSlice = createApi({
  reducerPath: "applicationApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5121/Api" }), // Adjust the base URL as needed
  endpoints: (builder) => ({
    fetchTestLocalDrivingApplicationAppointmentView: builder.query<
      IGenericApiResponse<ITestLocalDrivingLicenseAppointmentView>,
      string
    >({
      query: (localDrivingApplicationId) => ({
        url: `/v1/Test/GetTestLocalDrivingLicenseDetail/${localDrivingApplicationId}`, // Append the query to the endpoint
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

    fetchApplicationTypes: builder.query<
      IGenericApiResponse<Array<IApplicationType>>,
      null
    >({
      query: () => ({
        url: `/v1//Shared/GetAllApplicationTypes`,
      }),
    }),

    fetchLicensesClasses: builder.query<
      IGenericApiResponse<Array<ILicenseClass>>,
      string
    >({
      query: () => ({
        url: `/v1/Shared/GetLicenseClasses`,
      }),
    }),

    // Update application type
    updateApplicationType: builder.mutation<
      IGenericApiResponse<string>,
      IApplicationType
    >({
      query: (updatedApplicationType) => ({
        url: `/v1/Shared/UpdateApplicationType`,
        method: "PUT", // Assuming the endpoint uses HTTP PUT
        body: updatedApplicationType,
        headers: {
          "Content-Type": "application/json", // Ensure proper content type
        },
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useFetchLicensesClassesQuery,
  useFetchApplicationTypesQuery,
  useUpdateApplicationTypeMutation,
  useFetchTestLocalDrivingApplicationAppointmentViewQuery,
} = applicationApiSlice;
