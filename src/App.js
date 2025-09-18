import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import HomePage from "./components/HomePage/HomePage";
import MaidProfilePage from "./components/MaidProfilePage/MaidProfilePage";
import Navbar from "./components/Navbar/Navbar";
import UserEdit from './components/UserEdit';
import MaidEditNew from './components/MaidEdit';
import MaidLogin from "./components/Login/MaidLogin";
import LoginU from "./components/Login/UserLogin";
import Aboutus from "./components/AboutUs/Aboutus";
import Booking from "./components/Booking/Booking";
import BookingTable from "./components/BookingTable/BookingTable";
import HirePreview from "./components/HirePreview";
import PaymentSuccess from "./components/Payment/PaymentSuccess";


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
          <Route path="/payment-success" element={<PaymentSuccess />} />
        </Routes>
      </Router>
    </PrimeReactProvider>
  );
}

export default App;
