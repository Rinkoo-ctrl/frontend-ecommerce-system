import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ThemeContextProvider from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";

const App = () => {
  return (
    <ThemeContextProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Router>
    </ThemeContextProvider>
  );
};

export default App;
