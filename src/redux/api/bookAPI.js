import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "https://persatyi-book-read-backend.herokuapp.com/api";
// const BASE_URL = "http://localhost:4444/api";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery,
  tagTypes: ["User", "Books", "Results"],
  endpoints: (build) => ({
    register: build.mutation({
      query: (data) => ({ url: "/users/register", method: "POST", body: data }),
      invalidatesTags: ["User", "Books"],
    }),
    login: build.mutation({
      query: (data) => ({ url: "/users/login", method: "POST", body: data }),
      invalidatesTags: ["User", "Books"],
    }),
    googleLogin: build.mutation({
      query: (data) => ({
        url: "/users/login-google",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User", "Books"],
    }),
    refreshToken: build.mutation({
      query: (data) => ({ url: "/users/refresh", method: "POST", body: data }),
      invalidatesTags: ["User"],
    }),
    addPage: build.mutation({
      query: (data) => ({ url: "/results", method: "POST", body: data }),
      invalidatesTags: ["Results", "Books"],
    }),
    logout: build.mutation({
      query: () => ({ url: "/users/logout", method: "POST" }),
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
      invalidatesTags: ["Books"],
    }),
    addBook: build.mutation({
      query: (data) => ({ url: "/books", method: "POST", body: data }),
      invalidatesTags: ["Books"],
    }),
    addReview: build.mutation({
      query: ({ id, ...data }) => ({
        url: `/books/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Books"],
    }),
    editBook: build.mutation({
      query: ({ id, ...data }) => ({
        url: `/books/${id}`,
        method: "PUT",
        body: data,
      }),
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
  useRefreshTokenMutation,
  useAddPageMutation,
  useLogoutMutation,
  useCurrentQuery,
  useBooksQuery,
  useAddTrainingMutation,
  useAddBookMutation,
  useAddReviewMutation,
  useEditBookMutation,
} = bookApi;
