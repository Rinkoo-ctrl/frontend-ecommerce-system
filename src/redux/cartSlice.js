import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action) {
            const product = action.payload;

            const existingProduct = state.items.find((item) => item.id === product.id);
            if (existingProduct) {
                existingProduct.quantity = (existingProduct.quantity || 1) + 1;
            } else {
                state.items.push({ ...product, quantity: 1 });
            }
        },
        removeFromCart(state, action) {
            state.items = state.items.filter((item) => item.id !== action.payload);
        },

        decreaseQuantity(state, action) {
            const productId = action.payload;
            const existingProduct = state.items.find((item) => item.id === productId);
            if (existingProduct) {
                if (existingProduct.quantity > 1) {
                    existingProduct.quantity -= 1;
                } else {
                    state.items = state.items.filter((item) => item.id !== productId);
                }
            }
        },
    },
});

export const { addToCart, removeFromCart, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
