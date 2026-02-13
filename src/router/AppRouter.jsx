import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ReservationsPage from "../pages/MyReservationsPage";
import AdminReservationsPage from "../pages/Admin/AdminReservationsPage";
import AdminRoomPage from "../pages/Admin/AdminRoomsPage";
import NotFoundPage from "../pages/NotFound404";
import Rooms from "../pages/Rooms";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/reservas" element={<ReservationsPage />} />
        <Route path="/adminreservas" element={<AdminReservationsPage />} />
        <Route path="/adminhabitaciones" element={<AdminRoomPage />} />
         <Route path="/habitaciones" element={<Rooms />} />
          <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
