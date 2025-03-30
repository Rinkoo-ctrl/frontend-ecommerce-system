import React from "react";
import Product from "./Product";
import { Grid, Typography, Box } from "@mui/material";

const ProductList = ({ products, addToCart }) => {
    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom align="center">
                Products
            </Typography>
            <Grid container spacing={4} justifyContent="center">
                {products.map((product) => (
                    <Grid item key={product.id}>
                        <Product product={product} addToCart={addToCart} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default ProductList;
