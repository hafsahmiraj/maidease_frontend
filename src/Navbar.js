import React from 'react';
import { InputText } from 'primereact/inputtext';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './Navbar.css';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div className="navbar">
      {/* Left side - Title */}
      <div className="navbar-left">
        <img
          alt="logo"
          src="/navbar-logo.png"
          height="40"
          className="navbar-logo"
        />
        <div className="navbar-title">MaidEase</div>
      </div>
      {/* Right side - Menu Links */}
      <div className="navbar-right">
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/aboutus">About us</Link>
          <div className="dropdown">
            <button className="sign-in">Sign In</button>
            <div className="dropdown-content">
              <Link to="/login/maid">Maid</Link>
              <Link to="/login/user">User</Link>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}
