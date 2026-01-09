import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div>
      <h1>StayHub</h1>
      <Link to="/reservas">Ver reservas</Link>
    </div>
  );
}
