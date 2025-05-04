import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function UserNav() {
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
                              <Link to="/HomePage">Home</Link>
                              <Link to="/aboutus">About us</Link>  
                              <Link to="/tableU">Hirings</Link>
                           <Link to="/maid/profile" className="sign-in">Profile</Link>
                          </div>
                          </div>
                      </div>
    );
}
