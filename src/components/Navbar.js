import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { ThemeContext } from "../context/ThemeContext";
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
    Badge,
    Menu,
    MenuItem,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
    const { darkMode, toggleDarkMode } = useContext(ThemeContext);
    // Get cart items from Redux store
    const cartItems = useSelector((state) => state.cart.items);
    const cartCount = cartItems.length;

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    // State for mobile menu
    const [anchorEl, setAnchorEl] = useState(null);
    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    return (
        <AppBar
            position="static"
            style={{ backgroundColor: darkMode ? "#2F4F4F" : "#1976d2" }}
        >
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                        🛍️ E-commerce Store
                    </Link>
                </Typography>

                {isMobile ? (
                    <>
                        <IconButton color="inherit" onClick={handleMenuOpen}>
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >
                            <MenuItem onClick={handleMenuClose}>
                                <Link
                                    to="/"
                                    style={{ textDecoration: "none", color: "inherit" }}
                                >
                                    Products
                                </Link>
                            </MenuItem>
                            <MenuItem onClick={handleMenuClose}>
                                <Link
                                    to="/cart"
                                    style={{ textDecoration: "none", color: "inherit" }}
                                >
                                    Cart
                                </Link>
                            </MenuItem>
                        </Menu>
                    </>
                ) : (
                    <>
                        <Button
                            color="inherit"
                            sx={{
                                fontWeight: 600, // Use fontWeight 600 for a semi-bold look
                                fontSize: "1.1rem",
                                letterSpacing: "1.2px", // Slightly increased letter spacing
                                textTransform: "uppercase", // Uppercase for a modern feel
                                padding: "12px 24px", // Increased padding for a larger button
                                borderRadius: "25px", // Rounded corners for a softer look
                                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)", // Subtle shadow for depth
                                transition: "all 0.3s ease-in-out", // Smooth transition
                                "&:hover": {
                                    backgroundColor: "rgba(255, 204, 0, 0.1)", // Light yellow background on hover
                                    color: "#ffcc00", // Yellow text on hover
                                    transform: "translateY(-3px)", // Slight lift on hover
                                    boxShadow: "0 6px 14px rgba(0, 0, 0, 0.2)", // Increased shadow on hover
                                },
                                "&:active": {
                                    transform: "translateY(0)", // No lift when active (pressed)
                                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)", // Reduced shadow when active
                                },
                            }}
                        >
                            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                                🏷️ PRODUCTS
                            </Link>
                        </Button>

                        {/* Cart Icon with Quantity Badge */}
                        <IconButton color="inherit" component={Link} to="/cart">
                            <Badge badgeContent={cartCount} color="error">
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>
                    </>
                )}
                <IconButton color="inherit" onClick={toggleDarkMode}>
                    {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
