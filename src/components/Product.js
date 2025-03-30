import React from "react";

const Product = ({ product, addToCart }) => {
    return (
        <div style={{ border: "1px solid #ccc", padding: "10px", width: "250px", textAlign: "center" }}>
            <img src={product.image} alt={product.title} style={{ width: "100px", height: "100px" }} />
            <h3>{product.title}</h3>
            <p>Price: ₹{product.price}</p>
            <p>{product.category}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
    );
};

export default Product;
