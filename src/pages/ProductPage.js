import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductList from "../components/ProductList";
import { Container, CircularProgress, Typography, Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [loading, setLoading] = useState(true); // loading state
    const [error, setError] = useState(null);
    const dispatch = useDispatch(); //Jab aap kisi action ko fire (dispatch) karte ho, to wo reducer function ko call karta hai aur state update hoti hai.
    const navigate = useNavigate();


    useEffect(() => {
        axios
            .get("https://fakestoreapi.com/products/categories")
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.error("Failed to fetch categories:", error);
            });
    }, []);


    // Fetch products whenever selectedCategory changes
    useEffect(() => {
        setLoading(true);
        let url = "https://fakestoreapi.com/products";
        if (selectedCategory !== "all") {
            url = `https://fakestoreapi.com/products/category/${selectedCategory}`;
        }
        axios
            .get(url)
            .then((response) => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError("Failed to load products.");
                setLoading(false);
            });
    }, [selectedCategory]);

    const handleBuyNow = (product) => {
        navigate("/checkout", { state: { product } });
    };

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Box sx={{ mb: 3 }}>
                <FormControl fullWidth>
                    <InputLabel id="category-select-label">Select Category</InputLabel>
                    <Select
                        labelId="category-select-label"
                        value={selectedCategory}
                        label="Select Category"
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <MenuItem value="all">All</MenuItem>
                        {categories.map((cat) => (
                            <MenuItem key={cat} value={cat} sx={{ textTransform: "capitalize" }}>
                                {cat}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
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
