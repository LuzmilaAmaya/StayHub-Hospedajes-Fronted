import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRooms } from "../services/room.service";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    getRooms()
      .then((res) => {
        setRooms(res.data);
      })
      .catch((err) => {
        console.error("ERROR:", err);
        setError("No se pudieron cargar las habitaciones");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <h4>Cargando habitaciones...</h4>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-5 text-danger">
        <h4>{error}</h4>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#E9EBEA", minHeight: "100vh" }}>
      <div className="container py-5">
        <h1 className="mb-5 fw-bold text-center" style={{ color: "#B4280D" }}>
          Nuestras Habitaciones
        </h1>

        <div className="row">
          {rooms.map((room) => (
            <div key={room._id} className="col-md-6 col-lg-4 mb-4">
              <div
                className="card border-0 shadow-sm h-100"
                style={{
                  backgroundColor: "#FEFEFE",
                  borderRadius: "16px",
                  transition: "0.3s",
                  cursor: "pointer",
                }}
                onClick={() => navigate(`/habitaciones/${room._id}`)}
              >
                <img
                  src={
                    room.images?.[0] ||
                    "https://picsum.photos/400/250"
                  }
                  className="card-img-top"
                  alt={room.name}
                  style={{
                    borderTopLeftRadius: "16px",
                    borderTopRightRadius: "16px",
                    height: "220px",
                    objectFit: "cover",
                  }}
                />

                <div className="card-body d-flex flex-column">
                  <h5 className="fw-semibold mb-2">{room.name}</h5>

                  <p
                    className="mb-2"
                    style={{ color: "#B19E8D", fontSize: "14px" }}
                  >
                    👥 Capacidad: {room.capacity} huéspedes
                  </p>

                  <p
                    style={{ fontSize: "14px", color: "#666" }}
                    className="flex-grow-1"
                  >
                    {room.description?.slice(0, 80)}...
                  </p>

                  <h4 className="fw-bold mt-auto" style={{ color: "#B4280D" }}>
                    ${room.pricePerNight}
                    <span
                      style={{
                        fontSize: "14px",
                        color: "#B19E8D",
                        fontWeight: "normal",
                      }}
                    >
                      {" "}
                      / noche
                    </span>
                  </h4>

                  <button
                    className="btn mt-3"
                    style={{
                      backgroundColor: "#B4280D",
                      color: "#FEFEFE",
                      borderRadius: "10px",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/habitaciones/${room._id}`);
                    }}
                  >
                    Ver detalles
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {rooms.length === 0 && (
          <div className="text-center mt-5">
            <h5>No hay habitaciones disponibles</h5>
          </div>
        )}
      </div>
    </div>
  );
};

export default Rooms;