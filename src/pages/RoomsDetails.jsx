import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRoomById } from "../services/room.service";
import ReservationForm from "../components/ReservationForm";

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRoomById(id)
      .then((res) => setRoom(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="text-center mt-5">Cargando habitación...</div>;
  }

  if (!room) {
    return <div className="text-center mt-5">Habitación no encontrada</div>;
  }

  return (
    <div style={{ backgroundColor: "#E9EBEA", minHeight: "100vh" }}>
      <div className="container py-5">
        <h1 className="fw-bold mb-4" style={{ color: "#B4280D" }}>
          {room.name}
        </h1>

        <div className="row">
          <div className="col-lg-8">
            <img
              src={room.images?.[0]}
              alt={room.name}
              className="img-fluid rounded shadow-sm mb-4"
              style={{ height: "400px", objectFit: "cover", width: "100%" }}
            />
            <div className="row">
              {room.images?.slice(1).map((img, index) => (
                <div key={index} className="col-md-4 mb-3">
                  <img
                    src={img}
                    alt={`img-${index}`}
                    className="img-fluid rounded"
                    style={{
                      height: "150px",
                      objectFit: "cover",
                      width: "100%",
                    }}
                  />
                </div>
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

          <div className="col-lg-4">
            <div
              className="card border-0 shadow-sm p-4"
              style={{  color: "#B4280D" }}
            >
              <h3 className="fw-bold" style={{ color: "#B4280D" }}>
                ${room.pricePerNight}
                <span style={{ fontSize: "14px", color: "#B19E8D" }}>
                  {" "}
                  / noche
                </span>
              </h3>

              <hr />

              <ReservationForm roomId={room._id} pricePerNight={room.price} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
