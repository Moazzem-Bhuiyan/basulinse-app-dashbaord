import { baseApi } from './baseApi';

const dashBoardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardData: builder.query({
      query: (currentYear) => ({
        url: `/meta/dashboard-meta?year=${currentYear}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetDashboardDataQuery } = dashBoardApi;
