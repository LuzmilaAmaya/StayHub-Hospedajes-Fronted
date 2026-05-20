import { useState } from "react";
import { login, loginWithGoogle, googleLoginBackend } from "../services/auth.service";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../pages/login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

console.log(JSON.parse(localStorage.getItem("user")));

      window.dispatchEvent(new Event("authChange"));

      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || "Credenciales incorrectas");
    }
  };

  const handleGoogleLogin = async () => {
    if (loadingGoogle) return;

    setLoadingGoogle(true);

    try {
      const firebaseUser = await loginWithGoogle();

      const res = await googleLoginBackend({
        fullName: firebaseUser.displayName,
        email: firebaseUser.email,
        googleId: firebaseUser.uid,
        photo: firebaseUser.photoURL,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      window.dispatchEvent(new Event("authChange"));

      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Error con Google");
    } finally {
      setLoadingGoogle(false);
    }
  };

  return (
    <div className="login-bg">
      <div
        id="bgCarousel"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945"
              className="d-block w-100 bg-img"
              alt="hotel1"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b"
              className="d-block w-100 bg-img"
              alt="hotel2"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1590490360182-c33d57733427"
              className="d-block w-100 bg-img"
              alt="hotel3"
            />
          </div>
        </div>
      </div>

      <div className="login-card">
        <h2 className="title">Bienvenido</h2>

        {error && <div className="alert-pro">{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="password-group">
            <input
              type={showPass ? "text" : "password"}
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <span className="eye" onClick={() => setShowPass(!showPass)}>
              {showPass ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button className="btn-login">Entrar</button>

          <button
            type="button"
            className="btn-google"
            onClick={handleGoogleLogin}
            disabled={loadingGoogle}
          >
            {loadingGoogle ? "Cargando..." : "Iniciar sesión con Google"}
          </button>
        </form>

        <p className="register-link">
          ¿No tenés cuenta? <Link to="/registro">Registrate</Link>
        </p>
      </div>
    </div>
  );
}