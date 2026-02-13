import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../../services/user.service";

export default function UsersAdmin() {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    const res = await getUsers();
    setUsers(res.data);
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    loadUsers();
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div>
      <h2>Administrar Usuarios</h2>

      {users.map((u) => (
        <div key={u._id}>
          <span>
            {u.fullName} - {u.role}
          </span>
          <button onClick={() => handleDelete(u._id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
}
