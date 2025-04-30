import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Product_Page.css";
import axios from "axios";


function Product_Page() 
{
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  
  useEffect(() => {
    axios.get(`http://localhost:8000/product/${id}`).then(response => {setProduct(response.data);})
        .catch (error => {console.error("Error fetching product:", error);
        });
  }, [id]);

  if (!product) {return <div>Loading...</div>;}

  return (
    <div className="product-page">
      <div className="product-image-container">
        <img src={product.Image_URL} alt={product.Name} className="product-image" />
      </div>
      <div className="product-details">
        <h1>{product.Name}</h1>
        <p className="price">${product.Price.toFixed(2)}</p>
        <p className="description">{product.Description}</p>
        <button
          className="add-to-cart-button"
          onClick={async () => {
            const userId = localStorage.getItem("user_id");
            if (!userId) {
              alert("Please log in to add to cart.");
              return;
            }
            try {
              const res = await fetch("http://localhost:8000/cart/add", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  user_id: userId,
                  product_id: product.id,
                  quantity: 1,
                }),
              });
              if (!res.ok) throw new Error("Failed to add to cart");
              alert("Added to cart!");
            } catch (err) {
              alert("Error adding to cart.");
            }
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );  
}

export default Product_Page;
