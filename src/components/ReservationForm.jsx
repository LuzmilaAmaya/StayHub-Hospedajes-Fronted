import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createReservation } from "../services/reservation.service";


const toInputDate = (date) => date.toISOString().split("T")[0];

const getDiffDays = (from, to) => {
  const ms = new Date(to) - new Date(from);
  return Math.ceil(ms / (1000 * 60 * 60 * 24));
};

export default function ReservationForm({ roomId, pricePerNight }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const [form, setForm] = useState({
    checkIn: toInputDate(today),
    checkOut: toInputDate(tomorrow),
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const validate = () => {
    const errs = {};
    const todayStr = toInputDate(new Date());

    if (!form.checkIn) {
      errs.checkIn = "Seleccioná una fecha de entrada.";
    } else if (form.checkIn < todayStr) {
      errs.checkIn = "La fecha de entrada no puede ser en el pasado.";
    }

    if (!form.checkOut) {
      errs.checkOut = "Seleccioná una fecha de salida.";
    } else if (form.checkOut <= form.checkIn) {
      errs.checkOut = "La salida debe ser al menos un día después de la entrada.";
    }

    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setApiError("");
    setErrors((prev) => ({ ...prev, [name]: "" }));

    if (name === "checkIn") {
      const newIn = new Date(value);
      newIn.setHours(0, 0, 0, 0);
      const autoOut = new Date(newIn);
      autoOut.setDate(newIn.getDate() + 1);
      setForm({
        checkIn: value,
        checkOut: form.checkOut <= value ? toInputDate(autoOut) : form.checkOut,
      });
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) { navigate("/login"); return; }

    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    try {
      setLoading(true);
      await createReservation({
        room: roomId,
        guest: user._id,
        checkIn: form.checkIn,
        checkOut: form.checkOut,
      });
      setSuccess(true);
    } catch (err) {
      setApiError(err?.response?.data?.message || "Error al crear la reserva.");
    } finally {
      setLoading(false);
    }
  };

  const nights =
    form.checkIn && form.checkOut ? getDiffDays(form.checkIn, form.checkOut) : 0;
  const total = pricePerNight && nights > 0 ? pricePerNight * nights : null;

  // Mínimo para checkOut = checkIn + 1 día
  const minCheckOut = () => {
    if (!form.checkIn) return toInputDate(tomorrow);
    const d = new Date(form.checkIn);
    d.setDate(d.getDate() + 1);
    return toInputDate(d);
  };

  /* ── Sin sesión ── */
  if (!user) {
    return (
      <div style={s.lockedBox}>
        <div style={s.lockCircle}>
          <span className="material-icons" style={{ fontSize: "1.5rem", color: "#B4280D" }}>lock</span>
        </div>
        <p style={s.lockTitle}>Iniciá sesión para reservar</p>
        <p style={s.lockSub}>Tu experiencia comienza con una cuenta</p>
        <button style={s.btnPrimary} onClick={() => navigate("/login")}>
          Iniciar Sesión
        </button>
        <button style={s.btnGhost} onClick={() => navigate("/registro")}>
          Crear cuenta gratis
        </button>
      </div>
    );
  }

  /* ── Éxito ── */
  if (success) {
    return (
      <div style={s.successBox}>
        <div style={s.successCircle}>
          <span className="material-icons" style={{ fontSize: "1.8rem", color: "#fff" }}>check</span>
        </div>
        <p style={s.successTitle}>¡Reserva confirmada!</p>
        <p style={s.successSub}>
          Hola <strong>{user.fullName}</strong>, te esperamos.
        </p>
        <button
          style={{ ...s.btnGhost, marginTop: "0.75rem" }}
          onClick={() => setSuccess(false)}
        >
          Hacer otra reserva
        </button>
      </div>
    );
  }

  /* ── Formulario ── */
  return (
    <form onSubmit={handleSubmit} noValidate>

      {/* Badge usuario */}
      <div style={s.userBadge}>
        <div style={s.avatar}>{user.fullName?.[0]?.toUpperCase() || "U"}</div>
        <div>
          <p style={s.userName}>{user.fullName}</p>
          <p style={s.userEmail}>{user.email}</p>
        </div>
      </div>

      {apiError && <div style={s.apiError}>{apiError}</div>}

      {/* Fechas */}
      <div style={s.datesGrid}>
        <div>
          <label style={s.label}>
            <span className="material-icons" style={s.labelIcon}>flight_land</span>
            Check-in
          </label>
          <input
            type="date"
            name="checkIn"
            value={form.checkIn}
            min={toInputDate(today)}
            onChange={handleChange}
            style={{ ...s.input, ...(errors.checkIn ? s.inputErr : {}) }}
            required
          />
          {errors.checkIn && <span style={s.errMsg}>{errors.checkIn}</span>}
        </div>

        <div>
          <label style={s.label}>
            <span className="material-icons" style={s.labelIcon}>flight_takeoff</span>
            Check-out
          </label>
          <input
            type="date"
            name="checkOut"
            value={form.checkOut}
            min={minCheckOut()}
            onChange={handleChange}
            style={{ ...s.input, ...(errors.checkOut ? s.inputErr : {}) }}
            required
          />
          {errors.checkOut && <span style={s.errMsg}>{errors.checkOut}</span>}
        </div>
      </div>
      {nights > 0 && pricePerNight && (
        <div style={s.summary}>
          <div style={s.summaryRow}>
            <span style={s.summaryLabel}>Duración</span>
            <span style={s.summaryVal}>{nights} {nights === 1 ? "noche" : "noches"}</span>
          </div>
          <div style={s.summaryRow}>
            <span style={s.summaryLabel}>${pricePerNight} × {nights} noches</span>
            <span style={s.summaryVal}>${total}</span>
          </div>
          <div style={s.summaryDivider} />
          <div style={s.summaryRow}>
            <span style={{ ...s.summaryLabel, fontWeight: 700, color: "#1a1a1a" }}>Total</span>
            <span style={s.totalAmt}>${total}</span>
          </div>
        </div>
      )}

      <button type="submit" style={s.btnSubmit} disabled={loading}>
        {loading ? (
          <>
            <span className="spinner-border spinner-border-sm me-2" />
            Reservando...
          </>
        ) : (
          <>
            <span className="material-icons" style={{ fontSize: "1.1rem" }}>calendar_month</span>
            Confirmar reserva
          </>
        )}
      </button>

      <p style={s.disclaimer}>
        <span className="material-icons" style={{ fontSize: "0.9rem", verticalAlign: "middle", marginRight: "3px" }}>shield</span>
        Cancelación gratuita hasta 48hs antes
      </p>
    </form>
  );
}

const s = {
  label: {
    display: "flex", alignItems: "center", gap: "0.3rem",
    fontSize: "0.72rem", fontWeight: 700, color: "#888",
    textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.4rem",
  },
  labelIcon: { fontSize: "0.95rem", color: "#B4280D" },
  input: {
    width: "100%", border: "1.5px solid #e0d9d4", borderRadius: "10px",
    padding: "0.6rem 0.75rem", fontSize: "0.9rem", color: "#1a1a1a",
    background: "#faf9f8", outline: "none", boxSizing: "border-box",
  },
  inputErr: { borderColor: "#B4280D", background: "#fff5f5" },
  errMsg: { color: "#B4280D", fontSize: "0.72rem", marginTop: "0.3rem", display: "block" },
  datesGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1rem" },
  userBadge: {
    display: "flex", alignItems: "center", gap: "0.75rem",
    background: "#faf9f8", border: "1.5px solid #e0d9d4",
    borderRadius: "12px", padding: "0.75rem", marginBottom: "1.25rem",
  },
  avatar: {
    width: "36px", height: "36px", borderRadius: "50%",
    background: "#B4280D", color: "#fff",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontWeight: 700, fontSize: "1rem", flexShrink: 0,
  },
  userName: { margin: 0, fontWeight: 600, fontSize: "0.88rem", color: "#1a1a1a" },
  userEmail: { margin: 0, fontSize: "0.73rem", color: "#999" },
  summary: {
    background: "#faf9f8", border: "1.5px solid #e0d9d4",
    borderRadius: "12px", padding: "1rem", marginBottom: "1.25rem",
  },
  summaryRow: { display: "flex", justifyContent: "space-between", marginBottom: "0.45rem" },
  summaryLabel: { fontSize: "0.85rem", color: "#777" },
  summaryVal: { fontSize: "0.85rem", color: "#1a1a1a" },
  summaryDivider: { borderTop: "1px solid #e8e0db", margin: "0.5rem 0" },
  totalAmt: { fontSize: "1.05rem", fontWeight: 700, color: "#B4280D" },
  btnSubmit: {
    width: "100%", background: "#B4280D", color: "#fff", border: "none",
    borderRadius: "12px", padding: "0.85rem", fontWeight: 700,
    fontSize: "1rem", cursor: "pointer", display: "flex",
    alignItems: "center", justifyContent: "center", gap: "0.5rem",
    marginBottom: "0.75rem",
  },
  btnPrimary: {
    width: "100%", background: "#B4280D", color: "#fff", border: "none",
    borderRadius: "12px", padding: "0.8rem", fontWeight: 700,
    fontSize: "0.95rem", cursor: "pointer", marginBottom: "0.6rem",
  },
  btnGhost: {
    width: "100%", background: "transparent", color: "#B4280D",
    border: "1.5px solid #B4280D", borderRadius: "12px", padding: "0.75rem",
    fontWeight: 600, fontSize: "0.9rem", cursor: "pointer",
  },
  apiError: {
    background: "#fff5f5", border: "1px solid #fca5a5", color: "#B4280D",
    borderRadius: "10px", padding: "0.65rem 0.9rem",
    fontSize: "0.85rem", marginBottom: "1rem",
  },
  lockedBox: { textAlign: "center", padding: "1.5rem 0.5rem" },
  lockCircle: {
    width: "52px", height: "52px", borderRadius: "50%", background: "#fff0ee",
    display: "flex", alignItems: "center", justifyContent: "center",
    margin: "0 auto 1rem",
  },
  lockTitle: { fontWeight: 700, fontSize: "1rem", color: "#1a1a1a", marginBottom: "0.25rem" },
  lockSub: { fontSize: "0.85rem", color: "#888", marginBottom: "1.25rem" },
  successBox: { textAlign: "center", padding: "1.5rem 0.5rem" },
  successCircle: {
    width: "56px", height: "56px", borderRadius: "50%", background: "#2e7d32",
    display: "flex", alignItems: "center", justifyContent: "center",
    margin: "0 auto 1rem",
  },
  successTitle: { fontWeight: 700, fontSize: "1.1rem", color: "#1a1a1a", marginBottom: "0.4rem" },
  successSub: { fontSize: "0.9rem", color: "#555" },
  disclaimer: {
    textAlign: "center", fontSize: "0.73rem", color: "#aaa", margin: 0,
    display: "flex", alignItems: "center", justifyContent: "center", gap: "0.2rem",
  },
};