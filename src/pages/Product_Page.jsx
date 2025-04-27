import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./Product_Page.css";
import axios from "axios";


function Product_Page() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  
  useEffect(() => {
    axios.get("http://localhost:8000/product/${id}").then(response => {setProduct(response.data);})
        .catch (error => {console.error("Error fetching product:", error);
        });
  }, [id]);

  if (!product) {return <div>Loading...</div>;}

  return (
    <div className="product-page">
      <img src = {product.image} alt={product.name} />
      <h1>{product.name}</h1>
      <p>${product.price.toFixed(2)}</p>
      <p>{product.description}</p>
      {/* Later we'll add sizes, colors, add to cart here */}
    </div>
  );
}

export default Product_Page;
