import { useEffect, useState } from "react";

export default function UsersAdmin() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [alert, setAlert] = useState("");

  useEffect(() => {
    const storedUsers =
      JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  const openModal = (user) => {
    setSelectedUser(user);
    setForm(user);
    setErrors({});
    setIsCreating(false);
    setShowModal(true);
  };

  const openCreateModal = () => {
    setForm({
      nombre: "",
      apellido: "",
      email: "",
      password: "",
      role: "user",
    });
    setErrors({});
    setIsCreating(true);
    setShowModal(true);
  };

  const validate = () => {
    let newErrors = {};

    if (!form.nombre || form.nombre.length < 2)
      newErrors.nombre = "Nombre mínimo 2 caracteres";
    if (form.nombre?.length > 20)
      newErrors.nombre = "Máximo 20 caracteres";

    if (!form.apellido || form.apellido.length < 2)
      newErrors.apellido = "Apellido mínimo 2 caracteres";
    if (form.apellido?.length > 20)
      newErrors.apellido = "Máximo 20 caracteres";

    if (!form.email || !/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Email inválido";
    if (form.email?.length > 40)
      newErrors.email = "Máximo 40 caracteres";

    if (isCreating) {
      if (!form.password || form.password.length < 6)
        newErrors.password = "Mínimo 6 caracteres";
      if (form.password?.length > 20)
        newErrors.password = "Máximo 20 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDelete = (email) => {
    const updated = users.filter((u) => u.email !== email);

    localStorage.setItem("users", JSON.stringify(updated));
    setUsers(updated);

    setAlert("Usuario eliminado ");
    setTimeout(() => setAlert(""), 2000);

    setShowModal(false);
  };

  const handleSave = () => {
    if (!validate()) return;

    let updatedUsers;

    if (isCreating) {
      updatedUsers = [...users, form];
    } else {
      updatedUsers = users.map((u) =>
        u.email === selectedUser.email
          ? { ...u, ...form, password: u.password } 
          : u
      );
    }

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);

    setAlert(
      isCreating ? "Usuario creado ✅" : "Usuario actualizado"
    );

    setTimeout(() => setAlert(""), 2000);

    setShowModal(false);
  };

  return (
    <div className="container py-5">

      {alert && <div className="alert-pro">{alert}</div>}

      <div className="d-flex justify-content-between mb-5">
        <h2 className="fw-bold" style={{ color: "#B4280D" }}>
          Panel de Usuarios
        </h2>

        <button
          className="btn btn-danger px-4 rounded-pill btn-hover"
          onClick={openCreateModal}
        >
          + Crear Usuario
        </button>
      </div>

      <div className="row">
        {users.map((user, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div
              className="card user-card p-4"
              onClick={() => openModal(user)}
            >
              <h5>{user.nombre} {user.apellido}</h5>
              <p className="text-muted small">{user.email}</p>

              <span className={`role-badge ${user.role}`}>
                {user.role}
              </span>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="custom-modal">
          <div className="modal-box">

            <h4 className="mb-3">
              {isCreating ? "Crear Usuario" : "Editar Usuario"}
            </h4>

            <input
              className="form-control custom-input"
              placeholder="Nombre"
              maxLength={20}
              value={form.nombre}
              onChange={(e) =>
                setForm({ ...form, nombre: e.target.value })
              }
            />
            <small className="text-danger">{errors.nombre}</small>

            <input
              className="form-control custom-input"
              placeholder="Apellido"
              maxLength={20}
              value={form.apellido}
              onChange={(e) =>
                setForm({ ...form, apellido: e.target.value })
              }
            />
            <small className="text-danger">{errors.apellido}</small>

            <input
              className="form-control custom-input"
              placeholder="Email"
              maxLength={40}
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
            <small className="text-danger">{errors.email}</small>

            {isCreating && (
              <>
                <input
                  className="form-control custom-input"
                  placeholder="Contraseña"
                  type="text"
                  maxLength={20}
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
                <small className="text-danger">{errors.password}</small>
              </>
            )}

            <select
              className="form-select custom-input"
              value={form.role}
              onChange={(e) =>
                setForm({ ...form, role: e.target.value })
              }
            >
              <option value="user">Usuario</option>
              <option value="admin">Admin</option>
            </select>

            <div className="d-flex justify-content-between mt-4">

              {!isCreating && (
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(selectedUser.email)}
                >
                  Eliminar
                </button>
              )}

              <div className="ms-auto">
                <button
                  className="btn btn-light me-2"
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>

                <button
                  className="btn btn-success"
                  onClick={handleSave}
                >
                  Guardar
                </button>
              </div>

            </div>

          </div>
        </div>
      )}
    </div>
  );
}