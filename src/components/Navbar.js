import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { AppBar, Toolbar, IconButton, Typography, Button, Badge } from "@mui/material";
import { Link } from "react-router-dom";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Navbar = () => {
    const { darkMode, toggleDarkMode } = useContext(ThemeContext);
    const cartItemCount = 0; // Replace with your cart item count logic

    return (
        <AppBar
            position="static"
            style={{
                backgroundColor: darkMode ? "#2F4F4F" : "#1976d2",// Change color based on darkMode
            }}
        >
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                        🛍️ E-commerce Store
                    </Link>
                </Typography>
                <Button color="inherit">
                    <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                        Products
                    </Link>
                </Button>
                <IconButton color="inherit" component={Link} to="/cart">
                    <Badge badgeContent={cartItemCount} color="error">
                        <ShoppingCartIcon />
                    </Badge>
                </IconButton>
                <IconButton color="inherit" onClick={toggleDarkMode}>
                    {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;