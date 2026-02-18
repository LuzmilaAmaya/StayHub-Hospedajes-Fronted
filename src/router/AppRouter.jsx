import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout
import Layout from "../components/Layout";

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
import RoomDetails from "../pages/RoomsDetails";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Todas las rutas dentro de Layout comparten Navbar + Footer */}
        <Route element={<Layout />}>
          {/* Publicas */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/habitaciones" element={<Rooms />} />
          <Route path="/habitaciones/:id" element={<RoomDetails />} />

          {/* Usuarios */}
          <Route path="/reservas" element={<ReservationsPage />} />
          <Route path="/perfil" element={<Profile />} />

          {/* pag admin */}
          <Route path="/admin/usuarios" element={<UsersAdmin />} />
          <Route path="/admin/reservas" element={<AdminReservationsPage />} />
          <Route path="/admin/habitaciones" element={<AdminRoomPage />} />

          {/* error 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}