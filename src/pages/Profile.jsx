import { useState } from "react";
import { updateUser } from "../services/user.service";

export default function Profile() {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(storedUser);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const res = await updateUser(user._id, user);
    setUser(res.data);
    localStorage.setItem("user", JSON.stringify(res.data));
  };

  return (
    <div>
      <h2>Mi Perfil</h2>

      <input name="fullName" value={user.fullName} onChange={handleChange} />

      <input name="phone" value={user.phone} onChange={handleChange} />

      <button onClick={handleSave}>Guardar</button>
    </div>
  );
}
