import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductList from "../components/ProductList";
import { Container } from "@mui/material";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch(); //Jab aap kisi action ko fire (dispatch) karte ho, to wo reducer function ko call karta hai aur state update hoti hai.

    useEffect(() => {
        axios.get("https://fakestoreapi.com/products").then((response) => {
            setProducts(response.data);
        });
    }, []);

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    return (
        <Container sx={{ mt: 4 }}>
            <ProductList products={products} addToCart={handleAddToCart} />
        </Container>
    );
};

export default ProductPage;
