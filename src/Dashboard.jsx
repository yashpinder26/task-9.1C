import React from 'react';
import { auth } from './firebaseConfig.jsx';
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import './Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            navigate("/");
        } catch (error) {
            console.error("Sign out error:", error);
        }
    };

    return (
        <div>
            <h2>Dashboard</h2>
            <button onClick={handleSignOut}>Sign Out</button>
        </div>
    );
};

export default Dashboard;
