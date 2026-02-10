import Lottie from "lottie-react";
import notFoundAnimation from "../assets/lotties/404.json";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <div style={{ width: 350 }}>
        <Lottie animationData={notFoundAnimation} loop />
      </div>

      <h2>Página no encontrada</h2>
      <p>La ruta que buscás no existe.</p>

      <Link to="/" className="btn btn-primary mt-3">
        Volver al inicio
      </Link>
    </div>
  );
}
