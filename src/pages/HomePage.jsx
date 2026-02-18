import { Link } from "react-router-dom";
import "./HomePage.css";
import logo from "../assets/logonegro.png";
import experienciaImg from "../assets/experiencia.png";


export default function HomePage() {
  return (
    <div>

     {/* ================= NAVBAR ================= */}
<nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top border-bottom">
  <div className="container">
    <Link className="navbar-brand d-flex align-items-center fw-bold" to="/">
      
      <img
        src={logo}
        alt="StayHub Logo"
        className="navbar-logo me-2"
      />

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
            Destinos
          </Link>
        </li>
        <li className="nav-item">
  <Link className="nav-link fw-semibold px-3" to="#">
    Servicios
  </Link>
</li>
        <li className="nav-item">
          <Link className="nav-link fw-semibold px-3" to="/reservas">
            Mi reserva
          </Link>
        </li>
      </ul>

      <div className="d-flex gap-2 align-items-center">
        <Link className="btn btn-link text-dark fw-bold px-3" to="/login">
          Iniciar Sesión
        </Link>
        <Link className="btn btn-primary-custom rounded-pill px-4 fw-bold" to="/registro">
          Crear Cuenta
        </Link>
      </div>
    </div>
  </div>
</nav>


      {/* ================= HERO ================= */}
      <header className="hero-section text-center py-5">
        <div className="container">
          <h6 className="hero-badge">
            Tu escape ideal comienza aquí
          </h6>

          <h1 className="display-2 fw-bold mb-4 text-white">
            Bienvenido a StayHub:<br />
            Descubre la comodidad y el lujo
          </h1>

          <p className="lead mb-5 mx-auto text-white hero-text">
            Reserva tu habitación perfecta con nosotros y vive una experiencia inolvidable.
          </p>

          <div className="search-box shadow-lg">
            <div className="d-flex align-items-center flex-wrap gap-3">
              <div className="d-flex align-items-center border-end pe-3">
                <span className="material-icons text-primary-custom me-2">
                  location_on
                </span>
                <input className="border-0 shadow-none" placeholder="¿A dónde vas?" />
              </div>

              <div className="d-flex align-items-center border-end pe-3">
                <span className="material-icons text-primary-custom me-2">
                  calendar_today
                </span>
                <input className="border-0 shadow-none" placeholder="Fechas de estancia" />
              </div>

              <button className="btn btn-primary-custom rounded-pill px-4 d-flex align-items-center">
                <span className="material-icons me-2">search</span>
                Buscar
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ================= HABITACIONES ================= */}
      <section className="py-5">
        <div className="container py-5">
          <div className="d-flex justify-content-between align-items-end mb-5">
            <div>
              <h6 className="text-primary-custom fw-bold text-uppercase">
                Colección Exclusiva
              </h6>
              <h2 className="display-5 fw-bold">Habitaciones Destacadas</h2>
            </div>
          </div>

          <div className="row g-4">
            {rooms.map((room, index) => (
              <div className="col-md-4" key={index}>
                <div className="card h-100 border-0 shadow-sm overflow-hidden photo-card">
                  <div className="card-img-container">
                    <img src={room.img} className="card-img-top" alt={room.title} />
                  </div>
                  <div className="card-body p-4">
                    <h3 className="h4 fw-bold">{room.title}</h3>
                    <p className="text-muted mb-0">
                      Desde <span className="fw-bold text-dark">{room.price}</span> / noche
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= EXPERIENCIA ================= */}
<section className="py-5 d-flex start-0">
  <div
    className="container-fluid px-0 position-relative"
    style={{
      minHeight: "600px",
      background: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${experienciaImg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      display: "flex",
      alignItems: "center",
      borderRadius: "2rem",
      overflow: "hidden",
      margin: "0 1rem"
    }}
  >
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-7 text-white">
          
          <h6 className="text-primary-custom fw-bold text-uppercase mb-3 bg-white d-inline-block px-3 py-1 rounded-pill" style={{ fontSize: "0.8rem" }}>
            Experiencia StayHub
          </h6>

          <h2 className="display-4 fw-bold mb-4 text-white">
            Mucho más que una estancia de lujo.
          </h2>

          <p className="lead mb-5 opacity-90" style={{ maxWidth: "600px" }}>
            Nos enfocamos en los detalles que transforman un viaje en un recuerdo imborrable.
            Nuestra curaduría asegura espacios con carácter, alma y el máximo confort.
          </p>

          <div className="row g-3">
            
            <div className="col-sm-5">
              <div
                className="p-4 rounded-4 shadow-sm border-0"
                style={{
                  background: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)"
                }}
              >
                <span className="material-icons text-primary-custom mb-2">
                  check_circle
                </span>
                <h5 className="fw-bold text-dark mb-1">Exclusividad</h5>
                <p className="small text-muted mb-0">
                  Acceso a locaciones privadas y únicas.
                </p>
              </div>
            </div>

            <div className="col-sm-5">
              <div
                className="p-4 rounded-4 shadow-sm border-0"
                style={{
                  background: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)"
                }}
              >
                <span className="material-icons text-primary-custom mb-2">
                  auto_awesome
                </span>
                <h5 className="fw-bold text-dark mb-1">Confort</h5>
                <p className="small text-muted mb-0">
                  Estándares de calidad de 5 estrellas.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

    {/* Caja flotante */}
    <div className="bg-primary-custom text-white p-4 rounded-4 d-inline-block position-absolute bottom-0 end-0 m-5 shadow-lg">
      <h3 className="fw-bold mb-0">15k+</h3>
      <p className="small mb-0">Viajeros Felices</p>
    </div>

  </div>
</section>

      {/* ================= CTA FINAL ================= */}
      <section className="py-5 text-center border-top border-bottom">
        <div className="container py-5">
          <h2 className="display-5 fw-bold fst-italic mb-4">
            ¿Listo para tu próxima aventura?
          </h2>
          <button className="btn btn-primary-custom btn-lg rounded-pill px-5 py-3 fw-bold shadow-sm">
            Comenzar Reserva
          </button>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="py-5 border-top footer-custom">
  <div className="container py-5">
    <div className="row g-5">

      {/* LOGO + DESCRIPCIÓN */}
      <div className="col-lg-4">
        <div className="d-flex align-items-center fw-bold mb-4">
          <div className="bg-primary-custom p-1 rounded me-2 d-flex align-items-center">
            <span className="material-icons text-white">hotel</span>
          </div>
          <span className="text-dark">STAYHUB</span>
        </div>

        <p className="footer-text">
          Elevando el estándar de la hospitalidad moderna a través de diseños 
          excepcionales y experiencias personalizadas.
        </p>
      </div>

      {/* PLATAFORMA */}
      <div className="col-md-3 offset-lg-1">
        <h6 className="fw-bold mb-4">Plataforma</h6>
        <ul className="list-unstyled">
          <li className="mb-2">
            <Link to="/habitaciones" className="footer-link">Habitaciones</Link>
          </li>
          <li className="mb-2">
            <Link to="/" className="footer-link">Servicios VIP </Link>
          </li>
          <li className="mb-2">
            <Link to="/" className="footer-link">Membresias</Link>
          </li>
        </ul>
      </div>

      {/* COMPAÑÍA */}
      <div className="col-md-2">
        <h6 className="fw-bold mb-4">Compañía</h6>
        <ul className="list-unstyled">
          <li className="mb-2">
            <Link to="/" className="footer-link">Sobre nosotros</Link>
          </li>
          <li className="mb-2">
            <Link to="/" className="footer-link">Contacto</Link>
          </li>
        </ul>
      </div>

      {/* SOCIAL */}
      <div className="col-md-2">
        <h6 className="fw-bold mb-4">Social</h6>
        <div className="d-flex gap-3">
          <Link to="#" className="footer-icon">
            <span className="material-icons">camera_alt</span>
          </Link>
          <Link to="#" className="footer-icon">
            <span className="material-icons">facebook</span>
          </Link>
          <Link to="#" className="footer-icon">
            <span className="material-icons">language</span>
          </Link>
        </div>
      </div>

    </div>

    {/* COPYRIGHT */}
    <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-5 pt-4 border-top">
      <p className="text-muted small mb-3 mb-md-0">
        © 2024 StayHub S.A. Todos los derechos reservados.
      </p>

      <div className="d-flex gap-4">
        <Link to="#" className="footer-link small">Términos</Link>
        <Link  to="#" className="footer-link small">Privacidad</Link>
      </div>
    </div>
  </div>
</footer>
    </div>
  );
}

const rooms = [
  {
    title: "Zen Suite",
    price: "$240",
    img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511"
  },
  {
    title: "Oceanic Loft",
    price: "$310",
    img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
  },
  {
    title: "Urban Oasis",
    price: "$195",
    img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
  }
];
