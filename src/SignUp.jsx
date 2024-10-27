import React, { useState } from 'react';
import { auth } from './firebaseConfig.jsx';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import './SignUp.css';


const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignUp = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate("/dashboard");
        } catch (error) {
            console.error("Sign up error:", error);
            alert("Failed to sign up.");
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleSignUp}>Sign Up</button>
        </div>
    );
};

export default SignUp;
