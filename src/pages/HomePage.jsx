import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRooms } from "../services/room.service.js";
import "./HomePage.css";
import logo from "../assets/logonegro.png";
import experienciaImg from "../assets/experiencia.png";

export default function HomePage() {
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
  const fetchRooms = async () => {
    try {
      const response = await getRooms();

      const visibleRooms = response.data.filter(
        (room) => room.active !== false
      );

      setRooms(visibleRooms);
    } catch (error) {
      console.error("Error cargando habitaciones:", error);
    }
  };

  fetchRooms();
}, []);

  return (
    <div>
      <header className="hero-section text-center py-5">
        <div className="container">
          <h6 className="hero-badge">Tu escape ideal comienza aquí</h6>

          <h1 className="display-2 fw-bold mb-4 text-white">
            Bienvenido a StayHub:
            <br />
            Descubre la comodidad y el lujo
          </h1>

          <p className="lead mb-5 mx-auto text-white hero-text">
            Reserva tu habitación perfecta con nosotros y vive una experiencia
            inolvidable.
          </p>
        </div>
      </header>

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

          <div className="cards-container">
            {rooms.map((room) => (
              <div className="card-wrapper" key={room._id}>
                <Link
                  to={`/habitaciones/${room._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="card h-100 border-0 shadow-sm overflow-hidden photo-card">
                    <div className="card-img-container">
                      <img
                        src={
                          room.images?.[0] || "https://picsum.photos/400/250"
                        }
                        className="card-img-top"
                        alt={room.name}
                      />
                    </div>

                    <div className="card-body p-4">
                      <h3 className="h4 fw-bold">{room.name}</h3>

                      <p className="text-muted mb-2">{room.description}</p>

                      <p className="text-muted mb-0">
                        Desde{" "}
                        <span className="fw-bold text-dark">
                          ${room.pricePerNight}
                        </span>{" "}
                        / noche
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

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
            margin: "0 1rem",
          }}
        >
          <div className="container py-5">
            <div className="row">
              <div className="col-lg-7 text-white">
                <h6
                  className="text-primary-custom fw-bold text-uppercase mb-3 bg-white d-inline-block px-3 py-1 rounded-pill"
                  style={{ fontSize: "0.8rem" }}
                >
                  Experiencia StayHub
                </h6>

                <h2 className="display-4 fw-bold mb-4 text-white">
                  Mucho más que una estancia de lujo.
                </h2>

                <p
                  className="lead mb-5 opacity-90"
                  style={{ maxWidth: "600px" }}
                >
                  Nos enfocamos en los detalles que transforman un viaje en un
                  recuerdo imborrable. Nuestra curaduría asegura espacios con
                  carácter, alma y el máximo confort.
                </p>

                <div className="row g-3">
                  <div className="col-sm-5">
                    <div
                      className="p-4 rounded-4 shadow-sm border-0"
                      style={{
                        background: "rgba(255, 255, 255, 0.9)",
                        backdropFilter: "blur(10px)",
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
                        backdropFilter: "blur(10px)",
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

          <div className="bg-primary-custom text-white p-4 rounded-4 d-inline-block position-absolute bottom-0 end-0 m-5 shadow-lg">
            <h3 className="fw-bold mb-0">15k+</h3>
            <p className="small mb-0">Viajeros Felices</p>
          </div>
        </div>
      </section>

      <section className="py-5 text-center border-top border-bottom">
        <div className="container py-5">
          <h2 className="display-5 fw-bold fst-italic mb-4">
            ¿Listo para tu próxima aventura?
          </h2>
          <Link
            to="/habitaciones"
            className="btn btn-primary-custom btn-lg rounded-pill px-5 py-3 fw-bold shadow-sm"
          >
            Comenzar Reserva
          </Link>
        </div>
      </section>
    </div>
  );
}
