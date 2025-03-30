import React from "react";
import { List, ListItem, Typography, Paper, Box, IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { removeFromCart, decreaseQuantity, addToCart } from "../redux/cartSlice";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const Cart = ({ cart }) => {
  const dispatch = useDispatch();
  const total = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);

  return (
    <Paper
      sx={{
        p: 3,
        mt: 4,
        borderRadius: 2,
        boxShadow: 3,
        maxWidth: "800px",
        margin: "auto",
        width: "100%",
      }}
    >
      <Typography variant="h4" gutterBottom align="center">
        🛒 Your Cart
      </Typography>
      {cart.length === 0 ? (
        <Typography variant="body1" align="center" color="text.secondary">
          Your cart is empty.
        </Typography>
      ) : (
        <List>
          {cart.map((item) => (
            <ListItem
              key={item.id}
              divider
              sx={{
                py: 2,
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "center", sm: "flex-start" },
                textAlign: { xs: "center", sm: "left" },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Box sx={{ mr: { xs: 0, sm: 2 }, mb: { xs: 1, sm: 0 } }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ width: "80px", height: "80px", objectFit: "contain" }}
                  />
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1" noWrap>
                    {item.title.length > 30 ? `${item.title.substring(0, 30)}...` : item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Price: ₹{item.price} x {item.quantity} = ₹
                    {(item.price * item.quantity).toFixed(2)}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mt: { xs: 2, sm: 0 },
                    flexDirection: { xs: "row", sm: "row" },
                  }}
                >
                  <IconButton onClick={() => dispatch(decreaseQuantity(item.id))} size="small">
                    <RemoveIcon />
                  </IconButton>
                  <Typography variant="body1" sx={{ mx: 1 }}>
                    {item.quantity}
                  </Typography>
                  <IconButton onClick={() => dispatch(addToCart(item))} size="small">
                    <AddIcon />
                  </IconButton>
                  <IconButton onClick={() => dispatch(removeFromCart(item.id))} size="small" color="error">
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            </ListItem>
          ))}
        </List>
      )}
      <Box sx={{ mt: 3, textAlign: "right" }}>
        <Typography variant="h6">Total: ₹{total.toFixed(2)}</Typography>
      </Box>
    </Paper>
  );
};

export default Cart;
