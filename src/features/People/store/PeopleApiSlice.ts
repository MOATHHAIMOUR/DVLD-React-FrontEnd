import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IGenericApiResponse } from "../../../interfaces/IApiResponse";
import {
  IApiPerson,
  IPerson,
  IPersonDetailData,
  IPersonTableData,
} from "../interfaces";

export const peopleApiSlice = createApi({
  reducerPath: "peopleApi",
  tagTypes: ["People"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5121/Api/v1/Person",
  }),
  endpoints: (builder) => ({
    fetchPeople: builder.query<
      IGenericApiResponse<Array<IPersonTableData>>,
      string
    >({
      query: (query) => {
        return {
          url: `/GetPeople${query}`,
        };
      },
      transformResponse: (
        response: IGenericApiResponse<Array<IPersonDetailData>>
      ) => {
        // Return only the data (list of people) if successful
        return response;
      },
      transformErrorResponse: (response: {
        status: number;
        data: IGenericApiResponse<Array<string>>;
      }) => {
        // Customize the error response here, extracting errors if available
        return {
          status: response.status,
          errors: response.data.errors || ["An unexpected error occurred"],
        };
      },
      providesTags: [{ type: "People", id: "LIST" }],
    }),
    AddPerson: builder.mutation<IGenericApiResponse<IPerson>, IPerson>({
      query: (newPerson) => ({
        url: "/AddPerson",
        method: "POST",
        body: newPerson,
      }),

      transformErrorResponse: (response: {
        status: number;
        data: IGenericApiResponse<Array<string>>;
      }) => ({
        status: response.status,
        errors: response.data.errors || ["An unexpected error occurred"],
      }),
      invalidatesTags: [{ type: "People", id: "LIST" }],
    }),
    UpdatePerson: builder.mutation<IGenericApiResponse<IPerson>, IPerson>({
      query: (Person) => ({
        url: "/UpdatePerson",
        method: "PUT",
        body: Person,
      }),
      transformErrorResponse: (response: {
        status: number;
        data: IGenericApiResponse<Array<string>>;
      }) => ({
        status: response.status,
        errors: response.data.errors || ["An unexpected error occurred"],
      }),
      invalidatesTags: [{ type: "People", id: "LIST" }],
    }),
    deletePerson: builder.mutation<void, number>({
      query: (id) => ({
        url: `/DeletePerson/${id}`,
        method: "DELETE",
      }),
      // Optionally, you can update the cache after deleting
      invalidatesTags: [{ type: "People", id: "LIST" }],
    }),
    fetchPerson: builder.query<
      IGenericApiResponse<IApiPerson>, // Using IApiPerson in the response type
      string | null // Query parameter
    >({
      query: (query) => ({
        url: `/GetPerson${query}`,
        keepUnusedDataFor: 0, // Construct the API URL
      }),
      transformResponse: (
        response: IGenericApiResponse<IApiPerson>
      ): IGenericApiResponse<IApiPerson> => {
        // If any transformation is required, it can be done here
        return response;
      },
    }),
  }),
});

export const {
  useAddPersonMutation,
  useUpdatePersonMutation,
  useFetchPeopleQuery,
  useDeletePersonMutation,
  useFetchPersonQuery,
  useLazyFetchPersonQuery,
} = peopleApiSlice;
