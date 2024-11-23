import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IApplicationType } from "../interfaces";
import { IGenericApiResponse } from "../../../../interfaces/IApiResponse";

// Create the shared API slice
export const applicationApiSlice = createApi({
  reducerPath: "applicationApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5121/Api/v1" }), // Adjust the base URL as needed
  endpoints: (builder) => ({
    // Fetch all application types
    fetchApplicationTypes: builder.query<
      IGenericApiResponse<Array<IApplicationType>>,
      string
    >({
      query: (query) => ({
        url: `/GetAllApplicationTypes${query}`,
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
  useFetchApplicationTypesQuery,
  useUpdateApplicationTypeMutation,
} = applicationApiSlice;
