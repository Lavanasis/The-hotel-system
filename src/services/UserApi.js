import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:1337/api',
    prepareHeaders: headers => {
      const token = localStorage.getItem('jwtToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User'],
  endpoints: builder => ({
    login: builder.mutation({
      query: ({ identifier, password }) => ({
        url: '/auth/local',
        method: 'POST',
        body: {
          identifier, // 用户名或邮箱
          password, // 密码
        },
      }),
    }),

    getUser: builder.query({
      query: id => `/users/${id}?populate=avatar`,
      providesTags: (result, error, id) => [{ type: 'User', id }],
    }),

    updateUser: builder.mutation({
      query: ({ id, body }) => ({
        url: `/users/${id}?populate=avatar`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'User', id }],
    }),

    uploadImage: builder.mutation({
      query: formData => ({
        url: '/upload',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['User'],
    }),

    changePassword: builder.mutation({
      query: ({ currentPassword, password, passwordConfirmation }) => ({
        url: '/auth/change-password',
        method: 'POST',
        body: {
          currentPassword,
          password,
          passwordConfirmation,
        },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useUpdateUserMutation,
  useChangePasswordMutation,
  useUploadImageMutation,
  useGetUserQuery,
} = userApi;
