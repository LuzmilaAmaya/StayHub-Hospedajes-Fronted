import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import Register from "../pages/RegisterPage";
import AboutPage from "../pages/AboutPage";
import Rooms from "../pages/Rooms";
import NotFoundPage from "../pages/NotFound404";
import ReservationsPage from "../pages/MyReservationsPage";
import Profile from "../pages/Profile";
import AdminReservationsPage from "../pages/Admin/AdminReservationsPage";
import AdminRoomsPage from "../pages/Admin/AdminRoomsPage";
import UsersAdmin from "../pages/Admin/UsersAdmin";
import Reviews from "./pages/Reviews";
import RoomDetails from "../pages/RoomsDetails";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/habitaciones" element={<Rooms />} />
          <Route path="/habitaciones/:id" element={<RoomDetails />} />
          <Route path="/reservas" element={<ReservationsPage />} />
          <Route path="/perfil" element={<Profile />} />
          <Route path="/admin/usuarios" element={<UsersAdmin />} />
          <Route path="/admin/reservas" element={<AdminReservationsPage />} />
          <Route path="/admin/habitaciones" element={<AdminRoomsPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/reviews" element={<Reviews />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
