import React from "react";
import {Link} from "react-router-dom";
import "./Navbar.css";

function Navbar() 
{

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
      <div className="navbar-search">
        <input type="text" placeholder="Search products..." />
        <button>🔍</button>
      </div>

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
                  <Link to="/login" onClick={handleSignOut}>Sign Out</Link>
              </div>
            </>
          ) : (
            <Link to="/login">
              <div className="nav-option">
                <span className="line-one">Hello, Sign in</span>
                <span className="line-two">Account & Settings ⛛</span>
                <div className="account-dropdown">
                  <Link to="/login">Your Account</Link>
                  <Link to="/settings">Settings</Link>
                </div>
              </div>
            </Link>
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
