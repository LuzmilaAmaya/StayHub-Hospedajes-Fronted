import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.isActive === false) {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    return <Navigate to="/404" />;
  }

  return children;
}