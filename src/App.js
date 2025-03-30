import React, { useState } from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import products from "./products";
import "./App.css"; 


const App = () => {
  const [cart, setCart] = useState([]);

  // Cart me add karne ka function
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  // Cart se remove karne ka function
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <div>
      <h1>E-commerce Store</h1>
      <ProductList products={products} addToCart={addToCart} />
      <Cart cart={cart} removeFromCart={removeFromCart} />
    </div>
  );
};

export default App;
