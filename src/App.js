import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import HomePage from "./HomePage";
import MaidProfilePage from "./MaidProfilePage";
import Navbar from "./Navbar";
import UserEdit from "./UserEdit";
import MaidEdit from "./MaidEdit";
import LoginM from "./LoginM";
import LoginU from "./LoginU";
import Login from "./Login";
import MaidNav from "./MaidNav";
import UserNav from "./UserNav";
import Aboutus from "./Aboutus";
import Booking from "./Booking";
import Tablemaid from "./Tablemaid";
import TableU from "./TableU";

const userType = localStorage.getItem("userType");
localStorage.setItem("userType", "maid");

function App() {
  return (
    <PrimeReactProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <h1 className="text-center mt-10 text-2xl">
                Welcome to MaidEase
              </h1>
            }
          />
<Route path="/tablemaid" element={<Tablemaid/>} />
<Route path="/tableu" element={<TableU/>} />
            <Route path="/maid/:maidId" element={<MaidProfilePage />} />
            
          <Route path="/booking/:maidId" element={<Booking/>} />
           <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/login/maid" element={<LoginM userType="maid" />} />
          <Route path="/login/user" element={<LoginU userType="user" />} />
          <Route path="/LoginU" element={<LoginU />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Maidnav" element={<MaidNav />} />
          <Route path="/Usernav" element={<UserNav />} />
          <Route path="/LoginM" element={<LoginM />} />
          <Route path="/Maidedit" element={<MaidEdit />} />
          <Route path="/Useredit" element={<UserEdit />} />
          <Route path="/Navbar" element={<Navbar />} />
          <Route path="/HomePage" element={<HomePage />} />
        </Routes>
      </Router>
    </PrimeReactProvider>
  );
}
export default App;
