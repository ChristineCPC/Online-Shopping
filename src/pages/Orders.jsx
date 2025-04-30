import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import './Orders.css';

function Orders() {
  const [orders, setOrders] = useState([]);
  const userId = 1; // Replace with actual logged-in user ID

  useEffect(() => {
    axios.get(`http://localhost:8000/orders/${userId}`)
      .then((response) => setOrders(response.data.orders))
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  return (
    <div className="order-history">
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul className="order-list">
          {orders.map((o) => (
            <li key={o.order_id} className="order-item">
              <div>
                <strong>Order #{o.order_id}</strong> — {o.date_placed}
              </div>
              <div>Total: ${o.total.toFixed(2)}</div>
              <div>Status: {o.status}</div>
              <Link to={`/orders/${o.order_id}`}>View Details</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Orders;
