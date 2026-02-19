import { useState } from "react";

const initialForm = {
  id: null,
  name: "",
  type: "",
  price: "",
  capacity: 1,
  image: null,
  preview: "",
};

export default function AdminRoomPage() {
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "price" && value < 0) return;
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      setRooms(rooms.map((room) => (room.id === form.id ? form : room)));
      setIsEditing(false);
    } else {
      setRooms([...rooms, { ...form, id: Date.now() }]);
    }

    setForm(initialForm);
  };

  const handleEdit = (room) => {
    setForm(room);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    setRooms(rooms.filter((room) => room.id !== id));
  };

  return (
    <div className="container py-5">
      <h2 className="text-center fw-bold mb-4">Panel de Administración</h2>

      {/* CARD FORM */}
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

      {/* panel admin */}
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
                    <tr key={room.id}>
                      <td>
                        {room.preview && (
                          <img
                            src={room.preview}
                            alt=""
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
                      <td className="text-center">
                        <button
                          className="btn btn-outline-warning btn-sm me-2"
                          onClick={() => handleEdit(room)}
                        >
                          Editar
                        </button>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleDelete(room.id)}
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
