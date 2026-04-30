import { getRoomById } from "../services/room.service";
import ReservationForm from "../components/ReservationForm";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";

const RoomDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

 console.log("ROOM ID:", id);

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  if (!id) {
    return <Navigate to="/habitaciones" replace />;
  }
  useEffect(() => {
  if (!id) return;

  console.log("ROOM ID EN DETALLE:", id);

  getRoomById(id)
    .then((res) => setRoom(res.data))
    .catch((err) => console.log("ERROR API:", err))
    .finally(() => setLoading(false));
}, [id]);

  if (loading)
    return <div className="text-center mt-5">Cargando habitación...</div>;
  if (!room)
    return <div className="text-center mt-5">Habitación no encontrada</div>;

  return (
    <div style={{ backgroundColor: "#E9EBEA", minHeight: "100vh" }}>
      <div className="container py-5">
        <h1 className="fw-bold mb-4" style={{ color: "#B4280D" }}>
          {room.name}
        </h1>

        <div className="room-detail-container">
          <div className="room-info">
            <img
              src={room.images?.[0]}
              alt={room.name}
              className="img-fluid rounded shadow-sm mb-4"
              style={{ height: "400px", objectFit: "cover", width: "100%" }}
            />

            <div className="room-gallery">
              {room.images?.slice(1).map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`img-${index}`}
                  className="gallery-img"
                />
              ))}
            </div>

            <div className="card border-0 shadow-sm p-4 mt-4">
              <h4>Detalles</h4>
              <p>
                <strong>Tipo:</strong> {room.type}
              </p>
              <p>
                <strong>Capacidad:</strong> {room.capacity} huéspedes
              </p>
              <p>{room.description}</p>
            </div>
          </div>

          <div className="room-form">
            <div className="card border-0 shadow-sm p-4">
              <h3 className="fw-bold" style={{ color: "#B4280D" }}>
                ${room.pricePerNight || room.price}
              </h3>

              <hr />

              {room.status === "disponible" ? (
                <ReservationForm
                 id={room._id}
                  pricePerNight={room.pricePerNight || room.price}
                />
              ) : (
                <div className="text-center">
                  <h5 className="fw-bold text-danger">
                    {room.status === "reservada" &&
                      "Esta habitación ya fue reservada"}
                    {room.status === "mantenimiento" &&
                      "Esta habitación está en mantenimiento"}
                    {room.status === "fuera_servicio" &&
                      "Esta habitación está fuera de servicio"}
                  </h5>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
