import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IGenericApiResponse } from "../../../interfaces/IApiResponse";
import { IApiUser, IUserView } from "../interfaces";

export const UserApiSlice = createApi({
  reducerPath: "UserApi",
  tagTypes: ["Users"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5121/Api/v1/User",
  }),
  endpoints: (builder) => ({
    fetchUsers: builder.query<IGenericApiResponse<Array<IUserView>>, string>({
      query: (query) => ({
        url: `/GetUsers${query}`,
      }),
      providesTags: [{ type: "Users", id: "LIST" }],
      transformErrorResponse: (response: {
        status: number;
        data: IGenericApiResponse<Array<IApiUser>>;
      }): string => {
        // Check if the response contains errors
        if (response.data.errors && Array.isArray(response.data.errors)) {
          return response.data.errors[0]; // Return the first error
        }
        return "An unexpected error occurred";
      },
    }),
    fetchUser: builder.query<IGenericApiResponse<IUserView>, string>({
      query: (query) => ({
        url: `/GetUser${query}`,
      }),
      transformResponse: (response: IGenericApiResponse<IUserView>) => {
        return response;
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
    deleteUser: builder.mutation<IGenericApiResponse<null>, number>({
      query: (userId) => ({
        url: `/DeleteUser/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
      transformResponse: (response: IGenericApiResponse<null>) => {
        return response;
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
    addUser: builder.mutation<IGenericApiResponse<string>, IApiUser>({
      query: (newUser) => ({
        url: `/AddUser`,
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
      transformErrorResponse: (response: {
        status: number;
        data: IGenericApiResponse<null>;
      }): string => {
        // Check if the response contains errors
        if (response.data.errors && Array.isArray(response.data.errors)) {
          return response.data.errors[0]; // Return the first error
        }
        return "An unexpected error occurred";
      },
    }),
    UpdateUser: builder.mutation<IGenericApiResponse<string>, IApiUser>({
      query: (updatedUser) => ({
        url: `/UpdateUser`,
        method: "PUT",
        body: updatedUser,
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
      transformErrorResponse: (response: {
        status: number;
        data: IGenericApiResponse<null>;
      }): string => {
        // Check if the response contains errors
        if (response.data.errors && Array.isArray(response.data.errors)) {
          return response.data.errors[0]; // Return the first error
        }
        return "An unexpected error occurred";
      },
    }),
  }),
});

export const {
  useUpdateUserMutation,
  useLazyFetchUserQuery,
  useAddUserMutation,
  useFetchUsersQuery,
  useFetchUserQuery,
  useDeleteUserMutation,
} = UserApiSlice;
