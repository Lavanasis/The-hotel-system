import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const bookingApi = createApi({
  reducerPath: 'bookingApi',
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
  tagTypes: ['Bookings'],
  endpoints: builder => ({
    getBookings: builder.query({
      query: () => '/bookings?populate=cabinID&populate=guestID',
      providesTags: ['Bookings'],
    }),

    // 获取某个时间点之后的预定记录
    getBookingsAfterDate: builder.query({
      query: date => `/bookings?populate=cabinID&populate=guestID&filters[createdAt][$gte]=${date}`,
      providesTags: ['Bookings'],
    }),

    // 获取某个时间点之后的入住记录
    getStaysAfterDate: builder.query({
      query: date => `/bookings?populate=guestID&filters[startDate][$gte]=${date}`,
      providesTags: ['Bookings'],
    }),

    // 获取今天有活动（check-in 或 check-out）的记录
    getStaysTodayActivity: builder.query({
      query: () => {
        const today = new Date().toISOString().split('T')[0];

        // 动态构建 URL，防止特殊字符出错
        const encodedStatus1 = encodeURIComponent('unconfirmed');
        const encodedStatus2 = encodeURIComponent('checked in');

        const query =
          `/bookings?populate=cabinID&populate=guestID` +
          `&filters[$or][0][bookingStatus][$eq]=${encodedStatus1}` +
          `&filters[$or][0][startDate][$eq]=${today}` +
          `&filters[$or][1][bookingStatus][$eq]=${encodedStatus2}` +
          `&filters[$or][1][endDate][$eq]=${today}` +
          `&sort=createdAt`;

        return query;
      },
      providesTags: ['Bookings'],
    }),

    // 更新 booking 状态
    updateBooking: builder.mutation({
      query: ({ documentId, ...updateFields }) => ({
        url: `/bookings/${documentId}`,
        method: 'PUT',
        body: {
          data: updateFields,
        },
      }),
      invalidatesTags: ['Bookings'],
    }),

    //删除booking
    deleteBooking: builder.mutation({
      query: documentId => ({
        url: `/bookings/${documentId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Bookings'],
    }),
  }),
});

export const {
  useGetBookingsQuery,
  useGetBookingsAfterDateQuery,
  useGetStaysAfterDateQuery,
  useGetStaysTodayActivityQuery,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
} = bookingApi;
