import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../pages/register.css";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPass, setShowPass] = useState(false);
  const [alert, setAlert] = useState("");

  // ADMIN 
  const adminUser = {
    email: "admin@stayhub.com",
    password: "admin123",
    role: "admin",
    nombre: "Administrador",
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userFound = users.find(
      (u) =>
        u.email === form.email &&
        u.password === form.password
    );

    // ADMIN login
    if (
      form.email === adminUser.email &&
      form.password === adminUser.password
    ) {
      localStorage.setItem("user", JSON.stringify(adminUser));
      localStorage.setItem("token", "admin-token");

      window.dispatchEvent(new Event("authChange"));

      setAlert("Bienvenido Administrador ");

      setTimeout(() => {
        navigate("/admin/usuarios");
      }, 1500);

      return;
    }

    if (userFound) {
      localStorage.setItem("user", JSON.stringify(userFound));
      localStorage.setItem("token", "user-token");

      window.dispatchEvent(new Event("authChange"));

      setAlert(`Bienvenido ${userFound.nombre} `);

      setTimeout(() => {
        navigate("/");
      }, 1500);

    } else {
      setAlert("Correo o contraseña incorrectos ❌");
    }
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
              alt="hotel"
            />
          </div>

          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b"
              className="d-block w-100 bg-img"
              alt="room"
            />
          </div>

          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1590490360182-c33d57733427"
              className="d-block w-100 bg-img"
              alt="suite"
            />
          </div>

        </div>
      </div>

      <div className="register-card">

        <h2 className="title">Iniciar Sesión</h2>

        {alert && <div className="alert-pro">{alert}</div>}

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            required
          />

          <div className="password-group">
            <input
              type={showPass ? "text" : "password"}
              placeholder="Contraseña"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              required
            />

            <span
              className="eye"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button className="btn-register">
            Iniciar sesión
          </button>

        </form>

        <p className="login-link">
          ¿No tienes cuenta? <Link to="/registro">Crear cuenta</Link>
        </p>

      </div>
    </div>
  );
}