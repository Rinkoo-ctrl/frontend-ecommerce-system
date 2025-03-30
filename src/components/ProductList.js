import React from "react";
import Product from "./Product";
import { Grid, Box } from "@mui/material";

const ProductList = ({ products, addToCart, buyNow }) => {
    return (
        <Box sx={{ mt: 4 }}>
            {/* <Typography variant="h4" gutterBottom align="center">
        Products
      </Typography> */}
            <Grid container spacing={9} justifyContent="center">
                {products.map((product) => (
                    <Grid item key={product.id}>
                        <Product product={product} addToCart={addToCart} buyNow={buyNow} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default ProductList;
