import { baseApi } from './baseApi';

export const webDAVApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWebDAV: builder.query({
      query: ({ os }) => ({
        url: '/work-photos/download-script',
        method: 'GET',
        params: {
          os,
        },

   
        responseHandler: async (response) => {
          if (!response.ok) {
            let errorMessage = 'WebDAV script download failed.';

            try {
              const contentType = response.headers.get('content-type');

              if (contentType?.includes('application/json')) {
                const errorData = await response.json();
                errorMessage =
                  errorData?.message ||
                  errorData?.error ||
                  errorMessage;
              } else {
                const errorText = await response.text();

                if (errorText) {
                  errorMessage = errorText;
                }
              }
            } catch {
              // Default error message ব্যবহার হবে
            }

            throw new Error(errorMessage);
          }

          return response.blob();
        },
      }),
    }),
  }),
});

export const {
  useLazyGetWebDAVQuery,
} = webDAVApi;