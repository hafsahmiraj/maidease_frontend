import React from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PrimeReactProvider } from 'primereact/api';

import 'primereact/resources/themes/lara-light-indigo/theme.css'; 
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import Navbar from './Navbar';
import Maidnav from './Maidnav';   
import Usernav from './Usernav';   
import Rating from './Rating';
import Booking from './Booking';
import Aboutus from './Aboutus';


import MaidSignup from './components/MaidSignup';
import UserSignup from './components/UserSignup';
import MaidLogin from './components/MaidLogin';
import UserLogin from './components/UserLogin';
import SignupSelection from './components/SignupSelection';

function App() {
  return (
    <PrimeReactProvider>
      <Router>
        <Routes>
          {/* Main Navbar Route */}
          <Route path="/" element={
            <>
              <Navbar />
              <h1 className="text-center mt-10 text-2xl">Welcome to MaidEase</h1>
            </>
          } />

          {/* Route */}
          <Route path="/Navbar" element={<Navbar />} />
          <Route path="/maidnav" element={<Maidnav />} />
          <Route path="/usernav" element={<Usernav />} />
          <Route path="/Rating" element={<Rating/>} />
          <Route path="/Booking" element={<Booking/>} />
          <Route path="/Aboutus" element={<Aboutus/>} />

          {/* Other signup/login pages */}
          <Route path="/maid/signup" element={<MaidSignup />} />
          <Route path="/user/signup" element={<UserSignup />} />
          <Route path="/maid/login" element={<MaidLogin />} />
          <Route path="/user/login" element={<UserLogin />} />
          <Route path="/signup-selection" element={<SignupSelection />} />
        </Routes>
      </Router>
    </PrimeReactProvider>
  );
}

export default App;
