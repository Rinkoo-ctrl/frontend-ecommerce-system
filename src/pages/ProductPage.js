import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductList from "../components/ProductList";
import {
    Container,
    CircularProgress,
    Typography,
    Box,
    FormControl,
    Select,
    MenuItem,
    TextField,
    Paper,
    InputAdornment,
    IconButton,
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true); // loading state
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Fetch all categories on mount
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

    // Filter products based on search term
    useEffect(() => {
        const filtered = products.filter((product) =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setDisplayedProducts(filtered);
    }, [searchTerm, products]);

    const handleBuyNow = (product) => {
        navigate("/checkout", { state: { product: { ...product, quantity: 1 } } });
    };

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };
    const handleClearSearch = () => {
        setSearchTerm("");
    };
    return (
        <Container sx={{ mt: 4 }}>
            {/* Search and Category Selector */}
            <Paper
                elevation={1}
                sx={{
                    p: 2,
                    mb: 3,
                    borderRadius: 1,
                    border: '1px solid #e0e0e0',
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        gap: 2,
                    }}
                >
                    <TextField
                        fullWidth
                        label="Search"
                        variant="outlined"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        size="small"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    {searchTerm && (
                                        <IconButton onClick={handleClearSearch} edge="end" size="small">
                                            <ClearIcon />
                                        </IconButton>
                                    )}
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            "& .MuiInputBase-input": { fontSize: '0.9rem' },
                        }}
                    />
                    <FormControl fullWidth size="small">
                        <Select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            displayEmpty
                            sx={{
                                "& .MuiSelect-select": {
                                    fontSize: '0.9rem',
                                    textTransform: "capitalize",
                                },
                            }}
                        >
                            <MenuItem value="all" sx={{ fontSize: '0.9rem', textTransform: "capitalize" }}>All</MenuItem>
                            {categories.map((cat) => (
                                <MenuItem key={cat} value={cat} sx={{ fontSize: '0.9rem', textTransform: "capitalize" }}>
                                    {cat}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </Paper>

            {/* Product List */}
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
                <ProductList products={displayedProducts} addToCart={handleAddToCart} buyNow={handleBuyNow} />
            )}
        </Container>
    );
};

export default ProductPage;
