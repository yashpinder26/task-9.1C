import React, { useState, useEffect } from "react";
import './login.css';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, signInWithGoogle } from "./firebase"; // Import Google sign-in function
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [message, setMessage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate for redirection

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/'); // Redirect to home page if logged in
        }
    }, [isLoggedIn, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, pass);
            setMessage("User logged in successfully");
            setIsLoggedIn(true); // Set logged in state to true
        } catch (error) {
            setMessage(error.message); // Display error message
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await signInWithGoogle(); // Trigger Google login
            setIsLoggedIn(true); // Set logged in state to true
        } catch (error) {
            setMessage(error.message); // Display error message
        }
    };

    return (
        <div className="card-container">
            <h4>Login to Your Account</h4>
            
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Email Address</label>
                    <input
                        type="email"
                        className="custom-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Password</label>
                    <input
                        type="password"
                        className="custom-input"
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        required
                    />
                </div>
                <div className="button-group">
                    <button type="submit" className="submit-btn">Login</button>
                    <button type="button" onClick={handleGoogleLogin} className="google-btn-123">
                        Login with Google
                    </button>
                </div>
                {message && <p className="message">{message}</p>}
            </form>
            <p className="redirect-text">
                New here? <Link to="/signup">Create an account!</Link>
            </p>
        </div>
    );
}

export default Login;
