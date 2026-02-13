import { useEffect, useState } from "react";
import { getRooms } from "../services/room.service";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRooms()
      .then((res) => setRooms(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" style={{ color: "#B4280D" }} />
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#E9EBEA", minHeight: "100vh" }}>
      <div className="container py-5">
        <h1 className="mb-4 fw-bold" style={{ color: "#B4280D" }}>
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
                }}
              >
                <img
                  src={room.image || "https://via.placeholder.com/400x250"}
                  className="card-img-top"
                  alt={room.name}
                  style={{
                    borderTopLeftRadius: "16px",
                    borderTopRightRadius: "16px",
                    height: "200px",
                    objectFit: "cover",
                  }}
                />

                <div className="card-body d-flex flex-column">
                  <h5 className="fw-semibold">{room.name}</h5>

                  <p
                    className="mb-2"
                    style={{ color: "#B19E8D", fontSize: "14px" }}
                  >
                    Capacidad: {room.capacity} huéspedes
                  </p>

                  <h4
                    className="mt-auto fw-bold"
                    style={{ color: "#B4280D" }}
                  >
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
                  >
                    Ver detalles
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rooms;
