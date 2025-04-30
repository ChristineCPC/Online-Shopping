import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './Order_Details.css';

function Order_Details() {
  const { orderId } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/orders/${orderId}/items`)
      .then((res) => setItems(res.data))
      .catch((err) => console.error(err));
  }, [orderId]);

  return (
    <div className="order-details">
      <h2>Order #{orderId} Details</h2>
      {items.length === 0 ? (
        <p>No items found for this order.</p>
      ) : (
        <table className="details-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Qty</th>
              <th>Price Each</th>
              <th>Item Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={idx}>
                <td>{item.Name}</td>
                <td>{item.Quantity}</td>
                <td>${item.Recorded_price.toFixed(2)}</td>
                <td>${item.Item_total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Link to="/orders">← Back to Order History</Link>
    </div>
  );
}

export default Order_Details;
