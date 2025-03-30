import React from "react";
import Cart from "../components/Cart";
import { Container } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../redux/cartSlice";

const CartPage = () => {
    const cart = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    const handleRemoveFromCart = (id) => {
        dispatch(removeFromCart(id));
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Cart cart={cart} removeFromCart={handleRemoveFromCart} />
        </Container>
    );
};

export default CartPage;
