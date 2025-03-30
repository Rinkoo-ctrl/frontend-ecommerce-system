import React from "react";
import { Card, CardMedia, CardContent, Typography, Box, CardActions } from "@mui/material";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

const StyledButton = styled(Button)(({ theme }) => ({
  fontWeight: "600",
  borderRadius: "25px",
  padding: "8px 18px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
  transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
  },
}));

const Product = ({ product, addToCart, buyNow = () => {} }) => {
  return (
    <Card
      sx={{
        width: { xs: "100%", sm: 280 }, // full width on mobile, fixed width on larger screens
        height: { xs: "auto", sm: 420 },
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: 3,
        m: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: { xs: 200, sm: 220 },
          bgcolor: "#fff",
          p: 2,
        }}
      >
        <CardMedia
          component="img"
          image={product.image}
          alt={product.title}
          sx={{
            width: { xs: "150px", sm: "200px" },
            height: { xs: "150px", sm: "200px" },
            objectFit: "contain",
          }}
        />
      </Box>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="h6"
          sx={{
            fontSize: "16px",
            fontWeight: "bold",
            height: "40px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.category}
        </Typography>
        <Typography variant="h6" color="primary">
          ₹{product.price}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between", p: 1 }}>
        <StyledButton variant="contained" color="primary" onClick={() => addToCart(product)}>
          Add to Cart
        </StyledButton>
        <StyledButton variant="outlined" color="secondary" onClick={() => buyNow(product)}>
          Buy Now
        </StyledButton>
      </CardActions>
    </Card>
  );
};

export default Product;
