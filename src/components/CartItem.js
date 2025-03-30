import React from "react";

const CartItem = ({ item, removeFromCart }) => {
    return (
        <div className="cart-item">
            <p>{item.name} - ₹{item.price}</p>
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
    );
};

export default CartItem;
