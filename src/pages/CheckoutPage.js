import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
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
    Grid,
} from "@mui/material";
import { clearCart } from "../redux/cartSlice";
import sendEmail from "../utils/sendEmail";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
    const location = useLocation();
    const selectedProduct = location.state?.product; // Get product from "Buy Now"
    const cart = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Check if coming from "Buy Now"
    const checkoutItems = selectedProduct ? [selectedProduct] : cart;

    const total = checkoutItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);

    const [shippingInfo, setShippingInfo] = useState({
        name: "",
        email: "",
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
        if (!shippingInfo.email) {
            alert("Please enter your email.");
            return;
        }

        sendEmail(shippingInfo, checkoutItems);
        alert("Order placed successfully!");

        if (!selectedProduct) {
            dispatch(clearCart()); // Only clear cart if coming from cart
        }
        navigate("/");
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Paper sx={{ p: 4, maxWidth: "800px", margin: "auto", borderRadius: 3, boxShadow: 3 }}>
                <Typography variant="h4" align="center" sx={{ mb: 3, fontWeight: "bold", color: "#1976d2" }}>
                    Checkout
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" sx={{ fontWeight: "600" }}>
                            Order Summary:
                        </Typography>
                        <List>
                            {checkoutItems.map((item) => (
                                <ListItem key={item.id} sx={{ py: 1 }}>
                                    <ListItemText
                                        primary={<Typography variant="body1">{`${item.title} x ${item.quantity || 1}`}</Typography>}
                                        secondary={`Price: ₹${item.price.toFixed(2)} | Subtotal: ₹${(item.price * (item.quantity || 1)).toFixed(2)}`}
                                    />
                                </ListItem>
                            ))}
                        </List>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                            <Typography variant="h6" sx={{ fontWeight: "600" }}>
                                Total: ₹{total.toFixed(2)}
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Box component="form" onSubmit={handlePlaceOrder}>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: "600" }}>
                                Shipping Information
                            </Typography>
                            {["name", "email", "address", "city", "zip", "country"].map((field) => (
                                <TextField
                                    key={field}
                                    fullWidth
                                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                                    name={field}
                                    value={shippingInfo[field]}
                                    onChange={handleChange}
                                    sx={{ mt: 1, mb: 1 }}
                                    required
                                    variant="outlined"
                                    size="small"
                                />
                            ))}
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                                <Button variant="contained" color="primary" type="submit" sx={{ px: 2, py: 1 }}>
                                    Place Order
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default CheckoutPage;
