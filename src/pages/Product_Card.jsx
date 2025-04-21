import React from "react";
import "./Product_Card.css";

function Product_Card({ title, price, img }) 
{
    return (
        <div className="product-card">
            <img src={img} alt={title} />
            <div className="product-info">
                <p>{title}</p>
                <strong>${price.toFixed(2)}</strong>
                <button>Add to Cart</button>
            </div>
        </div>
    );
}

export default Product_Card;
