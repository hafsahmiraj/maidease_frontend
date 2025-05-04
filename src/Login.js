// Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

export default function Login({ userType }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Replace this with actual login API call
    const isAuthenticated = true; // Simulate success

    if (isAuthenticated) {
      // 🟢 Save user type to localStorage
      localStorage.setItem('userType', userType); // 'maid' or 'customer'

      // Redirect to homepage or profile
      navigate('/HomePage');
    } else {
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Login as {userType}</button>
    </form>
  );
}
