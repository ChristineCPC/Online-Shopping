import React from "react";
import { Link } from "react-router-dom";
import "./Product_Card.css";

function Product_Card({id, name, price, image_URL}) 
{

    const handleAddToCart = async () => 
    {
        e.stopPropagation();
        const userId = localStorage.getItem("user_id"); // ensure this is set on login
    
        if (!userId) {
          alert("You must be logged in to add items to your cart.");
          return;
        }
    
        try {
          const response = await fetch("http://localhost:8000/cart/add", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_id: userId,
              product_id: id,
              quantity: 1,
            }),
          });
    
          if (!response.ok) {
            throw new Error("Failed to add item to cart.");
          }
    
          alert(`${name} added to cart!`);
        } catch (err) {
          console.error(err);
          alert("Error adding item to cart.");
        }
  };

    return (
        <div className="product-card">
            <Link to={`/product/${id}`} className="product-link">
                <div className="product-info">
                    <img src={image_URL} alt={name} className="product-image" />
                    <p className="product-name">{name}</p>
                    <p className="product-price">${price.toFixed(2)}</p>
                    <button className="add-to-cart-button" onClick={handleAddToCart}>Add to Cart</button>
                </div>
            </Link>
        </div>
    );
}

export default Product_Card;
