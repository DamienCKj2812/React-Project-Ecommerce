import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../constants";

// apiSlice.injectEndpoints: define API endpoints. It takes a callback function that receives a builder object. Inside this callback, you define your API endpoints.
export const userApiSlice = apiSlice.injectEndpoints({
    // endpoints: An object containing the different endpoints. In this case, there's only one endpoint called "login."
    endpoints: (builder) => ({
        // builder.mutation: This is used to define a mutation endpoint, which typically represents an operation that will modify data on the server. 
        // In this case, it's a login operation.
        login: builder.mutation({
            // query: A function that takes the data needed for the mutation and returns an object representing the network request configuration (URL, method, body).
            query: (data) => ({
                url: `${USERS_URL}/auth`, // api/users/auth, so when combined with the base it became:  http://localhost:5000/api/users/auth
                method: "POST",
                body: data,
            }),
        }),

        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: "POST",
            }),
        }),

        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: "POST",
                body: data,
            }),
        }),

        profile: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: "PUT",
                body : data,
            }),
        }),

        getUsers: builder.query({
            query: () => ({
                url: USERS_URL,
            }),
            providesTags: ['User'], // Tags associated with the fetched data for cache management.
            keepUnusedDataFor: 5,   // Keep the data in the cache for 5 seconds after it's not actively used.
        }),

        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `${USERS_URL}/${userId}`,
                method: "DELETE",
            }),
        }),

        getUserDetails: builder.query({
            query: (id)=> ({
                url: `${USERS_URL}/${id}`,
            }),
            keepUnusedDataFor: 5,
        }),


        updateUser: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/${data.userId}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["User"], //invalidatesTags property indicates that, after a successful update, the specified data tags ("User") should be invalidated. 
                                       //This is clearing or refetched cached data associated with the "User" tag.
        })
    }), 
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useProfileMutation, useGetUsersQuery, useDeleteUserMutation, useGetUserDetailsQuery, useUpdateUserMutation } = userApiSlice; //RTK will automatically create a hook

// builder.query:

// Used for reading or fetching data from the server.
// It does not make any changes to the data.
// Queries are executed in a read-only manner.

// builder.mutation:

// Used for modifying or updating data on the server.
// Mutations can include operations like creating, updating, or deleting data.
// Mutations are executed in a write manner. 
