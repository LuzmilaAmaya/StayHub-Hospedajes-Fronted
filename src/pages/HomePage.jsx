import { Link } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {
  return (
    <div>

      {/* ================= NAVBAR ================= */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top border-bottom">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center fw-bold" to="/">
            <div className="bg-primary-custom p-1 rounded me-2 d-flex align-items-center">
              <span className="material-icons text-white">hotel</span>
            </div>
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
                <Link className="nav-link fw-semibold px-3" to="/rooms">
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
            </ul>

            <div className="d-flex gap-2 align-items-center">
              <Link className="btn btn-link text-dark fw-bold px-3" to="/login">
                Iniciar Sesión
              </Link>
              <Link className="btn btn-primary-custom rounded-pill px-4 fw-bold" to="/register">
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
      <section className="py-5">
        <div className="container py-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <h6 className="text-primary-custom fw-bold text-uppercase mb-3">
                Experiencia StayHub
              </h6>
              <h2 className="display-4 fw-bold mb-4">
                Mucho más que una estancia de lujo.
              </h2>
              <p className="text-muted mb-5">
                Nos enfocamos en los detalles que transforman un viaje en un recuerdo imborrable.
              </p>
            </div>

            <div className="col-lg-6 position-relative">
              <div className="rounded-4 overflow-hidden shadow-lg">
                <img
                  className="img-fluid"
                  src="https://img3.wallspic.com/crops/3/3/1/6/6/166133/166133-playa-las_playas_de_hawai-agua-los_recursos_de_agua-paisaje_natural-3840x2160.jpg"
                  alt="Experiencia"
                />
              </div>
              <div className="experience-badge">
                <h3 className="fw-bold mb-0">15k+</h3>
                <p className="small mb-0">Viajeros Felices</p>
              </div>
            </div>
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
      <footer className="py-5 border-top bg-white">
        <div className="container">
          <p className="text-muted text-center mb-0">
            © 2024 StayHub S.A. Todos los derechos reservados.
          </p>
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
