import { useState } from 'react';
import {BrowserRouter as Router, Routes, Route, useLocation} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Sign_Up from './pages/Sign_Up';
import Navbar from './components/Navbar';
import Search_Results from './pages/Search_Results';
import Orders from './pages/Orders';
import Order_Details from './pages/Order_Details';
import Cart from './pages/Cart';
import Product_Page from './pages/Product_Page';
import Checkout from './pages/Checkout'

function Layout_Wrapper({product, setProduct})
{
  const location = useLocation();
  const hideNavbar = location.pathname === "/login" || location.pathname === "/sign_up";

  return (
    <>
      {!hideNavbar && <Navbar onSearchResults = {setProduct} />}
      <Routes>
        <Route path="/" element={<Home product={product} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign_up" element={<Sign_Up />} />
        <Route path="/search-results" element={<Search_Results product={product} />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:orderId" element={<Order_Details />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/product/:id' element={<Product_Page />} />
        <Route path='/checkout' element={<Checkout />} />
      </Routes>
    </>
  );
}

function App() 
{
  const[product, setProduct] = useState([]); //holds the current product list
  
  return (
    <Router>
      <Layout_Wrapper product={product} setProduct={setProduct} />
      
    </Router>
  );
}

export default App
