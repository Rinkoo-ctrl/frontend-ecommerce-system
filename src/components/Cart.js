import React from "react";
import CartItem from "./CartItem";

const Cart = ({ cart, removeFromCart }) => {
  const total = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div>
      <h2>Cart</h2>
      {cart.length === 0 ? <p>Cart is empty</p> : 
        cart.map((item) => <CartItem key={item.id} item={item} removeFromCart={removeFromCart} />)}
      <h3>Total: ₹{total.toFixed(2)}</h3>
    </div>
  );
};

export default Cart;
