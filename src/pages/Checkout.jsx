import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Checkout.css";

function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [shippingAddress, setShippingAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = async () => {
    if (!shippingAddress.trim()) {
      alert("Please enter a shipping address.");
      return;
    }

    const userID = localStorage.getItem("userID"); // You should store this after login/register

    if (!userID) {
      alert("You must be logged in to place an order.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/checkout", {
        user_id: userID,
        shipping_address: shippingAddress,
        cart_items: cartItems,
      });

      alert("Order placed successfully!");
      localStorage.removeItem("cart");
      navigate("/orders");
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="checkout-content">
        <div className="checkout-summary">
          <h3>Order Summary</h3>
          {cartItems.map((item) => (
            <div key={item.id} className="checkout-item">
              <p>{item.name} (x{item.quantity}) - ${item.price.toFixed(2)}</p>
            </div>
          ))}
          <p className="checkout-total">Total: ${totalAmount.toFixed(2)}</p>
        </div>

        <div className="checkout-form">
          <h3>Shipping Address</h3>
          <textarea
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            placeholder="Enter your shipping address"
            rows={4}
          />
          <button onClick={handlePlaceOrder} disabled={loading}>
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
