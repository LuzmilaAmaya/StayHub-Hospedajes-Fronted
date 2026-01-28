import { useEffect, useState } from "react";
import { getRooms } from "../services/room.service";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    getRooms().then((res) => setRooms(res.data));
  }, []);

  return (
    <div>
      <h1>Habitaciones</h1>
      {rooms.map((room) => (
        <div key={room._id}>
          <h3>{room.name}</h3>
          <p>${room.pricePerNight}</p>
        </div>
      ))}
    </div>
  );
};

export default Rooms;
