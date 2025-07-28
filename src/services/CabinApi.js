import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cabinApi = createApi({
  reducerPath: 'cabinApi',
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
    getCabins: builder.query({
      query: () => 'cabins?populate=image',
      providesTags: ['Cabins'],
    }),

    deleteCabin: builder.mutation({
      query: (documentId) => ({
        url: `cabins/${documentId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cabins'],
    }),

    createCabin: builder.mutation({
      query: (cabinData) => ({
        url: 'cabins',
        method: 'POST',
        body: cabinData,
      }),
      invalidatesTags: ['Cabins'],
    }),

    updateCabin: builder.mutation({
      query: ({ documentId, cabinData }) => ({
        url: `cabins/${documentId}`,
        method: 'PUT',
        body: cabinData,
      }),
      invalidatesTags: ['Cabins'],
    }),

    uploadImage: builder.mutation({
      query: (formData) => ({
        url: '/upload',
        method: 'POST',
        body: formData,
      }),
    }),
  }),
});

export const {
  useGetCabinsQuery,
  useDeleteCabinMutation,
  useCreateCabinMutation,
  useUpdateCabinMutation,
  useUploadImageMutation, 
} = cabinApi;
