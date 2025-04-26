import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';

const UserLogin = () => {
  return (
    <div className="form-container">
      <h2>User Login</h2>
      <form>
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Password" required />
        <button type="submit">Login</button>
        <p className="switch-link">
          Don’t have an account? <Link to="/user/signup">sign up here</Link>
        </p>
      </form>
    </div>
  );
};

export default UserLogin;
