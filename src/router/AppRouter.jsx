import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Login from "../pages/login";
import Register from "../pages/Register";
import ReservationsPage from "../pages/MyReservationsPage";
import Profile from "../pages/Profile";
import AdminReservationsPage from "../pages/Admin/AdminReservationsPage";
import AdminRoomPage from "../pages/Admin/AdminRoomsPage";
import NotFoundPage from "../pages/NotFound404";
import Rooms from "../pages/Rooms";
import UsersAdmin from "../pages/Admin/UsersAdmin";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/reservas" element={<ReservationsPage />} />
        <Route path="/adminreservas" element={<AdminReservationsPage />} />
        <Route path="/adminhabitaciones" element={<AdminRoomPage />} />
         <Route path="/habitaciones" element={<Rooms />} />
          <Route path="*" element={<NotFoundPage />} />
        <Route path="/perfil" element={<Profile />} />
        <Route path="/admin/usuarios" element={<UsersAdmin />} />
        <Route path="/admin/reservas" element={<AdminReservationsPage />} />
        <Route path="/admin/habitaciones" element={<AdminRoomPage />} />
      </Routes>
    </BrowserRouter>
  );
}
