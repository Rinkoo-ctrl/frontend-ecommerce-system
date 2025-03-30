import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <AppBar position="static">
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
        <Button color="inherit">
          <Link to="/cart" style={{ textDecoration: "none", color: "inherit" }}>
            Cart
          </Link>
        </Button>
        <IconButton color="inherit" onClick={toggleDarkMode}>
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
