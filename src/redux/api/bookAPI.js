import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://persatyi-book-read-backend.herokuapp.com/api",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User", "Results"],
  endpoints: (build) => ({
    register: build.mutation({
      query: (data) => ({ url: "/users/register", method: "POST", body: data }),
      invalidatesTags: ["User"],
    }),
    login: build.mutation({
      query: (data) => ({ url: "/users/login", method: "POST", body: data }),
      invalidatesTags: ["User"],
    }),
    addPage: build.mutation({
      query: (data) => ({ url: "/results", method: "PATCH", body: data }),
      invalidatesTags: ["Results"],
    }),
    getResults: build.query({
      query: () => "/results",
      providesTags: ["Results"],
    }),
    logout: build.mutation({
      query: () => ({ url: "/users/logout", method: "POST" }),
    }),
    current: build.query({
      query: () => "/users/current",
      providesTags: ["User"],
    }),
    getBooks: build.query({
      query: () => "/books",
      providesTags: ["Results"],
    }),
    getTrainings: build.query({
      query: () => "/trainings",
      providesTags: ["Results"],
    }),
  }),
});
// refetchOnFocus: true,
// refetchOnReconnect: true,

export const {
  useRegisterMutation,
  useLoginMutation,
  useAddPageMutation,
  useLogoutMutation,
  useCurrentQuery,
  useGetResultsQuery,
  useGetBooksQuery,
  useGetTrainingsQuery,
} = bookApi;
