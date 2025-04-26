import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import './styles.css';
import MaidSignup from './components/MaidSignup';
import UserSignup from './components/UserSignup';
import MaidLogin from './components/MaidLogin';
import UserLogin from './components/UserLogin';
import SignupSelection from './components/SignupSelection';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1 className="text-center mt-10 text-2xl">Welcome to MaidEase</h1>} />
        <Route path="/maid/signup" element={<MaidSignup />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/maid/login" element={<MaidLogin/>} />
        <Route path="/user/signup" element={<UserSignup />} />
        <Route path="/signup-selection" element={<SignupSelection />} />
      </Routes>
    </Router>
  );
}

export default App;
