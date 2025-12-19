import { Routes, Route, Navigate } from "react-router-dom";

import { LandingPage } from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/admin/DashboardPage";

import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import ProfilePage from "../pages/ProfilePage";
import SearchResultsPage from "../pages/SearchResultsPage";
import BookingPage from "../pages/BookingPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/search" element={<SearchResultsPage />} /> {/* Route Baru */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      {/* 🔥 FIX ROUTING: Daftarkan Booking Page di sini */}
      <Route path="/booking" element={<BookingPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/profile" element={<ProfilePage />} />
        {/* nanti tambah */}
      </Route>

      <Route element={<AdminRoute />}>
        <Route path="/admin/dashboard" element={<DashboardPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
