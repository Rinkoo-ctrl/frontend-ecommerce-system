import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Paper, Box, Snackbar, Alert } from "@mui/material";

const Signup = () => {
    const [user, setUser] = useState({ name: "", email: "", password: "" });
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSignup = (e) => {
        e.preventDefault();

        if (!user.name || !user.email || !user.password) {
            setSnackbar({ open: true, message: "All fields are required!", severity: "warning" });
            return;
        }

        const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
        if (existingUsers.some((u) => u.email === user.email)) {
            setSnackbar({ open: true, message: "User already exists! Please log in.", severity: "error" });
            return;
        }

        localStorage.setItem("users", JSON.stringify([...existingUsers, user]));
        setSnackbar({ open: true, message: "Signup successful! Redirecting to login...", severity: "success" });

        // Redirect to login page after 1.5 seconds
        setTimeout(() => navigate("/login"), 1500);
    };

    return (
        <Container maxWidth="xs">
            <Paper sx={{ p: 4, mt: 5, textAlign: "center" }}>
                <Typography variant="h5" sx={{ mb: 2 }}>Signup</Typography>
                <Box component="form" onSubmit={handleSignup}>
                    <TextField fullWidth label="Name" name="name" onChange={handleChange} sx={{ mb: 2 }} required />
                    <TextField fullWidth label="Email" name="email" type="email" onChange={handleChange} sx={{ mb: 2 }} required />
                    <TextField fullWidth label="Password" name="password" type="password" onChange={handleChange} sx={{ mb: 2 }} required />
                    <Button type="submit" variant="contained" color="primary" fullWidth>Signup</Button>
                </Box>
                <Typography variant="body2" sx={{ mt: 2 }}>
                    Already have an account? <a href="/login">Login</a>
                </Typography>

                {/* Snackbar for notifications (Top-Right Position) */}
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

export default Signup;
