import React from "react";
import { useEffect, useState } from "react";
import "./Home.css";
import Product_Card from "./Product_Card";
import axios from "axios";

function Home() {
    const [product, setProduct] = useState([]);
    const[loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("http://localhost:8000/product")
            .then(response => {
                setProduct(response.data);
                setLoading(false);
            })
            .catch (error => {
                console.error("Error fetching products:", error);
                setLoading(false);
            });
    }, []);

    
    if (loading) {
        return <div className="loading">Loading products...</div>;
    }

    return (
        <div className="home">
            <h1>Featured Products</h1>
            <div className="product-grid">
                {product.map((product) => (
                    <Product_Card 
                        key = {product.Product_ID}
                        id = {product.Product_ID}
                        name = {product.Name}
                        price = {product.Price}
                        image_URL = {product.Image_URL}
                    /> 
            ))}
            </div>
        </div>
    );
}

export default Home;
