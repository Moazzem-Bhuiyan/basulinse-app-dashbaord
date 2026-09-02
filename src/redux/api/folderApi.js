import { baseApi } from './baseApi';

const FolderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createFolder: builder.mutation({
      query: (data) => ({
        url: '/projects',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Folders'],
    }),
    getFolders: builder.query({
      query: (id) => `/folders/${id}`,
      providesTags: ['Folders'],
    }),

    getAllFolders: builder.query({
      query: ({ limit, page, search }) => ({
        url: '/projects/author/my-projects',
        method: 'GET',
        params: { limit, page, searchTerm: search },
      }),
      providesTags: ['Folders'],
    }),
    deleteFolder: builder.mutation({
      query: (id) => ({
        url: `/projects/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Folders'],
    }),
    updateFolder: builder.mutation({
      query: ({ id, data }) => ({
        url: `/projects/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Folders'],
    }),

    // get folder images by folder id
    getFolderImages: builder.query({
      query: ({ folderId }) => ({
        url: `/work-photos/project/${folderId}`,
        method: 'GET',
      }),
      providesTags: ['Folders'],
    }),
  }),
});

export const {
  useGetFoldersQuery,
  useGetAllFoldersQuery,
  useCreateFolderMutation,
  useDeleteFolderMutation,
  useUpdateFolderMutation,
  useGetFolderImagesQuery,
} = FolderApi;
