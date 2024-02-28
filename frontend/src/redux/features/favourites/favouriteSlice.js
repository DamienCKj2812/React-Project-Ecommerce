import { createSlice } from "@reduxjs/toolkit";


// Definition: The state represents the current data or state of your application. It's a plain JavaScript object that holds the entire application's data.
// Role: The state is read-only, meaning you cannot modify it directly. Instead, you update the state by dispatching actions.
// Action:

// Definition: An action is a plain JavaScript object that describes a change in the state. It must have a type property, which is a string that describes the type of action, and can optionally include a payload property with additional data.
// Role: Actions are the only way to modify the state in Redux. When you want to update the state, you create an action and dispatch it.

// Define a Redux slice for managing favorites
const favouriteSlice = createSlice({
    name: 'favourites', // Name of the slice
    initialState: [], // Initial state is an empty array
    reducers: {
        // Action to add a product to the favorites list
        addToFavourites: (state, action) => {
            // Check if the product is not already in favorites
            if (!state.some(product => product._id === action.payload._id)) {
                state.push(action.payload);
            }
        },

        // Action to remove a product from the favorites list
        removeFromFavourites: (state, action) => {
            // Remove product with matching id
            return state.filter((product) => product._id !== action.payload._id);
        },

        // Action to set the entire favorites list
        setFavourites: (state, action) => {
            // Replace the current state with the new list of favorites
            return action.payload;
        }
    }
});

// Extract action creators and the reducer from the slice
export const { addToFavourites, removeFromFavourites, setFavourites } = favouriteSlice.actions;
export const selectFavouriteProduct = (state) => state.favourites; // Exporting a selector function for the "favourites" slice
export default favouriteSlice.reducer;
 