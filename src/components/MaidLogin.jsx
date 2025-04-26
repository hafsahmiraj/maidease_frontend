import React from 'react';
import './styles.css';


export default function MaidLogin (){
  return (
    <div className="form-container">
      <h2>Maid Login</h2>
      <form action="/maid/login" method="POST">
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Password" required />
        <button type="submit">Login</button>
        <p className="switch-link">Don’t have an account? <a href="maid/signup">Sign up here</a>
        </p>
      </form>
    </div>
  );
};

//export default MaidLogin;
