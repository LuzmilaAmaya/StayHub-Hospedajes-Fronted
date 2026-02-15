import { BrowserRouter, Routes, Route } from "react-router-dom";

// Públicas
import HomePage from "../pages/HomePage";
import Login from "../pages/login";
import Register from "../pages/Register";
import AboutPage from "../pages/AboutPage";
import Rooms from "../pages/Rooms";
import NotFoundPage from "../pages/NotFound404";

// Usuario
import ReservationsPage from "../pages/MyReservationsPage";
import Profile from "../pages/Profile";

// Admin
import AdminReservationsPage from "../pages/Admin/AdminReservationsPage";
import AdminRoomPage from "../pages/Admin/AdminRoomsPage";
import UsersAdmin from "../pages/Admin/UsersAdmin";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Públicas */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/habitaciones" element={<Rooms />} />

        {/* Usuario */}
        <Route path="/reservas" element={<ReservationsPage />} />
        <Route path="/perfil" element={<Profile />} />

        {/* Admin */}
        <Route path="/admin/usuarios" element={<UsersAdmin />} />
        <Route path="/admin/reservas" element={<AdminReservationsPage />} />
        <Route path="/admin/habitaciones" element={<AdminRoomPage />} />

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

