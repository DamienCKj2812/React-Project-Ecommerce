export const addDecimals = num => {
    return(Math.round(num * 100)/100).toFixed(2);
}
    
export const updateCart = state => { // Calculate the total price of items in the cart 
    // Array.reduce() is a method in JavaScript that is used to reduce the elements of an array to a single value
    state.itemsPrice = addDecimals(
        state.cartItems.reduce(
            (acc, items) => acc + items.price * items.qty, 
            0  //0 represents the initial value
        )
    ) 

    state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);
    state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));

    state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice) 
    ).toFixed(2);

    localStorage.setItem('cart', JSON.stringify(state));
    return state;
}