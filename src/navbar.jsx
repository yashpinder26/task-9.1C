import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from './firebase.jsx';
import './navbar.css';

const NavBAR = ({ user }) => {
  const handleSignOut = () => {
    auth.signOut();
  };

  return (
    <nav className="navbar">
      <div className="brand-logo">DEV@Deakin</div>
      
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
        />
      <div className="action-buttons">
        {user ? (
          <>
            <span className="welcome-message">Welcome, {user.displayName}!</span>
            <button className="logout-button" onClick={handleSignOut}>
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="login-button">Log In</button>
            </Link>
            <Link to="/signup">
              <button className="signup-button">Sign Up</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBAR;
