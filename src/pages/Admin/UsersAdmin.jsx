import { useEffect, useState } from "react";

export default function UsersAdmin() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers =
      JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  const deleteUser = (email) => {
    const confirmDelete = window.confirm(
      "¿Eliminar este usuario?"
    );

    if (!confirmDelete) return;

    const updatedUsers = users.filter(
      (user) => user.email !== email
    );

    localStorage.setItem(
      "users",
      JSON.stringify(updatedUsers)
    );

    setUsers(updatedUsers);
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4" style={{ color: "#B4280D" }}>
        Panel de Usuarios
      </h2>

      {users.length === 0 ? (
        <p>No hay usuarios registrados</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered shadow">
            <thead style={{ backgroundColor: "#B4280D", color: "white" }}>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Email</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user.nombre}</td>
                  <td>{user.apellido}</td>
                  <td>{user.email}</td>

                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteUser(user.email)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
}