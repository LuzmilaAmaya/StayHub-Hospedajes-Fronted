import { useState } from "react";
import { createReservation } from "../services/reservation.service";

export default function ReservationForm({ roomId }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    checkIn: "",
    checkOut: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await createReservation({
      room: roomId,
      guest: {
        name: form.name,
        email: form.email,
      },
      checkIn: form.checkIn,
      checkOut: form.checkOut,
    });

    alert("Reserva creada");
  };

  return (
    <div>
      <input name="name" placeholder="Nombre" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input type="date" name="checkIn" onChange={handleChange} />
      <input type="date" name="checkOut" onChange={handleChange} />
      <button onClick={handleSubmit}>Reservar</button>
    </div>
  );
}
