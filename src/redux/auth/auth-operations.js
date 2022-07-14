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
tagTypes: ["User"],
endpoints: (build) => ({
    register: build.mutation({
    query: (data) => ({ url: "/users/register", method: "POST", body: data }),
    invalidatesTags: ["User"],
    }),
    login: build.mutation({
    query: (data) => ({ url: "/users/login", method: "POST", body: data }),
    invalidatesTags: ["User"],
    }),
    logout: build.query({
        query: () => "/users/logout",
        providesTags: ["User"],
    }),
    }),
});
// refetchOnFocus: true,
// refetchOnReconnect: true,

export const { useRegisterMutation, useLoginMutation, useLogoutQuery } = bookApi;
