const { baseApi } = require('./baseApi');

const ImageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getImagesByWorkerId: builder.query({
      query: (workerId) => ({
        url: `/work-photos/worker/${workerId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetImagesByWorkerIdQuery } = ImageApi;
