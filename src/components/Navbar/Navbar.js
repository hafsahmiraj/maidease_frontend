import React, {useEffect, useRef, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Avatar} from 'primereact/avatar';
import {Menu} from 'primereact/menu';
import {Button} from 'primereact/button';
import './Navbar.css';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [userType, setUserType] = useState(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUserType = localStorage.getItem('userType');
    const storedUserDetails = localStorage.getItem('userDetails');

    if (token && storedUserType && storedUserDetails) {
      setIsLoggedIn(true);
      setUserType(storedUserType);
      setUserDetails(JSON.parse(storedUserDetails));
    } else {
      setIsLoggedIn(false);
      setUserType(null);
      setUserDetails(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUserType(null);
    setUserDetails(null);
    window.location.href = "/";
  };

  const getInitials = (name) => {
    if (!name) return '??';
    const names = name.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return name[0].toUpperCase();
  };

  const menuItems = [
    {
      template: () => (
        <div className="p-3">
          <div className="user-profile-header">
            <div className="user-info">
              <Avatar
                image={userDetails?.profile_photo}
                label={getInitials(userDetails?.full_name)}
                size="large"
                shape="circle"
                className="mr-2"
              />
              <div className="user-details">
                <div className="user-name">{userDetails?.full_name}</div>
                <div className="user-email">{userDetails?.email}</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    { separator: true },
    {
      label: 'View Profile',
      icon: 'pi pi-user',
      command: () => {
        const path = userType === 'USER'
          ? `/useredit/${userDetails?.id}`
          : `/maidedit/${userDetails?.id}`;
        navigate(path);
      }
    },
    {
      label: 'Logout',
      icon: 'pi pi-power-off',
      command: handleLogout
    }
  ];

  return (
      <div className="navbar p-3">
        <div className="navbar-left">
          <img
             src={`${process.env.PUBLIC_URL}/aboutus/about4.jpg`} alt="logo" 
              height="40"
              className="navbar-logo mr-2"
          />
          <div className="navbar-title">MaidEase</div>
        </div>

        <div className="navbar-right flex align-items-center">
          <div className="navbar-links mr-3">
            <Link to="/" className="p-link mr-3">Home</Link>
            <Link to="/aboutus" className="p-link mr-3">About us</Link>
            {isLoggedIn && (
                <Link to="/booking" className="p-link mr-3">Bookings</Link>
            )}
            {isLoggedIn ? (
                <div className="flex align-items-center">
                  <div className="custom-avatar-wrapper" onClick={(e) => menuRef.current.toggle(e)}>
                    <Avatar
                        image={userDetails?.profile_photo}
                        label={getInitials(userDetails?.full_name)}
                        shape="circle"
                        size="normal"
                        className="custom-avatar"
                    />
                    <i className="pi pi-angle-down custom-avatar-icon"></i>
                  </div>
                  <Menu
                      model={menuItems}
                      popup
                      ref={menuRef}
                      className="profile-menu"
                  />
                </div>
            ) : (
                <div className="dropdown">
                  <Button
                      label="Sign In"
                      className="p-button-raised"
                      icon="pi pi-user"
                  />
                  <div className="dropdown-content">
                    <Link to="/login/maid" className="p-link">Maid</Link>
                    <Link to="/login/user" className="p-link">User</Link>
                  </div>
                </div>
            )}
          </div>
        </div>
      </div>
  );
}