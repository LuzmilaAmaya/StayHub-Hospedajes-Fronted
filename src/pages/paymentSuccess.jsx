import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function PaymentSuccess() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const confirmPayment = async () => {
      try {
        const paymentId = params.get("payment_id");

        const id = localStorage.getItem("id");
        const guestId = localStorage.getItem("guestId");
        const checkIn = localStorage.getItem("checkIn");
        const checkOut = localStorage.getItem("checkOut");

        await api.post("/payments/confirm-payment", {
          paymentId,
          roomId: id,
          guestId,
          checkIn,
          checkOut,
        });

        alert("¡Reserva exitosa!");

        localStorage.setItem(`reservation_${id}`, "true");

        navigate(`/habitaciones/${id}`);
      } catch (error) {
        console.error("Error confirmando pago:", error);
        alert("Error al confirmar la reserva");
      }
    };

    confirmPayment();
  }, []);

  return <h2>Confirmando pago...</h2>;
}