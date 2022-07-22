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
      invalidatesTags: ["User"],
    }),
    login: build.mutation({
      query: (data) => ({ url: "/users/login", method: "POST", body: data }),
      invalidatesTags: ["User"],
    }),
    refreshToken: build.mutation({
      query: (data) => ({ url: "/users/refresh", method: "POST", body: data }),
      invalidatesTags: ["User"],
    }),
    addPage: build.mutation({
      query: (data) => ({ url: "/results", method: "PATCH", body: data }),
      invalidatesTags: ["Results"],
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
    }),
    getTraining: build.query({
      query: () => "/trainings",
      providesTags: ["Results", "Books"],
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
  }),
  refetchOnFocus: true,
  // refetchOnReconnect: true,
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useRefreshTokenMutation,
  useAddPageMutation,
  useLogoutMutation,
  useCurrentQuery,
  useBooksQuery,
  useAddTrainingMutation,
  useGetTrainingQuery,
  useAddBookMutation,
  useAddReviewMutation,
} = bookApi;

// const baseQueryWithReauth = async (args, api, extraOptions) => {
//   let result = await baseQuery(args, api, extraOptions);

//   if (result.error && result.error.status === 401) {
//     const refreshResult = await baseQuery(
//       {
//         url: "users/refresh/",
//         method: "POST",
//       },
//       api,
//       extraOptions
//     );

//     if (refreshResult.data) {
//       api.dispatch(updateToken(refreshResult.data));

//       // retry the initial query
//       result = await baseQuery(args, api, extraOptions);
//     } else {
//       api.dispatch(logout());
//     }
//   }
//   return result;
// };
