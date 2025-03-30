import React from "react";
import { Grid, Container } from "@mui/material";
import Product from "./Product";

const ProductList = ({ products, addToCart, buyNow }) => {
  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={3} justifyContent="center">
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Product product={product} addToCart={addToCart} buyNow={buyNow} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductList;
