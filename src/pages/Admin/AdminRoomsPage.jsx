import { useState } from "react";

const initialForm = {
  id: null,
  name: "",
  type: "",
  price: "",
  capacity: "",
};

export default function AdminRoomPage() {
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
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
    <div className="container mt-4">
      <h2 className="mb-4">Administración de Habitaciones</h2>

      {/* FORMULARIO */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-3">
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Nombre"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Tipo"
              name="type"
              value={form.type}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-2">
            <input
              type="number"
              className="form-control"
              placeholder="Precio"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-2">
            <input
              type="number"
              className="form-control"
              placeholder="Capacidad"
              name="capacity"
              value={form.capacity}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-2 d-grid">
            <button className="btn btn-primary">
              {isEditing ? "Editar" : "Agregar"}
            </button>
          </div>
        </div>
      </form>

      {/* LISTADO */}
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Precio</th>
            <th>Capacidad</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {rooms.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">
                No hay habitaciones registradas
              </td>
            </tr>
          ) : (
            rooms.map((room) => (
              <tr key={room.id}>
                <td>{room.name}</td>
                <td>{room.type}</td>
                <td>${room.price}</td>
                <td>{room.capacity}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(room)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
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
  );
}
