import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { create } from "domain";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/v1",
  }),
  tagTypes: ["Post", "Vote"],
  endpoints: (builder) => ({
    // Post
    createPost: builder.mutation({
      query: (postData) => ({
        url: "/posts/create",
        method: "POST",
        body: postData,
      }),
      invalidatesTags: ["Post"],
    }),
    getAllPosts: builder.query({
      query: () => ({
        url: "/posts",
      }),
      providesTags: ["Post"],
    }),

    // Vote
    createVote: builder.mutation({
      query: (voteData) => ({
        url: "/votes/add-vote",
        method: "POST",
        body: voteData,
      }),
      invalidatesTags: ["Vote", "Post"],
    }),
    getVoteCount: builder.query({
      query: (postId) => ({
        url: `/votes/posts/${postId}`,
      }),
      providesTags: ["Vote"],
    }),

    // Authentication
    userLogin: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    userRegister: builder.mutation({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetAllPostsQuery,

  useCreateVoteMutation,
  useGetVoteCountQuery,

  useUserLoginMutation,
  useUserRegisterMutation,
} = baseApi;
