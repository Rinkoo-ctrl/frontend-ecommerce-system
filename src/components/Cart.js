import React from "react";
import CartItem from "./CartItem.js";

const Cart = ({ cart, removeFromCart }) => {
    const total = cart.reduce((acc, item) => acc + item.price, 0);

    return (
        <div className="cart">
            <h2>Shopping Cart</h2>
            {cart.length === 0 ? <p>Cart is empty</p> :
                cart.map((item) => <CartItem key={item.id} item={item} removeFromCart={removeFromCart} />)}
            <h3 className="cart-total">Total: ₹{total}</h3>
        </div>

    );
};

export default Cart;
