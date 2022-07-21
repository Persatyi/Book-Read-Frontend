import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// https://persatyi-book-read-backend.herokuapp.com/api

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/api",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User", "Books", "Results"],
  endpoints: (build) => ({
    register: build.mutation({
      query: (data) => ({ url: "/users/register", method: "POST", body: data }),
      invalidatesTags: ["User"],
    }),
    login: build.mutation({
      query: (data) => ({ url: "/users/login", method: "POST", body: data }),
      invalidatesTags: ["User"],
    }),
    googleLogin: build.mutation({
      query: (data) => ({ url: "/users/login-google", method: "POST", body: data }),
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
      invalidatesTags: ["User"],
    }),
    current: build.query({
      query: () => "/users/current",
      providesTags: ["User"],
    }),
    books: build.query({
      query: () => "/books",
      providesTags: ["Books", "Results"],
    }),
    addTraining: build.mutation({
      query: (data) => ({ url: "/trainings", method: "POST", body: data }),
    }),
    getTraining: build.query({
      query: () => "/trainings",
      providesTags: ["Results", "Books"],
    }),
    addBook: build.mutation({
      query: (data) => ({ url: "/books", method: "POST", body: data }),
      invalidatesTags: ["Books"],
    }),
  }),
  // refetchOnFocus: true,
  // refetchOnReconnect: true,
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGoogleLoginMutation,
  useAddPageMutation,
  useLogoutMutation,
  useCurrentQuery,
  useGetResultsQuery,
  useBooksQuery,
  useAddTrainingMutation,
  useGetTrainingQuery,
  useAddBookMutation,
} = bookApi;
