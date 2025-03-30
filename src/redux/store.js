import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

export const store = configureStore({ //ek object hai jo aapke sare state slices ko combine karta hai. Yaha humne ek store banaya hai jisme humne cart reducer add kiya.
    reducer: {
        cart: cartReducer,
    },
});
