import React, {useState} from "react";
import {Link} from "react-router-dom";
import "./Sign_Up.css"

function Sign_Up()
{
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm((prev) => ({...prev, [name]: value}));
    };

    const validate = () => {
        const newErrors = {};

        if (!form.firstName.trim()) newErrors.firstName = "First name is required";
        if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
        if (!form.email.includes("@")) newErrors.email = "Enter a valid email address";
        if (form.password !== form.confirmPassword) newErrors.confirmPassword = "Passwords do not match";

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setErrors({});
            console.log("Form submitted:", form);
            // Later: send to backend here
        }
    };

    return (
        <nav className="sign-up">
            {/*Center: Logo*/}
            <div className="sign-up-logo">
                <Link to="/">Generic<span>Store</span></Link>
            </div>

            <div className="sign-up-box">
                <span className="sign-up-prompts">Create an Account</span>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="first-name">First Name:</label>
                    <input type="text" id="Fname" name = "firstName" value={form.firstName} onChange={handleChange}/>
                    {errors.firstName && <p className="form-error">{errors.firstName}</p>}

                    <label htmlFor="last-name">Last Name:</label>
                    <input type="text" id="Lname" name = "lastName" value={form.lastName} onChange={handleChange}/> 
                    {errors.lastName && <p className="form-error">{errors.lastName}</p>}

                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={form.email} onChange={handleChange}/>
                    {errors.email && <p className="form-error">{errors.email}</p>}

                    <label htmlFor="password">Password:</label>
                    <input type="text" id="password" name="password" value={form.password} onChange={handleChange}/>
                    {errors.password && <p className="form-error">{errors.password}</p>}

                    <label htmlFor="re-enter-password">Re-enter Password:</label>
                    <input type="text" id="re-enter-password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange}/>
                    {errors.confirmPassword && <p className="form-error">{errors.confirmPassword}</p>}

                    <button type="submit" className="sign-up-create-account-button">Create Account</button>
                </form>

                <div className="sign-up-login-link">Already have an account? <Link to="/login">Click here to login</Link></div>
            </div>
            
        </nav>
    );
}
export default Sign_Up;