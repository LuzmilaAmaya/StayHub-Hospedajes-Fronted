import { useState } from "react";
import api from "../api/axios";
import "./Contact.css";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "El nombre es obligatorio";
    if (!form.email.includes("@")) newErrors.email = "Email inválido";
    if (form.message.length < 10)
      newErrors.message = "El mensaje debe tener al menos 10 caracteres";

    return newErrors;
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

    setErrors({
      ...errors,
      [e.target.name]: ""
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      setStatus("");

      await api.post("/contacts", form);

      setStatus("success");
      setForm({ name: "", email: "", message: "" });

    } catch (error) {
      console.error(error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-container">
      <div className="contact-card">
        <h1 className="contact-title">Contacto</h1>
        <p className="contact-subtitle">
          ¿Tenés alguna duda? Escribinos y te respondemos lo antes posible.
        </p>

        <form onSubmit={handleSubmit} className="contact-form">
          <div>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Nombre completo"
              className="contact-input"
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>

          <div>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="contact-input"
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Escribí tu mensaje"
              className="contact-input textarea"
            />
            {errors.message && <p className="error">{errors.message}</p>}
          </div>

          <button className="contact-button" disabled={loading}>
            {loading ? "Enviando..." : "Enviar mensaje"}
          </button>
        </form>

        {status === "success" && (
          <p className="success">✅ Mensaje enviado correctamente</p>
        )}
        {status === "error" && (
          <p className="error-center">❌ Error al enviar el mensaje</p>
        )}
      </div>
    </section>
  );
}