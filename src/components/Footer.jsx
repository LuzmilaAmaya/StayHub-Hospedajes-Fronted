export default function Footer() {
  return (
    <footer className="py-5 border-top bg-white">
      <div className="container py-5">
        <div className="row g-5">
          <div className="col-lg-4">
            <div className="d-flex align-items-center fw-bold mb-4">
              <div className="bg-primary-custom p-1 rounded me-2 d-flex align-items-center">
                <span className="material-icons text-white">hotel</span>
              </div>
              <span className="text-dark">STAYHUB</span>
            </div>

            <p className="footer-text">
              Elevando el estándar de la hospitalidad moderna a través de
              diseños excepcionales y experiencias personalizadas.
            </p>
          </div>
          <div className="col-md-3 offset-lg-1">
            <h6 className="fw-bold mb-4">Plataforma</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/habitaciones" className="footer-link">
                  Habitaciones
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="footer-link">
                  Servicios VIP
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="footer-link">
                  Membresías
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-2">
            <h6 className="fw-bold mb-4">Compañía</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="footer-link">
                  Sobre nosotros
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="footer-link">
                  Contacto
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-2">
            <h6 className="fw-bold mb-4">Social</h6>
            <div className="d-flex gap-3">
              <a href="#" className="footer-icon">
                <span className="material-icons">camera_alt</span>
              </a>
              <a href="#" className="footer-icon">
                <span className="material-icons">facebook</span>
              </a>
              <a href="#" className="footer-icon">
                <span className="material-icons">language</span>
              </a>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-5 pt-4 border-top">
          <p className="text-muted small mb-0">
            © {new Date().getFullYear()} StayHub S.A. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
