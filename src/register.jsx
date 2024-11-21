import React, { useState } from "react";
import './register.css';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import bcrypt from 'bcryptjs';

function SignUp() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [conf, setConf] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (pass !== conf) {
            setMessage('Passwords do not match!');
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, pass);
            const user = auth.currentUser;

            if (user) {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(pass, salt);
                await setDoc(doc(db, "Users", user.uid), {
                    email: user.email,
                    pass: hashedPassword,
                    name: name
                });
            }
            setMessage("Registration successful!");
            setIsRegistered(true);
            navigate('/'); 
        } catch (error) {
            setMessage(error.message);
        }
    };

    const handleGoogleSignUp = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            if (user) {
                await setDoc(doc(db, "Users", user.uid), {
                    email: user.email,
                    name: name || user.displayName
                });
            }

            setMessage("Google sign-up successful!");
            setIsRegistered(true);
            navigate('/');
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <div className="signup-container">
            <h3>Create Your Account</h3>
            <form onSubmit={handleSignUp}>
                <div className="input-group">
                    <label>Name</label>
                    <input
                        type="text"
                        className="input-field"
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Email</label>
                    <input
                        type="email"
                        className="input-field"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Password</label>
                    <input
                        type="password"
                        className="input-field"
                        onChange={(e) => setPass(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        className="input-field"
                        onChange={(e) => setConf(e.target.value)}
                        required
                    />
                </div>
                <div className="button-group">
                    <button className="signup-btn" type="submit">Sign Up</button>
                    <button onClick={handleGoogleSignUp} className="google-btn">
                        Sign Up with Google
                    </button>
                </div>

                {message && <p className="message">{message}</p>}
                {isRegistered && <p className="success-message">Registration successful.</p>}

                <p className="redirect-text">
                    Already with us? <Link to="/login">Log In here!</Link>
                </p>
            </form>
        </div>
    );
}

export default SignUp;
