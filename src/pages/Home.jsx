import React from "react";
import "./Home.css";
import Product_Card from "./Product_Card";

function Home() {
    const products = [
        {
            id: 1,
            title: "Wireless Mouse",
            price: 29.99,
            img: "https://via.placeholder.com/200x150?text=Mouse"
        },
        {
            id: 2,
            title: "Bluetooth Headphones",
            price: 59.99,
            img: "https://via.placeholder.com/200x150?text=Headphones"
        },
        {
            id: 3,
            title: "Laptop Stand",
            price: 22.49,
            img: "https://via.placeholder.com/200x150?text=Stand"
        },
        {
            id: 4,
            title: "Mechanical Keyboard",
            price: 89.99,
            img: "https://via.placeholder.com/200x150?text=Keyboard"
        },
        {
            id: 5,
            title: "Smart Watch",
            price: 129.99,
            img: "https://via.placeholder.com/200x150?text=Smart+Watch"
        },
        {
            id: 6,
            title: "External Hard Drive",
            price: 74.99,
            img: "https://via.placeholder.com/200x150?text=Hard+Drive"
        }
    ];

    return (
        <div className="home">
            <div className="home-hero">
                <img
                    className="home-hero-image"
                    src="https://m.media-amazon.com/images/I/61gokz+1KqL._SX3000_.jpg"
                    alt="Banner"
                />
            </div>

            <h2 className="home-section-title">Recommended Products</h2>
            <div className="home-product-grid">
                {products.map((item) => (
                    <Product_Card
                        key={item.id}
                        title={item.title}
                        price={item.price}
                        img={item.img}
                    />
                ))}
            </div>
        </div>
    );
}

export default Home;
