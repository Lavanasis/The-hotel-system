import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const settingApi = createApi({
  reducerPath: 'settingApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:1337/api',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('jwtToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getSettings: builder.query({
      query: () => 'settings',
      transformResponse: (response) => response.data[0],
      providesTags: ['Settings'],
    }),

    updateSettings: builder.mutation({
      query: ({documentId,settingsData}) => ({
        url: `settings/${documentId}`,
        method: 'PUT',
        body: settingsData 
      }),
      invalidatesTags: ['Settings'],
    }),
  }),
});

export const {
  useGetSettingsQuery,  
  useUpdateSettingsMutation,
} = settingApi;