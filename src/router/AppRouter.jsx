import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import HomePage from "../pages/HomePage";
import Login from "../pages/login";
import Register from "../pages/RegisterPage";
import AboutPage from "../pages/AboutPage";
import Rooms from "../pages/Rooms";
import NotFoundPage from "../pages/NotFound404";
import ReservationsPage from "../pages/MyReservationsPage";
import Profile from "../pages/Profile";
import AdminReservationsPage from "../pages/Admin/AdminReservationsPage";
import AdminRoomsPage from "../pages/Admin/AdminRoomsPage";
import UsersAdmin from "../pages/Admin/UsersAdmin";
import ProtectedRoute from "../components/ProtectedRoute";
import RoomDetails from "../pages/RoomsDetails";
import PaymentSuccess from "../pages/paymentSuccess";

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
          <Route path="/admin/usuarios" element={<ProtectedRoute role="admin"> <UsersAdmin/> </ProtectedRoute>} />
          <Route path="/admin/reservas" element={<ProtectedRoute role="admin"> <AdminReservationsPage/> </ProtectedRoute>} />
          <Route path="/admin/habitaciones" element={<ProtectedRoute role="admin"> <AdminRoomsPage /> </ProtectedRoute>} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
