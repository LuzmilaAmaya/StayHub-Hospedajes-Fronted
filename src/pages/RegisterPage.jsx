import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../pages/register.css";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPass, setShowPass] = useState(false);
  const [strength, setStrength] = useState(0);
  const [alert, setAlert] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (
      (name === "nombre" || name === "apellido") &&
      !/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]{0,30}$/.test(value)
    )
      return;

    setForm({ ...form, [name]: value });

    if (name === "password") checkStrength(value);
  };

  const checkStrength = (pass) => {
    let score = 0;
    if (pass.length >= 6) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    setStrength(score);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setAlert("Las contraseñas no coinciden");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(form);
    localStorage.setItem("users", JSON.stringify(users));

    setAlert("Registro exitoso");

    setTimeout(() => navigate("/"), 1800);
  };

  return (
    <div className="register-bg">
      <div
        id="bgCarousel"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945"
              className="d-block w-100 bg-img"
            />
          </div>

          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b"
              className="d-block w-100 bg-img"
            />
          </div>

          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1590490360182-c33d57733427"
              className="d-block w-100 bg-img"
            />
          </div>
        </div>
      </div>

      <div className="register-card">
        <h2 className="title">Crear Cuenta</h2>

        {alert && <div className="alert-pro">{alert}</div>}

        <form onSubmit={handleSubmit}>
          <div className="row">
            <input
              name="nombre"
              placeholder="Nombre"
              value={form.nombre}
              onChange={handleChange}
              required
            />

            <input
              name="apellido"
              placeholder="Apellido"
              value={form.apellido}
              onChange={handleChange}
              required
            />
          </div>

          <input
            name="email"
            type="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={handleChange}
            required
          />

          <div className="password-group">
            <input
              name="password"
              type={showPass ? "text" : "password"}
              placeholder="Contraseña"
              value={form.password}
              onChange={handleChange}
              required
            />

            <span className="eye" onClick={() => setShowPass(!showPass)}>
              {showPass ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="strength-bar">
            <div className={`strength strength-${strength}`}></div>
          </div>

          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirmar contraseña"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />

          <button className="btn-register">Registrarse</button>
        </form>

        <p className="login-link">
          ¿Ya tienes cuenta? <Link to="/login">Iniciar sesión</Link>
        </p>
      </div>
    </div>
  );
}
