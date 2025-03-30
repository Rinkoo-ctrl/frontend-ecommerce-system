import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    Container,
    Typography,
    Box,
    TextField,
    Button,
    Paper,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/cartSlice";

const CheckoutPage = () => {
    // Get cart items from Redux
    const cart = useSelector((state) => state.cart.items);
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // State for shipping information
    const [shippingInfo, setShippingInfo] = useState({
        name: "",
        address: "",
        city: "",
        zip: "",
        country: "",
    });

    const handleChange = (e) => {
        setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
    };

    const handlePlaceOrder = (e) => {
        e.preventDefault();
        // In a real app, process payment and order creation here.
        alert("Order placed successfully!");
        dispatch(clearCart());
        navigate("/");
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Paper sx={{ p: 3, maxWidth: "800px", margin: "auto" }}>
                <Typography variant="h4" gutterBottom align="center">
                    Checkout
                </Typography>

                <Typography variant="h6" gutterBottom>
                    Order Summary:
                </Typography>
                <List>
                    {cart.map((item) => (
                        <ListItem key={item.id}>
                            <ListItemText
                                primary={`${item.title} x ${item.quantity}`}
                                secondary={`Price: ₹${item.price} | Subtotal: ₹${(item.price * item.quantity).toFixed(2)}`}
                            />
                        </ListItem>
                    ))}
                </List>
                <Typography variant="h6" align="right">
                    Total: ₹{total.toFixed(2)}
                </Typography>

                <Box component="form" sx={{ mt: 3 }} onSubmit={handlePlaceOrder}>
                    <Typography variant="h6" gutterBottom>
                        Shipping Information
                    </Typography>
                    <TextField
                        fullWidth
                        label="Name"
                        name="name"
                        value={shippingInfo.name}
                        onChange={handleChange}
                        sx={{ mt: 2 }}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Address"
                        name="address"
                        value={shippingInfo.address}
                        onChange={handleChange}
                        sx={{ mt: 2 }}
                        required
                    />
                    <TextField
                        fullWidth
                        label="City"
                        name="city"
                        value={shippingInfo.city}
                        onChange={handleChange}
                        sx={{ mt: 2 }}
                        required
                    />
                    <TextField
                        fullWidth
                        label="ZIP Code"
                        name="zip"
                        value={shippingInfo.zip}
                        onChange={handleChange}
                        sx={{ mt: 2 }}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Country"
                        name="country"
                        value={shippingInfo.country}
                        onChange={handleChange}
                        sx={{ mt: 2 }}
                        required
                    />
                    <Button variant="contained" color="primary" fullWidth sx={{ mt: 3 }} type="submit">
                        Place Order
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default CheckoutPage;
