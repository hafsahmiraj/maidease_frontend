import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
      <div className="navbar">
        <div className="navbar-left">
          <img alt="logo" src="/navbar-logo.png" height="40" className="navbar-logo"/>
          <div className="navbar-title">MaidEase</div>
        </div>
        <div className="navbar-right">
          <div className="navbar-links">
            <Link to="/">Home</Link>
            <Link to="/aboutus">About us</Link>
            {isLoggedIn ? (
                <>
                  <Link to="/tableU">Hired</Link>
                  <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <div className="dropdown">
                  <button className="sign-in">Sign In</button>
                  <div className="dropdown-content">
                    <Link to="/login/maid">Maid</Link>
                    <Link to="/login/user">User</Link>
                  </div>
                </div>
            )}
          </div>
        </div>
      </div>
  );
}