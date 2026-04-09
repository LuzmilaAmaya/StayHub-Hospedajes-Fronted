import { useState } from "react";
import { login } from "../services/auth.service";
import { useNavigate, Link } from "react-router-dom";
import { loginWithGoogle } from "../services/auth.service";
import { googleLoginBackend } from "../services/auth.service";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      window.dispatchEvent(new Event("authChange"));

      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || "Credenciales incorrectas");
    }
  };
  const [loadingGoogle, setLoadingGoogle] = useState(false);

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
    <div className="login-bg d-flex align-items-center justify-content-center">
      <div className="card login-card shadow-lg p-4">
        <h3 className="text-center mb-4 fw-bold">Bienvenido 👋</h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control input-custom"
              placeholder="correo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control input-custom"
              placeholder="ingrese su contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-danger w-100 btn-custom">Entrar</button>
          <button
            type="button"
            className="btn btn-danger w-100 mt-2"
            onClick={handleGoogleLogin}
             disabled={loadingGoogle}
          >
            {loadingGoogle ? "Cargando..." : "Iniciar sesion con Google"}
          </button>
        </form>

        <p className="text-center mt-3 mb-0">
          ¿No tenés cuenta? <Link to="/registro">Registrate</Link>
        </p>
      </div>
    </div>
  );
}
