import React from "react";
import {Link} from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      {/* Left: Logo */}
      <div className="navbar-logo">
        <Link to="/">Generic<span>Store</span></Link>
      </div>

      {/* Center: Search Bar */}
      <div className="navbar-search">
        <input type="text" placeholder="Search products..." />
        <button>🔍</button>
      </div>

      {/* Right: Navigation Links */}
      <div className="navbar-links">
        <Link to="/login">
          <div className="nav-account">
            <span>Hello, Sign in</span>
            <span className="line-two">Account & Settings ⛛</span>
            <div className="account-dropdown">
                <a href="#">Your Account</a>
                <a href="#">Orders</a>
                <a href="#">Settings</a>
                <a href="#">Sign Out</a>
            </div>
          </div>
        </Link>
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
