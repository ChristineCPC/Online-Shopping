import {BrowserRouter as Router, Routes, Route, useLocation} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Sign_Up from './pages/Sign_Up';
import Navbar from './components/Navbar';

function Layout_Wrapper()
{
  const location = useLocation();
  const hideNavbar = location.pathname === "/login" || location.pathname === "/sign_up";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign_up" element={<Sign_Up />} />
      </Routes>
    </>
  );
}

function App() 
{
  return (
    <Router>
      <Layout_Wrapper />
    </Router>
  );
}

export default App
