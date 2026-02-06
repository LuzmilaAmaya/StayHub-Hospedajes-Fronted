import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ReservationsPage from "./pages/ReservationsPage";
import Rooms from "./pages/Rooms";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/reservas" element={<ReservationsPage />} />
       <Route path="/habitaciones" element={<Rooms />} />
      </Routes>
    </BrowserRouter>
  );
}
