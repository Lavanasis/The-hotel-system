import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const registerApi = createApi({
  reducerPath: 'registerApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:1337/api/' }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (user) => ({
        url: 'auth/local/register',
        method: 'POST',
        body: user, // user 里应该包含 username, email, password
      }),
    }),
  }),
});

export const { useRegisterMutation } = registerApi;
