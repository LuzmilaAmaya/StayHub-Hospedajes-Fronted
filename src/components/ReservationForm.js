import { useState } from "react";
import { createReservation } from "../services/reservation.service";

export default function ReservationForm({ roomId }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    checkIn: "",
    checkOut: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      await createReservation({
        room: roomId,
        guest: {
          name: form.name,
          email: form.email,
        },
        checkIn: form.checkIn,
        checkOut: form.checkOut,
      });

      setSuccess(true);

      setForm({
        name: "",
        email: "",
        checkIn: "",
        checkOut: "",
      });

    } catch (err) {
      setError(err.response?.data?.message || "Error al crear la reserva");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-3 shadow-sm">
      <h5 className="mb-3">Reservar habitación</h5>

      {success && (
        <div className="alert alert-success">
          Reserva creada correctamente 🎉
        </div>
      )}

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      <input
        className="form-control mb-2"
        name="name"
        placeholder="Nombre"
        value={form.name}
        onChange={handleChange}
      />

      <input
        className="form-control mb-2"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />

      <input
        className="form-control mb-2"
        type="date"
        name="checkIn"
        value={form.checkIn}
        onChange={handleChange}
      />

      <input
        className="form-control mb-3"
        type="date"
        name="checkOut"
        value={form.checkOut}
        onChange={handleChange}
      />

      <button
        className="btn btn-primary w-100"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Procesando..." : "Reservar"}
      </button>
    </div>
  );
}
