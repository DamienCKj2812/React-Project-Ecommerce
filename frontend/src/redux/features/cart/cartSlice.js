import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../../../Utils/cart";

const initialState = localStorage.getItem('cart') ? 
    JSON.parse(localStorage.getItem ('cart')) :
    { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal"};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const {user, rating, numReviews, ...item} = action.payload; //destructuring to create a new object item that contains all properties of action.payload except user, rating, and numReviews
            const existItem = state.cartItems.find(x => x._id == item.id);

            if (existItem) {
                state.cartItems = state.cartItems.map(x => x._id == existItem._id ? item : x); // If it is, it replaces that item with the new item (item). If not, it keeps the current item unchanged.
            } else {
                state.cartItems = [...state.cartItems, item]; //it creates a new array using the spread operator (...). It takes all the existing items in state.cartItems and adds the new item (item) to the end of the array.
            }
            return updateCart(state, item);
        },

        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter( x => x._id != action.payload)
            return updateCart(state);
        },

        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
            localStorage.setItem('cart', JSON.stringify(state));
        },

        savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
            localStorage.setItem('cart', JSON.stringify(state));
        },

        clearCartItem: state => {
            state.cartItems = [];
            localStorage.setItem('cart', JSON.stringify(state));
        },

        resetCart: state => (state = initialState),
    }
})

export const { addToCart, removeFromCart, savePaymentMethod, saveShippingAddress, clearCartItem, resetCart } = cartSlice.actions;
export default cartSlice.reducer;