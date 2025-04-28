 import React from "react";
 import {Link} from "react-router-dom";
 import "./Login.css";
 import {useState} from "react";
 import axios from "axios";
 import { useNavigate } from "react-router-dom";

function Login()
{   
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => 
    {
        e.preventDefault();
        try 
        {
            const formData = new URLSearchParams();
            formData.append('username', email);
            formData.append('password', password);

            const response = await axios.post('http://localhost:8000/login', formData, {headers: { "Content-Type": "application/x-www-form-urlencoded" } });

            localStorage.setItem('user', JSON.stringify(response.data));
            navigate('/');
        } catch (error) 
        {
            console.error("Login failed", error);
            alert("Login failed!");
        }
    };
    

    return (
        <div className="login">
            {/*Center: Logo*/}
            <div className="login-logo">
                <Link to="/">Generic<span>Store</span></Link>
            </div>

            <div className="login-box">
                <span className="login-prompt">Login</span>

                <form method="post" onSubmit={handleLogin}>
                    <label htmlFor="email">Enter email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                    <label htmlFor="password">Enter password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                    <button type="submit" className="login-continue-button">Continue</button>
                </form>
            </div>

            <div className="login-divider">
                <span>---------Don't have an account?---------</span>
            </div>

            <Link to="/sign_up">
                <button className="login-create-account-button">Create an Account</button>
            </Link>
        </div>
    );
}
export default Login;
