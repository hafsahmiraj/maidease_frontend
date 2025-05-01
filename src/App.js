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
import LoginM from "./LoginM";
import LoginU from "./LoginU";


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
           <Route path="/LoginM" element={<LoginM />} />
             <Route path="/LoginU" element={<LoginU />} />
        </Routes>
      </Router>
    </PrimeReactProvider>
  );
}

export default App;
