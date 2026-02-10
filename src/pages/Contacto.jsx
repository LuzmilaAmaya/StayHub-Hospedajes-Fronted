import { useState } from "react";
import api from "../api/axios";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/contacts", form);
      setStatus("Mensaje enviado. Revisá tu correo 📩");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
      setStatus("Error al enviar el mensaje");
    }
  };

  return (
    <section>
      <h1>Contacto</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Nombre completo"
          required
        />

        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />

        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Escribí tu mensaje"
          required
        />

        <button type="submit">Enviar</button>
      </form>

      <p>{status}</p>
    </section>
  );
}
