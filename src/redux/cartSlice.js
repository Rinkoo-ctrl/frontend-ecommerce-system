import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState, //cart is empty
    reducers: { //Actions
        addToCart(state, action) {
            state.items.push(action.payload);
        },
        removeFromCart(state, action) {
            state.items = state.items.filter((item) => item.id !== action.payload);
        },
    },
});

export const { addToCart, removeFromCart } = cartSlice.actions; //components me use kiya ja sake
export default cartSlice.reducer; //store me add ho sake.
