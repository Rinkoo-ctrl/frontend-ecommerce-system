import React from "react";

const CartItem = ({ item, removeFromCart }) => {
    return (
        <div>
            <p>{item.title} - ₹{item.price}</p>
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
    );
};

export default CartItem;
