import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import BookingPage from './pages/BookingPage';
import CancellationConfirmation from './pages/CancellationConfirmation';
import ContactPage from "./pages/ContactPage";
import AdminDashboard from './pages/AdminDashboard'; 
import LoginForm from "./pages/LoginForm";
import { AuthProvider } from './context/AuthContext'; // Import the AuthProvider
import ProtectedRoute from "./components/ProtectedRoute";
import RegisterForm from "./components/RegisterForm";
import TestPage from "./pages/TestPage";
import './App.css'
import MobileBookingPage from "./pages/MobileBookingPage";
import AboutUs from "./pages/AboutUs";
import ConfirmCancel from "./pages/ConfirmCancel";


function App() {
  return (
    <AuthProvider> {/* Wrap your entire app with AuthProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<Layout/>} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/booking-cancelled-confirmation" element={<CancellationConfirmation />} />
          <Route path="/api/bookings/cancel/:bookingId" element={<ConfirmCancel />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={<ProtectedRoute element={<AdminDashboard />} />} />
          <Route path="/admin-login" element={<LoginForm/>} />
          <Route path="/register" element={<RegisterForm/>} />
          <Route path="/testpage" element={<TestPage/>} />
          <Route path="/aboutus" element={<AboutUs/>} />
          <Route path="/booking-mobile/:tourId" element={<MobileBookingPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
