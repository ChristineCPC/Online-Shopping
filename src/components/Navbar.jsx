import React from "react";
import {Link} from "react-router-dom";
import "./Navbar.css";
import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";


function Navbar() 
{

  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  useEffect(() => 
  {
    async function fetchCategories() 
    {
      try 
      {
        const response = await axios.get('http://localhost:8000/categories');
        setCategories(response.data);
      } catch (error) 
      {
        console.error('Error fetching categories:', error);
      }
    }
    fetchCategories();
  }, []);

  const handleSearch = async (e) => 
  {
    e.preventDefault();
    let searchURL = `/search-results?q=${encodeURIComponent(searchQuery)}`;
    if (selectedCategory) 
    {
      searchURL += `&category=${encodeURIComponent(selectedCategory)}`;
    }
    navigate(searchURL);
  };

  const handleSignOut = () =>
  {
      localStorage.removeItem('user');  // Clear user data
      navigate('/login');              // Redirect to login page
  };

  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <nav className="navbar">
      {/* Left: Logo */}
      <div className="navbar-logo">
        <Link to="/">Generic<span>Store</span></Link>
      </div>

      {/* Center: Search Bar */}
      <form className="navbar-search" onSubmit={handleSearch}>
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        <input type="text" placeholder="Search products..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
        <button type="submit">🔍</button>
      </form>

      {/* Right: Navigation Links */}
      <div className="navbar-links">
        <div className="nav-account">
          {user ? (
            <>
              <span>Welcome, {user.message.split(",")[1].split("!")[0]}</span>
              <span className="line-two">Account & Settings ⛛</span>
              <div className="account-dropdown">
                  <Link to="/account">Your Account</Link>
                  <Link to="/orders">Orders</Link>
                  <Link to="/settings">Settings</Link>
                  <button onClick={handleSignOut} className="signout-button">Sign Out</button>
              </div>
            </>
          ) : (
            <div className="nav-option">
              <Link to="/login">
              <span className="line-one">Hello, Sign in</span>
              <span className="line-two">Account & Settings ⛛</span>
              </Link>
             
              <div className="account-dropdown">
                <Link to="/login">Your Account</Link>
                <Link to="/settings">Settings</Link>
              </div>
            </div>
          )}
        </div>
        <Link to="/orders">
          <div className="nav-option">
            <span className="line-one">Shipments</span>
            <span className="line-two">& Orders</span>
          </div>
        </Link>
        <Link to="/cart">
          <div className="nav-cart">
            🛒
            <span className="cart-count">0</span>
          </div>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
