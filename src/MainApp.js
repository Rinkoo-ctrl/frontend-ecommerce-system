import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Navbar from "./components/Navbar.js";
import { Container } from "@mui/material";

const MainApp = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        axios.get("https://fakestoreapi.com/products").then((response) => {
            setProducts(response.data);
        });
    }, []);

    const addToCart = (product) => {
        setCart([...cart, product]);
    };

    const removeFromCart = (id) => {
        setCart(cart.filter((item) => item.id !== id));
    };

    return (
        <>
            <Navbar />
            <Container>
                <ProductList products={products} addToCart={addToCart} />
                <Cart cart={cart} removeFromCart={removeFromCart} />
            </Container>
        </>
    );
};

export default MainApp;
