const { baseApi } = require('./baseApi');

const workerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWorkers: builder.query({
      query: () => ({ url: `/users/company/my-workers`, method: 'GET' }),
      providesTags: ['workers'],
    }),

    // add worker mutation
    addWorker: builder.mutation({
      query: (payload) => ({
        url: `/users/add-worker`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['workers'],
    }),
  }),
});

export const { useGetWorkersQuery, useAddWorkerMutation } = workerApi;
