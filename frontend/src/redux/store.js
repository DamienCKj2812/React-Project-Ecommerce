// documentaion: https://redux-toolkit.js.org/api/configureStore
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./api/apiSlice";
import authReducer from './features/auth/authSlice'; //authSlice.reducer
import favouritesReducer from './features/favourites/favouriteSlice';
import cartSliceReducer from './features/cart/cartSlice';
import  shopReducer from './features/shop/shopSlice';
import { getFavouritesFromLocalStorage } from "../Utils/localStorage";

const initialFavourites = getFavouritesFromLocalStorage() || []; //if no favourites then crreate empty array

// Create the Redux store using configureStore
const store = configureStore({
    // Combine reducers for RTK Query API slice and custom authentication slice
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer, // RTK Query API slice reducer
        auth: authReducer, // Custom authentication slice reducer
        favourites : favouritesReducer,
        cart : cartSliceReducer,
        shop : shopReducer,
    },

    preloadedState: { //It allows you to provide an initial state for the Redux store before any actions are dispatched.
        favourites : initialFavourites, 
    },

    // Middleware setup to include RTK Query middleware (provided by Redux Toolkit to customize the middleware stack)
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(apiSlice.middleware),

    // Enable Redux DevTools extension for debugging
    devTools: true,
});

// Set up listeners for RTK Query to automatically handle lifecycle events (pending state, fullfilled state, rejected state)
setupListeners(store.dispatch);

// Export the configured Redux store
export default store;

