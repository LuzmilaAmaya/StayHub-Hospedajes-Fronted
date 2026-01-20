import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ReservationsPage from "./pages/ReservationsPage";

export default function App() {
  return (
 feat/rooms
    <>
      <div>
       holaaa
      </div>
    
    </>
  )

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/reservas" element={<ReservationsPage />} />
      </Routes>
    </BrowserRouter>
  ); dev
}
