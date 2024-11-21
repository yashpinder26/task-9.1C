import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBAR from './navbar.jsx';
import Login from './Login.jsx';
import SignUp from './register.jsx';
import Home from './Home.jsx';
import Cover from './Cover';  
import { auth } from './firebase.jsx';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="container">
        <NavBAR user={user} />
        <div className="app">
          <Routes>
            {/* Render Cover when the user is logged in */}
            <Route
              path="/"
              element={user ? <Cover /> : <Home user={user} />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
