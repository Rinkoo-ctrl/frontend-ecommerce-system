import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Paper, Box, Snackbar, Alert } from "@mui/material";

const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleLogin = (e) => {
        e.preventDefault();

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find((u) => u.email === credentials.email && u.password === credentials.password);

        if (user) {
            localStorage.setItem("loggedInUser", JSON.stringify(user));
            setSnackbar({ open: true, message: "Login successful! Redirecting...", severity: "success" });

            // Redirect to dashboard after 1.5 seconds
            setTimeout(() => navigate("/dashboard"), 1500);
        } else {
            setSnackbar({ open: true, message: "Invalid email or password!", severity: "error" });
        }
    };

    return (
        <Container maxWidth="xs">
            <Paper sx={{ p: 4, mt: 5, textAlign: "center" }}>
                <Typography variant="h5" sx={{ mb: 2 }}>Login</Typography>
                <Box component="form" onSubmit={handleLogin}>
                    <TextField fullWidth label="Email" name="email" type="email" onChange={handleChange} sx={{ mb: 2 }} required />
                    <TextField fullWidth label="Password" name="password" type="password" onChange={handleChange} sx={{ mb: 2 }} required />
                    <Button type="submit" variant="contained" color="primary" fullWidth>Login</Button>
                </Box>
                <Typography variant="body2" sx={{ mt: 2 }}>
                    Don't have an account? <a href="/">Signup</a>
                </Typography>

                {/* Snackbar for notifications (Positioned at Top-Right) */}
                <Snackbar 
                    open={snackbar.open} 
                    autoHideDuration={3000} 
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }} // Position at top-right
                >
                    <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: "100%" }}>
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            </Paper>
        </Container>
    );
};

export default Login;
