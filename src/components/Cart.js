import React from "react";
import { List, ListItem, ListItemText, Button, Typography, Paper } from "@mui/material";

const Cart = ({ cart, removeFromCart }) => {
    const total = cart.reduce((acc, item) => acc + item.price, 0);

    return (
        <Paper sx={{ p: 2, mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                🛒 Cart
            </Typography>
            {cart.length === 0 ? (
                <Typography color="text.secondary">Cart is empty</Typography>
            ) : (
                <List>
                    {cart.map((item) => (
                        <ListItem key={item.id} divider>
                            <ListItemText primary={item.title} secondary={`₹${item.price}`} />
                            <Button variant="outlined" color="error" onClick={() => removeFromCart(item.id)}>
                                Remove
                            </Button>
                        </ListItem>
                    ))}
                </List>
            )}
            <Typography variant="h5" sx={{ mt: 2 }}>
                Total: ₹{total.toFixed(2)}
            </Typography>
        </Paper>
    );
};

export default Cart;
