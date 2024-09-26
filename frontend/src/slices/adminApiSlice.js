import { apiSlice } from "./apiSlice";
const  ADMIN_URL = '/api/admin';

export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        adminLogin: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}/admin-login`,
                method: 'POST',
                body: data
            }),
        }),
        adminLogout: builder.mutation({
            query: () => ({
                url: `${ADMIN_URL}/admin-logout`,
                method: 'POST',
            })
        }),
        userDetails : builder.query({
            query: () => ({
                url: `${ADMIN_URL}/user-list`,
                method: 'GET',
            })
        }),
        userData: builder.mutation({
            query: (data) => ({
              url: `${ADMIN_URL}/user-data/${data}`,
              method: "GET",
            }),
          }),
          editUser: builder.mutation({
            query: (data) => ({
              url: `${ADMIN_URL}/update-user`,
              method: "PUT",
              body: data,
            }),
          }),
          deleteUser: builder.mutation({
            query: (data) => ({
              url: `${ADMIN_URL}/delete-user/${data}`,
              method: "POST",
              body: data,
            }),
          }),
          createUser: builder.mutation({
            query: (data) => ({
              url: `${ADMIN_URL}/create-user`,
              method: "POST",
              body: data,
            }),
          }),
        
    }),
});

export const { useAdminLoginMutation, 
    useAdminLogoutMutation,
    useUserDetailsQuery, 
    useUserDataMutation, 
    useEditUserMutation, 
    useCreateUserMutation, 
    useDeleteUserMutation  } = adminApiSlice;