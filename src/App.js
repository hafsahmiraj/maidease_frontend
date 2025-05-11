import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import HomePage from "./HomePage";
import MaidProfilePage from "./MaidProfilePage";
import Navbar from "./Navbar";
import UserEdit from './components/UserEdit';
import MaidEdit from "./MaidEdit";
import LoginM from "./LoginM";
import LoginU from "./LoginU";
import MaidNav from "./MaidNav";
import UserNav from "./UserNav";
import Aboutus from "./Aboutus";
import Booking from "./Booking";
import Tablemaid from "./Tablemaid";
import TableU from "./TableU";

function App() {
  // Set default userType only if not already set
  if (!localStorage.getItem("userType")) {
    localStorage.setItem("userType", "maid");
  }

  return (
    <PrimeReactProvider>
      <Router>
        {/* Persistent Navbar */}
        <Navbar />

        {/* Page Content */}
        <Routes>
        <Route path="/" element={<HomePage />} />
          <Route path="/tablemaid" element={<Tablemaid />} />
          <Route path="/tableu" element={<TableU />} />
          <Route path="/maid/:maidId" element={<MaidProfilePage />} />
          <Route path="/booking/:maidId" element={<Booking />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/login/maid" element={<LoginM  />} />
          <Route path="/login/user" element={<LoginU  />} />
          <Route path="/Maidnav" element={<MaidNav />} />
          <Route path="/Usernav" element={<UserNav />} />
          <Route path="/LoginM" element={<LoginM />} />
          <Route path="/useredit/:userId" element={<UserEdit />}/>
          <Route path="/Maidedit/:userId" element={<MaidEdit />} />
          <Route path="/Useredit/:userId" element={<UserEdit />} />
          
        </Routes>
      </Router>
    </PrimeReactProvider>
  );
}

export default App;
