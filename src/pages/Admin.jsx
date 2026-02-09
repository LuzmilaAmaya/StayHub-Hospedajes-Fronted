import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Admin() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const loadContacts = async () => {
      const res = await api.get("/contacts");
      setContacts(res.data);
    };

    loadContacts();
  }, []);

  return (
    <section>
      <h1>Mensajes Recibidos</h1>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Mensaje</th>
            <th>Fecha</th>
          </tr>
        </thead>

        <tbody>
          {contacts.map(c => (
            <tr key={c._id}>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.message}</td>
              <td>{new Date(c.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
