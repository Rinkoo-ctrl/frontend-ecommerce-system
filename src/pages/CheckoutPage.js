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
    Grid,

} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/cartSlice";
import sendEmail from "../utils/sendEmail";


const CheckoutPage = () => {
    const cart = useSelector((state) => state.cart.items);
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

        sendEmail(shippingInfo, cart); 
        alert("Order placed successfully!");
        dispatch(clearCart());
        navigate("/");
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Paper sx={{ p: 4, maxWidth: "800px", margin: "auto", borderRadius: 3, boxShadow: 3 }}>
                <Typography variant="h4" gutterBottom align="center" sx={{ mb: 3, fontWeight: "bold", color: "#1976d2" }}>
                    Checkout
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} sx={{ width: '100%' }}> {/* Adjusted grid item width */}
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: "600" }}>
                            Order Summary:
                        </Typography>
                        <List>
                            {cart.map((item) => (
                                <ListItem key={item.id} sx={{ py: 1 }}>
                                    <ListItemText
                                        primary={
                                            <Typography variant="body1" sx={{ fontWeight: "500" }}>
                                                {`${item.title} x ${item.quantity}`}
                                            </Typography>
                                        }
                                        secondary={`Price: ₹${item.price.toFixed(2)} | Subtotal: ₹${(item.price * item.quantity).toFixed(2)}`}
                                    />
                                </ListItem>
                            ))}
                        </List>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}> {/* Total in bottom right */}
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
                            <TextField
                                fullWidth
                                label="Name"
                                name="name"
                                value={shippingInfo.name}
                                onChange={handleChange}
                                sx={{ mt: 2, mb: 1 }}
                                required
                                variant="outlined"
                                size="small"
                            />
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                value={shippingInfo.email}
                                onChange={handleChange}
                                sx={{ mt: 1, mb: 1 }}
                                required
                                variant="outlined"
                                size="small"
                            />
                            <TextField
                                fullWidth
                                label="Address"
                                name="address"
                                value={shippingInfo.address}
                                onChange={handleChange}
                                sx={{ mt: 1, mb: 1 }}
                                required
                                variant="outlined"
                                size="small"
                            />
                            <TextField
                                fullWidth
                                label="City"
                                name="city"
                                value={shippingInfo.city}
                                onChange={handleChange}
                                sx={{ mt: 1, mb: 1 }}
                                required
                                variant="outlined"
                                size="small"
                            />
                            <TextField
                                fullWidth
                                label="ZIP Code"
                                name="zip"
                                value={shippingInfo.zip}
                                onChange={handleChange}
                                sx={{ mt: 1, mb: 1 }}
                                required
                                variant="outlined"
                                size="small"
                            />
                            <TextField
                                fullWidth
                                label="Country"
                                name="country"
                                value={shippingInfo.country}
                                onChange={handleChange}
                                sx={{ mt: 1 }}
                                required
                                variant="outlined"
                                size="small"
                            />
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                                <Button variant="contained" color="primary" type="submit" sx={{ px: 2, py: 1, fontSize: '0.9rem' }}>
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