import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import HomePage from "../HomePage/HomePage";
import MaidProfilePage from "../MaidProfilePage/MaidProfilePage";
import Navbar from "../Navbar/Navbar";
import UserEdit from '../UserEdit';
import MaidEditNew from '../MaidEdit';
import MaidLogin from "../Login/MaidLogin";
import LoginU from "../Login/UserLogin";
import Aboutus from "../AboutUs/Aboutus";
import Booking from "../Booking/Booking";
import BookingTable from "../BookingTable/BookingTable";
import HirePreview from "../HirePreview";


function App() {

  return (
    <PrimeReactProvider>
      <Router>
        {/* Persistent Navbar */}
        <Navbar />

        {/* Page Content */}
        <Routes>
        <Route path="/" element={<HomePage />} />
          <Route path="/booking" element={<BookingTable />} />
          <Route path="/maid/:maidId" element={<MaidProfilePage />} />
          <Route path="/booking/:maidId" element={<Booking />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/login/maid" element={<MaidLogin  />} />
          <Route path="/login/user" element={<LoginU  />} />
          <Route path="/maidedit/:userId" element={<MaidEditNew />} />
          <Route path="/useredit/:userId" element={<UserEdit />}/>
          <Route path="/hire-preview/:maidHireId" element={<HirePreview />} />
        </Routes>
      </Router>
    </PrimeReactProvider>
  );
}

export default App;
