import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    Container,
    Typography,
    Card,
    CardMedia,
    CircularProgress,
    Box,
    Rating,
    Button
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";

const ProductDetailPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setProduct(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <Container sx={{ mt: 4, textAlign: "center" }}>
                <CircularProgress />
            </Container>
        );
    }

    if (!product) {
        return (
            <Typography variant="h6" color="error" sx={{ mt: 4, textAlign: "center" }}>
                Product not found.
            </Typography>
        );
    }

    // Wrap handlers in arrow functions so that product is passed explicitly
    const handleBuyNow = (product) => {
        navigate("/checkout", { state: { product } });
    };

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Card sx={{ maxWidth: 900, margin: "auto", boxShadow: 3, p: 2 }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        gap: 2,
                    }}
                >
                    {/* Left Side: Product Image */}
                    <Box
                        sx={{
                            flex: 1,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            p: 2,
                            borderRight: { md: "1px solid #eee" },
                            borderBottom: { xs: "1px solid #eee", md: "none" },
                        }}
                    >
                        <CardMedia
                            component="img"
                            image={product.image}
                            alt={product.title}
                            sx={{
                                maxHeight: { xs: 200, md: 250 },
                                width: "auto",
                                objectFit: "contain",
                            }}
                        />
                    </Box>
                    {/* Right Side: Product Details */}
                    <Box sx={{ flex: 2, p: 2 }}>
                        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
                            {product.title}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            {product.category}
                        </Typography>

                        {/* Rating & Review Count */}
                        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                            <Rating value={product.rating?.rate} precision={0.1} readOnly />
                            <Typography variant="body2" sx={{ ml: 1 }}>
                                ({product.rating?.count} reviews)
                            </Typography>
                        </Box>

                        <Typography variant="body1" sx={{ mt: 2 }}>
                            {product.description}
                        </Typography>
                        <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold", color: "green" }}>
                            ₹{product.price}
                        </Typography>

                        {/* Buttons: Add to Cart and Buy Now */}
                        <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ flex: 1 }}
                                onClick={() => handleAddToCart(product)}
                            >
                                Add to Cart
                            </Button>
                            <Button
                                variant="outlined"
                                color="secondary"
                                sx={{ flex: 1 }}
                                onClick={() => handleBuyNow(product)}
                            >
                                Buy Now
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Card>
        </Container>
    );
};

export default ProductDetailPage;
