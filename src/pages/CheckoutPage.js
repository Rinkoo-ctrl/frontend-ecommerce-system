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
    Snackbar,
    Alert
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

    const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar state
    const [snackbarMessage, setSnackbarMessage] = useState(""); // Snackbar message


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
        // alert("Order placed successfully!");
        setSnackbarMessage("Order placed successfully! Email sent."); // Message to show
        setOpenSnackbar(true);

        if (!selectedProduct) {
            dispatch(clearCart()); // Only clear cart if coming from cart
        }

        setTimeout(() => {
            navigate("/dashboard");
        }, 3000); // Redirect to home after 3 seconds
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
                            {checkoutItems.map((item) => (
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
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: "100%" }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default CheckoutPage;