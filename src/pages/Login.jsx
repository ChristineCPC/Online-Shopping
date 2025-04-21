 import React from "react";
 import {Link} from "react-router-dom";
 import "./Login.css";

function Login()
{
    return (
        <nav className="login">
            {/*Center: Logo*/}
            <div className="login-logo">
                <Link to="/">Generic<span>Store</span></Link>
            </div>

            <div className="login-box">
                <span className="login-prompt">Login</span>

                <form>
                    <label htmlFor="email">Enter email:</label>
                    <input type="email" id="email" name="email" />
                    <button type="submit" className="login-continue-button">Continue</button>
                </form>
            </div>

            <div className="login-divider">
                <span>---------Don't have an account?---------</span>
            </div>

            <Link to="/sign_up">
                <button className="login-create-account-button">Create an Account</button>
            </Link>
        </nav>
    );
}
export default Login;
