import React from "react";
import { Card, CardMedia, CardContent, Typography, Button, Box } from "@mui/material";

const Product = ({ product, addToCart }) => {
    return (
        <Card sx={{ width: 280, height: 420, display: "flex", flexDirection: "column", justifyContent: "space-between", boxShadow: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 220, bgcolor: "#fff" }}>
                <CardMedia component="img" image={product.image} alt={product.title} sx={{ width: 200, height: 200, objectFit: "contain" }} />
            </Box>
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" sx={{ fontSize: "16px", fontWeight: "bold", height: "40px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {product.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.category}
                </Typography>
                <Typography variant="h6" color="primary">
                    ₹{product.price}
                </Typography>
            </CardContent>
            <Button variant="contained" color="primary" sx={{ width: "100%", borderRadius: 0 }} onClick={() => addToCart(product)}>
                Add to Cart
            </Button>
        </Card>
    );
};

export default Product;
