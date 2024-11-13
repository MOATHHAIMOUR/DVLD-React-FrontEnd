import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IApiResponse } from "../interfaces/IApiResponse";

interface ICountry {
  countryId: number;
  name: string;
  code: string;
}

// Create the shared API slice
export const sharedApiSlice = createApi({
  reducerPath: "sharedApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5121/Api/v1" }), // Adjust the base URL as needed
  endpoints: (builder) => ({
    fetchCountries: builder.query<IApiResponse<Array<ICountry>>, void>({
      query: () => ({
        url: "/GetAllCountries", // Adjust endpoint as needed
      }),
      transformResponse: (response: IApiResponse<Array<ICountry>>) => {
        return response;
      },
    }),
  }),
});

// Export hooks for usage in functional components
export const { useFetchCountriesQuery } = sharedApiSlice;