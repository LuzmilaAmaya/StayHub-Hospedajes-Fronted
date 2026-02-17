import { useEffect, useState } from "react";
import {
  getReservations,
  cancelReservation,
} from "../services/reservation.service";

export default function MyReservationsPage() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    loadReservations();
  }, []);

  const loadReservations = async () => {
    const res = await getReservations();
    setReservations(res.data);
  };

  const handleCancel = async (id) => {
    await cancelReservation(id);
    loadReservations();
  };

  const getReservationStatus = (reservation) => {
    if (reservation.status === "pending") return "pending";
    if (reservation.status === "cancelled") return "cancelled";

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const checkIn = new Date(reservation.checkIn);
    const checkOut = new Date(reservation.checkOut);
    checkIn.setHours(0, 0, 0, 0);
    checkOut.setHours(0, 0, 0, 0);

    if (today < checkIn) return "future";
    if (today >= checkIn && today <= checkOut) return "in-progress";
    if (today > checkOut) return "completed";

    return "future";
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("es-AR");

  const grouped = {
    pending: [],
    future: [],
    "in-progress": [],
    completed: [],
    cancelled: [],
  };

  reservations.forEach((r) => {
    grouped[getReservationStatus(r)].push(r);
  });

  return (
    <div className="container py-4">
      <h2 className="mb-4">Mis Reservas</h2>

      {/* Pendientes */}
      {grouped.pending.length > 0 && (
        <div className="mb-5">
          <h4 className="text-warning mb-3">
            ⏳ Pendientes de pago
          </h4>

          {grouped.pending.map((r) => (
            <div key={r._id} className="card mb-3 border-warning">
              <div className="card-body">
                <h5>{r.room?.name}</h5>

                <p>
                  {formatDate(r.checkIn)} - {formatDate(r.checkOut)}
                </p>

                <h5 className="text-success">
                  ${r.totalPrice?.toLocaleString("es-AR")}
                </h5>

                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleCancel(r._id)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Futuras */}
      {grouped.future.map((r) => (
        <div key={r._id} className="card mb-3">
          <div className="card-body">
            <h5>{r.room?.name}</h5>
            <p>
              {formatDate(r.checkIn)} - {formatDate(r.checkOut)}
            </p>
            <span className="badge bg-primary">Futura</span>
          </div>
        </div>
      ))}
    </div>
  );
}
