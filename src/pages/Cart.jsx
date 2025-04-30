import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Cart.css'

function Cart() {
  const cartId = localStorage.getItem("cart_id") || 1; // Replace with dynamic cart ID later
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

    async function fetchCart() 
    {
        try 
        {
            const response = await axios.get(`http://localhost:8000/cart/${cartId}`);
            const items = response.data.cart_items;
            setCartItems(items);
            calculateTotal(items);
        } catch (error) {
        console.error("Error fetching cart:", error);
        }
    }

  function calculateTotal(items) 
  {
    const totalPrice = items.reduce((acc, item) => acc + item.total, 0);
    setTotal(totalPrice);
  }

  async function handleRemove(itemId) 
  {
    try 
    {
      await axios.delete(`http://localhost:8000/cart/${cartId}/${itemId}`);
      fetchCart(); // Refresh cart after removal
    } catch (error) {
      console.error("Error removing item:", error);
    }
  }

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.item_id} className="cart-item">
              <p><strong>{item.product_name}</strong></p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.price.toFixed(2)}</p>
              <p>Item Total: ${item.total.toFixed(2)}</p>
              <button onClick={() => handleRemove(item.item_id)}>Remove</button>
            </div>
          ))}
          <h3>Total: ${total.toFixed(2)}</h3>
          <button onClick={() => navigate("/checkout")}>Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
}

export default Cart;
