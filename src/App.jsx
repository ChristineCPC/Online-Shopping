import { useState } from 'react';
import {BrowserRouter as Router, Routes, Route, useLocation} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Sign_Up from './pages/Sign_Up';
import Navbar from './components/Navbar';
import Search_Results from './pages/Search_Results';

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
