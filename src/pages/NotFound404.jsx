import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import notFoundAnimation from "../assets/lotties/404.json";

export default function NotFoundPage() {
  return (
    <div className="container-fluid bg-light min-vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-100 justify-content-center">
        <div className="col-12 col-md-8 col-lg-6 text-center">
          <div className="mx-auto mb-4" style={{ maxWidth: 550 }}>
            <Lottie animationData={notFoundAnimation} loop />
          </div>
          <h1 className="display-5 fw-bold">404</h1>
          <h4 className="mb-3"> Ups! pagina no encontrada</h4>
          <p className="text-muted mb-4">
            La página que estás buscando no existe o fue movida...
          </p>
          <Link to="/" className="btn btn-danger btn-lg px-4">
            Volver al Lobby
          </Link>

        </div>
      </div>
    </div>
  );
}
