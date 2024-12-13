import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IApplicationType } from "../interfaces";
import { IGenericApiResponse } from "../../../../interfaces/IApiResponse";
import { ILicenseClass } from "../../LocalDrivingApplication/interfaces";

// Create the shared API slice
export const applicationApiSlice = createApi({
  reducerPath: "applicationApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5121/Api/v1/Shared" }), // Adjust the base URL as needed
  endpoints: (builder) => ({
    // Fetch all application types
    fetchApplicationTypes: builder.query<
      IGenericApiResponse<Array<IApplicationType>>,
      null
    >({
      query: () => ({
        url: `/GetAllApplicationTypes`,
      }),
    }),

    fetchLicensesClasses: builder.query<
      IGenericApiResponse<Array<ILicenseClass>>,
      string
    >({
      query: () => ({
        url: `/GetLicenseClasses`,
      }),
    }),

    // Update application type
    updateApplicationType: builder.mutation<
      IGenericApiResponse<string>,
      IApplicationType
    >({
      query: (updatedApplicationType) => ({
        url: `/UpdateApplicationType`,
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
} = applicationApiSlice;
