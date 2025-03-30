import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ThemeContextProvider from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import { Box } from "@mui/material";

const App = () => {
  return (
    <ThemeContextProvider>
      <Router>
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          <Navbar />
          {/* Main content area takes available space */}
          <Box sx={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Router>
    </ThemeContextProvider>
  );
};

export default App;
