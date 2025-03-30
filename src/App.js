import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to load products.");
        setLoading(false);
      });
  }, []);

  // 🛒 Cart me add karna
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  // 🗑 Cart se remove karna
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <div>
      <h1>E-commerce Store</h1>
      {loading && <p>Loading products...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && <ProductList products={products} addToCart={addToCart} />}
      <Cart cart={cart} removeFromCart={removeFromCart} />
    </div>
  );
};

export default App;
