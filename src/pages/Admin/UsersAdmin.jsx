import { useEffect, useState } from "react";
import {
  getUsers,
  updateUser,
  deleteUser,
} from "../../services/user.service";

export default function UsersAdmin() {
  const [users, setUsers] = useState([]);
  const loggedUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleUser = async (user) => {
    try {
      const res = await updateUser(user._id, {
        isActive: !user.isActive,
      });

      setUsers((prev) =>
        prev.map((u) =>
          u._id === user._id ? res.data : u
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const changeRole = async (user, role) => {
    try {
      const res = await updateUser(user._id, {
        role,
      });

      setUsers((prev) =>
        prev.map((u) =>
          u._id === user._id ? res.data : u
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const removeUser = async (id) => {
    const confirmDelete = window.confirm(
      "¿Eliminar usuario?"
    );

    if (!confirmDelete) return;

    try {
      await deleteUser(id);

      setUsers((prev) =>
        prev.filter((u) => u._id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4 text-danger">
        Panel de Usuarios
      </h2>

      <div className="row">
        {users.map((user) => (
          <div className="col-md-4 mb-4" key={user._id}>
            <div className="card shadow border-0 p-4 h-100">
              <h5>{user.fullName}</h5>

              <p className="text-muted small">
                {user.email}
              </p>

              <p>
                Rol:
                <span className="fw-bold ms-2">
                  {user.role}
                </span>
              </p>

              <p>
                Estado:
                {user.isActive ? (
                  <span className="text-success fw-bold ms-2">
                    Activo
                  </span>
                ) : (
                  <span className="text-danger fw-bold ms-2">
                    Baneado
                  </span>
                )}
              </p>

              {loggedUser?._id !== user._id && (
                <>
                  <button
                    className={`btn mb-2 ${
                      user.isActive
                        ? "btn-danger"
                        : "btn-success"
                    }`}
                    onClick={() => toggleUser(user)}
                  >
                    {user.isActive
                      ? "Banear"
                      : "Activar"}
                  </button>

                  <select
                    className="form-select mb-2"
                    value={user.role}
                    onChange={(e) =>
                      changeRole(user, e.target.value)
                    }
                  >
                    <option value="guest">
                      Guest
                    </option>

                    <option value="reception">
                      Reception
                    </option>

                    <option value="admin">
                      Admin
                    </option>
                  </select>

                  <button
                    className="btn btn-outline-danger"
                    onClick={() =>
                      removeUser(user._id)
                    }
                  >
                    Eliminar
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}