import { baseApi } from './baseApi';

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (data) => ({
        url: '/auth/login',
        method: 'POST',
        body: data,
      }),
    }),
    verifyEmail: builder.mutation({
      query: (data) => ({
        url: '/otp/verify-otp',
        method: 'POST',
        body: data,
      }),
    }),
    resendOtp: builder.mutation({
      query: (data) => ({
        url: '/otp/resend-otp',
        method: 'POST',
        body: { email: data },
      }),
    }),

    forgetPassword: builder.mutation({
      query: (data) => ({
        url: '/auth/forget-password',
        method: 'POST',
        body: data,
      }),
    }),

    resetPassword: builder.mutation({
      query: (data) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body: data,
      }),
    }),

    changepassword: builder.mutation({
      query: (data) => ({
        url: '/auth/change-password',
        method: 'POST',
        body: data,
      }),
    }),

    // get my profile ---------------

    getMyProfile: builder.query({
      query: () => ({
        url: '/users/my-profile',
        method: 'GET',
      }),
      providesTags: ['auth'],
    }),

    // update profile api endpoint
    updateProfileinfo: builder.mutation({
      query: (data) => ({
        url: '/users/update-my-profile',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['auth'],
    }),

    // nextcloud check api endpoint
    getNextcloudStatus: builder.query({
      query: () => ({
        url: '/users/nextcloud-status',
        method: 'GET',
      }),
    }),

    // nextcloud connect api endpoint
    connectNextcloud: builder.mutation({
      query: (data) => ({
        url: '/users/connect-nextcloud',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useSignInMutation,
  useVerifyEmailMutation,
  useResendOtpMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useChangepasswordMutation,
  useGetMyProfileQuery,
  useUpdateProfileinfoMutation,
  useGetNextcloudStatusQuery,
  useConnectNextcloudMutation,
} = authApi;
