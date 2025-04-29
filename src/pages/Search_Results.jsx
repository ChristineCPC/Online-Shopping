import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Color_Sidebar from "../components/Color_Sidebar";
import Product_Card from "./Product_Card";
import "./Search_Results.css";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Search_Results() {
  const query = useQuery();
  const searchTerm = query.get("q") || "";
  const category = query.get("category") || "";
  const color = query.get("color") || "";
  const navigate = useNavigate();

  const [product, setProduct] = useState([]);
  const [availableColors, setAvailableColors] = useState([]);

  useEffect(() => {
    async function fetchSearchResults() {
      try {
        const response = await axios.get('http://localhost:8000/search', 
        {
          params: {
            q: searchTerm,
            category: category,
            color: color,
          }
        });
        setProduct(response.data);

        const colorsResponse = await axios.get('http://localhost:8000/colors', 
        {
            params: { q: searchTerm, category: category }
        });
        setAvailableColors(colorsResponse.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }

    fetchSearchResults();
  }, [searchTerm, category, color]);


    //if a user selects a color, add it to the url
    const handleColorSelect = (selectedColor) => 
    {
        let newURL = `/search-results?q=${encodeURIComponent(searchTerm)}`;
        if (category) newURL += `&category=${encodeURIComponent(category)}`;
        newURL += `&color=${encodeURIComponent(selectedColor)}`;
        navigate(newURL);
    };

  return (

    <div className="search-results-page">
        <div className="sidebar">
            <Color_Sidebar availableColors={availableColors} onSelectColor={handleColorSelect} />
        </div>
        <div className="search-results">
        <h2>Search Results for "{searchTerm}"</h2>
        {product.length === 0 ? (
            <p>No products found.</p>
        ) : (
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
        )}
        </div>
    </div>
    
  );
}

export default Search_Results;
