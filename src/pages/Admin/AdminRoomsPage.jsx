import {
  getRooms,
  createRoom,
  updateRoom,
  deleteRoom,
} from "../../services/room.service.js";
import { useEffect, useState } from "react";

const initialForm = {
  _id: null,
  name: "",
  type: "",
  price: "",
  capacity: 1,
  image: null,
  preview: "",
  active: true,
};

export default function AdminRoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [isEditing, setIsEditing] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await getRooms();
        setRooms(response.data);
      } catch (error) {
        console.error("Error al cargar habitaciones:", error);
      }
    };

    fetchRooms();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "price" && value < 0) return;
    if (name === "price" && value.length > 7) return;
    if (name === "capacity" && value > 10) return;

    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setForm({
      ...form,
      image: file,
      preview: URL.createObjectURL(file),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        const response = await updateRoom(form._id, form);

        const updatedRooms = rooms.map((room) =>
          room._id === form._id ? response.data : room,
        );

        setRooms(updatedRooms);
        localStorage.setItem("rooms", JSON.stringify(updatedRooms));
        setIsEditing(false);
      } else {
        const response = await createRoom(form);

        const newRooms = [...rooms, response.data];
        setRooms(newRooms);
        localStorage.setItem("rooms", JSON.stringify(newRooms));
      }

      setForm(initialForm);
    } catch (error) {
      console.error("Error al guardar habitación:", error);
    }
  };

  const handleEdit = (room) => {
    setForm({
      ...room,
      image: room.image || "",
    });
    setIsEditing(true);
  };
  const handleDelete = async (id) => {
    try {
      await deleteRoom(id);
      const updatedRooms = rooms.filter((room) => room._id !== id);
      setRooms(updatedRooms);
      localStorage.setItem("rooms", JSON.stringify(updatedRooms));
    } catch (error) {
      console.error("Error al eliminar habitación:", error);
    }
  };
  const toggleVisibility = async (room) => {
    try {
      const updatedRoom = {
        ...room,
        active: !room.active,
      };

      const response = await updateRoom(room._id, updatedRoom);

      const updatedRooms = rooms.map((r) =>
        r._id === room._id ? response.data : r,
      );

      setRooms(updatedRooms);
      localStorage.setItem("rooms", JSON.stringify(updatedRooms));
    } catch (error) {
      console.error("Error al cambiar visibilidad:", error);
    }
  };
  const updateStatus = async (room, newStatus) => {
  try {
    const response = await updateRoom(room._id, {
      status: newStatus,
    });

    const updatedRooms = rooms.map((r) =>
      r._id === room._id ? response.data : r
    );

    setRooms(updatedRooms);
    localStorage.setItem("rooms", JSON.stringify(updatedRooms));
  } catch (error) {
    console.error("Error cambiando estado:", error);
  }
};

  return (
    <div className="container py-5">
      <h2 className="text-center fw-bold mb-4">Panel de Administración</h2>
      <div className="card shadow-sm mb-5">
        <div className="card-body">
          <h5 className="mb-4">
            {isEditing ? "Editar Habitación" : "Agregar Habitación"}
          </h5>

          <form onSubmit={handleSubmit}>
            <div className="row g-4">
              <div className="col-md-4">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  maxLength={40}
                  required
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">Tipo</label>
                <input
                  type="text"
                  className="form-control"
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  maxLength={20}
                  required
                />
              </div>

              <div className="col-md-2">
                <label className="form-label">Precio</label>
                <input
                  type="number"
                  className="form-control"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  min="0"
                  required
                />
              </div>

              <div className="col-md-2">
                <label className="form-label">Capacidad</label>
                <input
                  type="number"
                  className="form-control"
                  name="capacity"
                  value={form.capacity}
                  onChange={handleChange}
                  min="1"
                  max="10"
                  required
                />
                <small className="text-muted">Máx 10 personas</small>
              </div>

              <div className="col-12 text-end">
                <button type="submit" className="btn btn-danger px-4">
                  {isEditing ? "Actualizar" : "Agregar"}
                </button>
              </div>

              <div className="col-md-6">
                <label className="form-label">Imagen</label>
                <div className="input-group">
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
              </div>

              {form.preview && (
                <div className="col-12 text-center">
                  <img
                    src={form.preview}
                    alt="preview"
                    className="img-fluid rounded shadow"
                    style={{ maxHeight: "200px" }}
                  />
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="mb-4">Habitaciones Registradas</h5>

          <div className="table-responsive">
            <table className="table align-middle table-hover">
              <thead className="table-light">
                <tr>
                  <th>Imagen</th>
                  <th>Nombre</th>
                  <th>Tipo</th>
                  <th>Precio</th>
                  <th>Capacidad</th>
                  <th>Estado</th>
                  <th className="text-center">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {rooms.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center text-muted">
                      No hay habitaciones registradas
                    </td>
                  </tr>
                ) : (
                  rooms.map((room) => (
                    <tr key={room._id}>
                      <td>
                        {room.image && (
                          <img
                            src={room.image || "https://picsum.photos/300"}
                            alt={room.name}
                            style={{
                              width: "70px",
                              height: "50px",
                              objectFit: "cover",
                              borderRadius: "8px",
                            }}
                          />
                        )}
                      </td>
                      <td>{room.name}</td>
                      <td>{room.type}</td>
                      <td>${room.price}</td>
                      <td>{room.capacity}</td>
                      <td>
                        {room.status === "disponible" && "🟢 Disponible"}
                        {room.status === "reservada" && "🔴 Reservada"}
                        {room.status === "mantenimiento" && "🟡 Mantenimiento"}
                        {room.status === "fuera_servicio" &&
                          "⚫ Fuera de servicio"}
                      </td>
                      <td className="text-center">
                        <button
                          className={`btn btn-outline-primary btn-light btn-sm me-2 ${room.active ? "btn-success" : "btn-secondary"} me-2`}
                          onClick={() => toggleVisibility(room)}
                        >
                          {room.active ? "Ocultar" : "Mostrar"}
                        </button>
                        <select
                          className="form-select form-select-sm mt-2"
                          value={room.status || "disponible"}
                          onChange={(e) => updateStatus(room, e.target.value)}
                        >
                          <option value="disponible">Disponible</option>
                          <option value="reservada">Reservada</option>
                          <option value="mantenimiento">Mantenimiento</option>
                          <option value="fuera_servicio">
                            Fuera de servicio
                          </option>
                        </select>
                        <button
                          className="btn btn-outline-warning btn-sm me-2"
                          onClick={() => handleEdit(room)}
                        >
                          Editar
                        </button>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleDelete(room._id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
