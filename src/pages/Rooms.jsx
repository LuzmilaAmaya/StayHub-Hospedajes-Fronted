import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRooms } from "../services/room.service";
import { updateRoom } from "../services/room.service";
import "./Rooms.css";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const toggleVisibility = async (room) => {
    try {
      await updateRoom(room._id, {
        active: !room.active,
      });

      setRooms((prevRooms) =>
        prevRooms.map((r) =>
          r._id === room._id ? { ...r, active: !r.active } : r,
        ),
      );
    } catch (error) {
      console.error("Error cambiando visibilidad:", error);
    }
  };
  useEffect(() => {
    getRooms()
      .then((res) => {
        console.log("ROOMS RESPONSE:", res.data);
        setRooms(res.data.filter((room) => room.active));
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
      <div className="text-center mt-5">
        <div className="spinner-border text-danger" role="status"></div>
        <p className="mt-3">Cargando habitaciones...</p>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#E9EBEA", minHeight: "100vh" }}>
      <div className="container py-5">
        <h1 className="mb-5 fw-bold text-center" style={{ color: "#B4280D" }}>
          Nuestras Habitaciones
        </h1>

        <div className="cards-container">
          {rooms?.length > 0 &&
            rooms
              .filter(
                (room) =>
                  user?.role === "admin" || room.status !== "fuera_servicio",
              )
              .map((room) => (
                <div key={room._id} className="card-wrapper">
                  <div
                    className="card border-0 shadow-sm h-100"
                    style={{
                      backgroundColor: "#FEFEFE",
                      borderRadius: "16px",
                      transition: "0.3s",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      src={
                        room.image ||
                        room.images?.[0] ||
                        "https://picsum.photos/400/250"
                      }
                      className="card-img-top"
                      alt={room.name}
                      onError={(e) => {
                        e.target.src = "https://picsum.photos/400/250";
                      }}
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
                        {room.description
                          ? room.description.slice(0, 80) + "..."
                          : "Sin descripción"}
                      </p>

                      <h4
                        className="fw-bold mt-auto"
                        style={{ color: "#B4280D" }}
                      >
                        ${room.pricePerNight || room.price}
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

                      {user ? (
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
                      ) : (
                        <button
                          className="btn mt-3"
                          style={{
                            backgroundColor: "#6c757d",
                            color: "#fff",
                            borderRadius: "10px",
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate("/login");
                          }}
                        >
                          Inicia sesión
                        </button>
                      )}
                      {user?.role === "admin" && (
                        <button
                          className="btn mt-2"
                          style={{
                            backgroundColor: room.active
                              ? "#dc3545"
                              : "#28a745",
                            color: "#fff",
                            borderRadius: "10px",
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleVisibility(room);
                          }}
                        >
                          {room.active ? "Ocultar del Home" : "Mostrar en Home"}
                        </button>
                      )}
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
