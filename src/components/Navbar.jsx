import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../assets/logonegro.png";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

 
  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };
    loadUser();

    
    window.addEventListener("authChange", loadUser);
    return () => window.removeEventListener("authChange", loadUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.dispatchEvent(new Event("authChange"));
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top border-bottom">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center fw-bold" to="/">
          <img src={logo} alt="StayHub Logo" className="navbar-logo me-2" />
          <span className="text-dark">STAYHUB</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link fw-semibold px-3" to="/habitaciones">
                Habitaciones
              </Link>
            </li>
            
            <li className="nav-item">
              <Link className="nav-link fw-semibold px-3" to="#">
                Servicios
              </Link>
            </li>
            {user && (
              <li className="nav-item">
                <Link className="nav-link fw-semibold px-3" to="/reservas">
                  Mi reserva
                </Link>
              </li>
            )}
            {user?.role === "admin" && (
              <li className="nav-item dropdown">
                <a
                  className="nav-link fw-semibold px-3 dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  Admin
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/admin/usuarios">
                      Usuarios
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/admin/reservas">
                      Reservas
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/admin/habitaciones">
                      Habitaciones
                    </Link>
                  </li>
                </ul>
              </li>
            )}
          </ul>

          <div className="d-flex gap-2 align-items-center">
            {user ? (
              <>
                <Link
                  className="btn btn-link text-dark fw-bold px-3 text-decoration-none"
                  to="/perfil"
                >
                  <span className="material-icons align-middle me-1" style={{ fontSize: "1.1rem" }}>
                    account_circle
                  </span>
                  {user.name || user.email}
                </Link>
                <button
                  className="btn btn-outline-secondary rounded-pill px-4 fw-bold"
                  onClick={handleLogout}
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <>
                <Link className="btn btn-link text-dark fw-bold px-3" to="/login">
                  Iniciar Sesión
                </Link>
                <Link
                  className="btn btn-primary-custom rounded-pill px-4 fw-bold"
                  to="/registro"
                >
                  Crear Cuenta
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}