// documentation: https://redux-toolkit.js.org/rtk-query/api/createApi

import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';

// Create a base query function with a specified base URL
const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL }); // http://localhost:5000/

// Create an API slice using createApi
export const apiSlice = createApi({
  baseQuery,          // Use the base query created above
  tagTypes: ['Product', 'Order', 'User', 'Category'],  // Specifying tag types is optional, but you should define them so that they can be used for caching and invalidation (operation like providesTags and invalidsTags)
  endpoints: () => ({}),  // Define endpoints later in your application (userApiSlice.js)
});


// Examle of RTK Query
// -- Import the RTK Query methods from the React-specific entry point
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// -- Define our single API slice object
// export const apiSlice = createApi({
//   -- The cache reducer expects to be added at `state.api` (already default - this is optional)
//   reducerPath: 'api',
//   -- All of our requests will have URLs starting with '/fakeApi'
//   baseQuery: fetchBaseQuery({ baseUrl: '/fakeApi' }),
//   -- The "endpoints" represent operations and requests for this server
//   endpoints: builder => ({
//     -- The `getPosts` endpoint is a "query" operation that returns data
//     getPosts: builder.query({
//       -- The URL for the request is '/fakeApi/posts'
//       query: () => '/posts'
//     })
//   })
// })

// -- Export the auto-generated hook for the `getPosts` query endpoint
// export const { useGetPostsQuery } = apiSlice

// TIP
// Typically, you should only have one API slice per base URL that your application needs to communicate with. 
// For example, if your site fetches data from both /api/posts and /api/users, you would have a single API slice with /api/ as the base URL, 
// and separate endpoint definitions for posts and users. This allows you to effectively take advantage of automated re-fetching by defining tag relationships across endpoints.

// For maintainability purposes, you may wish to split up endpoint definitions across multiple files, while still maintaining a single API slice which includes all of these endpoints. 
// See code splitting for how you can use the injectEndpoints property to inject API endpoints from other files into a single API slice definition.



// An endpoint refers to a specific URL or URI (Uniform Resource Identifier) where an API can be accessed. 
// An API endpoint is a specific location where an API makes its functionality available. It represents a specific interaction point between the client (which could be a web browser, 
// a mobile app, or another server) and the server hosting the API.

// Endpoints are defined by the API provider and are used to perform various operations or actions. 
// These operations are often associated with the HTTP methods such as GET, POST, PUT, DELETE, etc. 
// For example, a simple RESTful API for managing a list of books might have endpoints like:

// GET /books: Retrieve a list of books.
// GET /books/{id}: Retrieve details of a specific book.
// POST /books: Create a new book.
// PUT /books/{id}: Update details of a specific book.
// DELETE /books/{id}: Delete a specific book.

// In the URLs above, "/books" and "/books/{id}" are the endpoints. The HTTP method used in combination with the endpoint determines the action to be performed.
// The combination of the base URL and the endpoint creates a complete URL that clients can use to communicate with the API. 
// For example, if an API is hosted at "https://api.example.com," the complete URL for retrieving a list of books would be "https://api.example.com/books."