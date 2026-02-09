import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ReservationsPage from "../pages/MyReservationsPage";
import AdminReservationsPage from "../pages/Admin/AdminReservationsPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/reservas" element={<ReservationsPage />} />
        <Route path="/adminreservas" element={<AdminReservationsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
