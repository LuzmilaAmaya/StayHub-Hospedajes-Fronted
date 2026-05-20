import { useEffect, useState } from "react";
import { updateUser } from "../services/user.service";
import { getReservations } from "../services/reservation.service";

export default function Profile() {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [photo, setPhoto] = useState(
    storedUser.photo ||
      "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"
  );

  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const res = await getReservations();

      const userReservations = res.data.filter(
        (reservation) =>
          reservation.user === storedUser._id ||
          reservation.user?._id === storedUser._id
      );

      setReservations(userReservations);
    } catch (error) {
      console.error("Error cargando reservas", error);
    }
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("photo", file);

      const res = await updateUser(
        storedUser._id,
        formData
      );

      const updatedUser = res.data;

      setPhoto(updatedUser.photo);

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );
    } catch (error) {
      console.error("Error actualizando foto", error);
    }
  };

  return (
    <div className="container py-5">
      <div className="row g-4">
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm p-4 text-center">
            <img
              src={photo}
              alt="profile"
              className="mx-auto mb-3"
              style={{
                width: "130px",
                height: "130px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />

            <input
              type="file"
              accept="image/*"
              className="form-control"
              onChange={handlePhotoChange}
            />

            <hr />

            <h4>{storedUser.fullName}</h4>

            <p className="text-muted mb-1">{storedUser.email}</p>

            <p>
              {storedUser.phone || "Sin teléfono registrado"}
            </p>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="card border-0 shadow-sm p-4">
            <h3 className="mb-4">Mis Reservas</h3>

            {reservations.length === 0 ? (
              <p>No tienes reservas todavía.</p>
            ) : (
              <div className="row g-3">
                {reservations.map((reservation) => (
                  <div
                    key={reservation._id}
                    className="col-md-6"
                  >
                    <div className="card h-100 border-0 shadow-sm">
                      <div className="card-body">
                        <h5>
                          {reservation.room?.title || "Habitación"}
                        </h5>

                        <p className="mb-1">
                          <strong>Check-in:</strong>{" "}
                          {new Date(
                            reservation.checkIn
                          ).toLocaleDateString()}
                        </p>

                        <p className="mb-1">
                          <strong>Check-out:</strong>{" "}
                          {new Date(
                            reservation.checkOut
                          ).toLocaleDateString()}
                        </p>

                        <p className="mb-0">
                          <strong>Estado:</strong>{" "}
                          {reservation.status || "Confirmada"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

