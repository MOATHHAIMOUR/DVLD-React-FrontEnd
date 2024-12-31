import { createApi } from "@reduxjs/toolkit/query/react";
import { IGenericApiResponse } from "../../../interfaces/IApiResponse";
import { IApiUser, IUserView } from "../interfaces";
import { baseQueryWithReauth } from "../../../baseQueryWithReauth";

export const UserApiSlice = createApi({
  reducerPath: "UserApi",
  tagTypes: ["Users"],
  baseQuery: baseQueryWithReauth("http://localhost:5121/Api"),

  refetchOnReconnect: true,
  endpoints: (builder) => ({
    fetchUsers: builder.query<IGenericApiResponse<Array<IUserView>>, string>({
      query: (query) => ({
        url: `/GetUsers${query}`,
      }),
      providesTags: [{ type: "Users", id: "LIST" }],
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
    fetchUser: builder.query<IGenericApiResponse<IUserView>, string>({
      query: (query) => ({
        url: `/v1/User/GetUser${query}`,
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
        url: `/v1/User/DeleteUser/${userId}`,
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
        url: `/v1/User/AddUser`,
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
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
    UpdateUser: builder.mutation<IGenericApiResponse<string>, IApiUser>({
      query: (updatedUser) => ({
        url: `/v1/User/UpdateUser`,
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
