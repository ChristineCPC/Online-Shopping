import React from "react";
import { Link } from "react-router-dom";
import "./Product_Card.css";

function Product_Card({id, name, price, image_URL}) 
{
    return (
        <div className="product-card">
            <Link to={'/product/${id}'} className="product-link">
                <div className="product-info">
                    <img src={image_URL} alt={name} className="product-image" />
                    <p className="product-name">{name}</p>
                    <p className="product-price">${price.toFixed(2)}</p>
                    <button className="add-to-cart-button">Add to Cart</button>
                </div>
            </Link>
        </div>
    );
}

export default Product_Card;
