import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductList from "../components/ProductList";
import { Container, CircularProgress, Typography, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); // loading state
    const [error, setError] = useState(null);
    const dispatch = useDispatch(); //Jab aap kisi action ko fire (dispatch) karte ho, to wo reducer function ko call karta hai aur state update hoti hai.
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("https://fakestoreapi.com/products")
            .then((response) => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError("Failed to load products.");
                setLoading(false);
            });
    }, []);

    const handleBuyNow = (product) => {

        dispatch(addToCart(product));

        navigate("/checkout");
    };

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    return (
        <Container sx={{ mt: 4 }}>
            {loading ? (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: "80vh", // adjust as needed
                    }}
                >
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : (
                <ProductList products={products} addToCart={handleAddToCart} buyNow={handleBuyNow} />
            )}
        </Container>
    );
};

export default ProductPage;
