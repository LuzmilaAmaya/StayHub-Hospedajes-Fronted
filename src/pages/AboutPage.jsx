import { Link } from "react-router-dom";
import "./AboutPage.css";
import "./HomePage.css";
import Footer from "../components/Footer";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function About() {
  return (
    <>
      <section className="about-hero">
        <div className="about-hero-overlay">
          <span className="about-tag">Desde 2026</span>
          <h1>Nuestra Historia</h1>
          <p>
            Redefiniendo el lujo y la exclusividad en cada estancia. Creamos
            experiencias, no solo reservas.
          </p>
          <Link to="/" className="back-home-btn">
            Volver al Inicio
          </Link>
        </div>
      </section>

      <section className="py-5 bg-light ">
        <div className="container">
          <div className="row align-items-center mb-5">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <h6 className="text-danger text-uppercase fw-bold mb-3">
                Propósito
              </h6>

              <h2 className="fw-bold display-5 mb-4">Misión y Valores</h2>

              <p className="text-muted fs-5">
                En StayHub, nuestra pasión es crear momentos inolvidables a
                través de la excelencia y el compromiso con el detalle. No
                buscamos ser los más grandes, sino los más excepcionales.
              </p>

              <div className="d-flex gap-3 mt-4">
                <div
                  style={{ height: "4px", width: "80px" }}
                  className="bg-danger rounded"
                ></div>
                <div
                  style={{ height: "4px", width: "40px" }}
                  className="bg-secondary rounded"
                ></div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="row g-4">
                <div className="col-sm-6">
                  <div className="card shadow-sm border-0 h-100 p-3">
                    <h5 className="fw-bold">Excelencia</h5>
                    <p className="text-muted small">
                      Buscamos la perfección en cada reserva y atención
                      personalizada.
                    </p>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="card shadow-sm border-0 h-100 p-3">
                    <h5 className="fw-bold">Integridad</h5>
                    <p className="text-muted small">
                      Actuamos con total transparencia y honestidad en cada
                      trato.
                    </p>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="card shadow-sm border-0 h-100 p-3">
                    <h5 className="fw-bold">Exclusividad</h5>
                    <p className="text-muted small">
                      Acceso a propiedades distinguidas y experiencias únicas.
                    </p>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="card shadow-sm border-0 h-100 p-3">
                    <h5 className="fw-bold">Sostenibilidad</h5>
                    <p className="text-muted small">
                      Comprometidos con el turismo responsable y el impacto
                      positivo.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="about-team">
        <div className="container">
          <h2>Conoce a nuestro equipo!</h2>

          <div className="team-grid">
            <div className="team-card w-25 container-lg">
              <img
                src="https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"
                alt="Miembro 2"
              />
              <h4>Luzmila Amaya</h4>
              <span>Diseño y Creacion de la pagina.</span>
            </div>
          </div>
        </div>
      </section>
      <section></section>
    </>
  );
}
