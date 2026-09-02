import { baseApi } from './baseApi';

const OneDriveApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    connectOneDrive: builder.query({
      query: (data) => ({
        url: `/onedrive/connect/${data}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useConnectOneDriveQuery } = OneDriveApi;
