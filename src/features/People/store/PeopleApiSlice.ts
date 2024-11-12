import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IApiResponse } from "../../../interfaces/IApiResponse";
import { IPerson } from "../../../interfaces/IPerson";

export const peopleApiSlice = createApi({
  reducerPath: "peopleApi",
  tagTypes: ["People"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5121/Api/v1/Person",
  }),
  endpoints: (builder) => ({
    fetchPeople: builder.query<IApiResponse<Array<IPerson>>, object>({
      query: () => {
        return {
          url: "/GetPeople",
        };
      },
      transformResponse: (response: IApiResponse<Array<IPerson>>) => {
        // Return only the data (list of people) if successful
        return response;
      },
      transformErrorResponse: (response: {
        status: number;
        data: IApiResponse<Array<string>>;
      }) => {
        // Customize the error response here, extracting errors if available
        return {
          status: response.status,
          errors: response.data.errors || ["An unexpected error occurred"],
        };
      },
      providesTags: [{ type: "People", id: "LIST" }],
    }),
    deletePerson: builder.mutation<void, number>({
      query: (id) => ({
        url: `/DeletePerson/${id}`,
        method: "DELETE",
      }),
      // Optionally, you can update the cache after deleting
      invalidatesTags: [{ type: "People", id: "LIST" }],
    }),
  }),
});

export const { useFetchPeopleQuery, useDeletePersonMutation } = peopleApiSlice;
