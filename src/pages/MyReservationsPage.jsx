import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyReservations, cancelReservation } from "../services/reservation.service";

const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const getDaysUntil = (dateString) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateString);
  target.setHours(0, 0, 0, 0);
  return Math.ceil((target - today) / (1000 * 60 * 60 * 24));
};

const getStatus = (r) => {
  if (r.status === "cancelled") return "cancelled";
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const ci = new Date(r.checkIn);
  const co = new Date(r.checkOut);
  ci.setHours(0, 0, 0, 0);
  co.setHours(0, 0, 0, 0);
  if (today < ci) return "future";
  if (today >= ci && today <= co) return "active";
  return "completed";
};

const STATUS_META = {
  active:    { label: "En curso",    color: "#2e7d32", bg: "#e8f5e9" },
  future:    { label: "Próxima",     color: "#1565c0", bg: "#e3f2fd" },
  completed: { label: "Completada",  color: "#555",    bg: "#f5f5f5" },
  cancelled: { label: "Cancelada",   color: "#B4280D", bg: "#fff0ee" },
};

export default function MyReservationsPage() {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancelling, setCancelling] = useState(null);
  const [filter, setFilter] = useState("all");

  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    if (!user) { navigate("/login"); return; }

    setLoading(true);
    getMyReservations()
      .then((res) => setReservations(res.data || []))
      .catch((err) => setError(err?.response?.data?.message || "Error al cargar reservas"))
      .finally(() => setLoading(false));
  }, []);

  const handleCancel = async (id) => {
    if (!window.confirm("¿Cancelar esta reserva?")) return;
    try {
      setCancelling(id);
      await cancelReservation(id);
      setReservations((prev) =>
        prev.map((r) => (r._id === id ? { ...r, status: "cancelled" } : r))
      );
    } catch (err) {
      alert(err?.response?.data?.message || "No se pudo cancelar");
    } finally {
      setCancelling(null);
    }
  };

  const filtered = reservations.filter((r) =>
    filter === "all" ? true : getStatus(r) === filter
  );

  const counts = {
    all: reservations.length,
    active: reservations.filter((r) => getStatus(r) === "active").length,
    future: reservations.filter((r) => getStatus(r) === "future").length,
    completed: reservations.filter((r) => getStatus(r) === "completed").length,
    cancelled: reservations.filter((r) => getStatus(r) === "cancelled").length,
  };

  /* ── Loading ── */
  if (loading) return (
    <div style={s.center}>
      <div className="spinner-border" style={{ color: "#B4280D" }} />
      <p style={{ color: "#888", marginTop: "1rem" }}>Cargando tus reservas...</p>
    </div>
  );

  /* ── Error ── */
  if (error) return (
    <div style={s.center}>
      <span className="material-icons" style={{ fontSize: "3rem", color: "#B4280D" }}>error_outline</span>
      <p style={{ color: "#555", margin: "0.75rem 0" }}>{error}</p>
      <button style={s.btnRed} onClick={() => window.location.reload()}>Reintentar</button>
    </div>
  );

  return (
    <div style={s.page}>
      <div style={s.container}>

        {/* Header */}
        <div style={s.header}>
          <div>
            <h1 style={s.title}>Mis Reservas</h1>
            <p style={s.subtitle}>Hola, <strong>{user?.fullName}</strong> — gestioná tus estadías</p>
          </div>
          <button style={s.btnExplore} onClick={() => navigate("/habitaciones")}>
            <span className="material-icons" style={{ fontSize: "1rem" }}>search</span>
            Explorar habitaciones
          </button>
        </div>

        {/* Stats */}
        <div style={s.statsRow}>
          {[
            { key: "all",       label: "Todas",      icon: "list" },
            { key: "active",    label: "En curso",   icon: "hotel" },
            { key: "future",    label: "Próximas",   icon: "calendar_month" },
            { key: "completed", label: "Completadas",icon: "check_circle" },
            { key: "cancelled", label: "Canceladas", icon: "cancel" },
          ].map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              style={{
                ...s.statBtn,
                ...(filter === key ? s.statBtnActive : {}),
              }}
            >
              <span className="material-icons" style={{ fontSize: "1.1rem", color: filter === key ? "#B4280D" : "#aaa" }}>
                {icon}
              </span>
              <span style={s.statLabel}>{label}</span>
              <span style={{ ...s.statCount, ...(filter === key ? s.statCountActive : {}) }}>
                {counts[key]}
              </span>
            </button>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div style={s.emptyBox}>
            <span className="material-icons" style={{ fontSize: "3.5rem", color: "#ddd" }}>hotel</span>
            <p style={s.emptyTitle}>
              {filter === "all" ? "Todavía no tenés reservas" : "Sin reservas en esta categoría"}
            </p>
            <p style={s.emptySub}>
              {filter === "all" && "Explorá nuestras habitaciones y encontrá tu próximo destino."}
            </p>
            {filter === "all" && (
              <button style={s.btnRed} onClick={() => navigate("/habitaciones")}>
                Ver habitaciones
              </button>
            )}
          </div>
        )}

        {/* Cards */}
        <div style={s.cardsList}>
          {filtered.map((r) => {
            const st = getStatus(r);
            const meta = STATUS_META[st];
            const daysUntil = st === "future" ? getDaysUntil(r.checkIn) : null;
            const isCancelling = cancelling === r._id;

            return (
              <div key={r._id} style={{ ...s.card, ...(st === "cancelled" ? s.cardDim : {}) }}>

                {/* Imagen */}
                <div style={s.cardImgWrap}>
                  {r.room?.images?.[0] ? (
                    <img src={r.room.images[0]} alt={r.room.name} style={s.cardImg} />
                  ) : (
                    <div style={s.cardImgFallback}>
                      <span className="material-icons" style={{ fontSize: "2.5rem", color: "#ddd" }}>hotel</span>
                    </div>
                  )}
                </div>

                {/* Contenido */}
                <div style={s.cardBody}>
                  <div style={s.cardTopRow}>
                    <div>
                      {/* Badge estado */}
                      <span style={{ ...s.badge, background: meta.bg, color: meta.color }}>
                        {meta.label}
                      </span>
                      {daysUntil !== null && (
                        <span style={{ ...s.badge, background: "#fff3e0", color: "#e65100", marginLeft: "0.4rem" }}>
                          en {daysUntil} {daysUntil === 1 ? "día" : "días"}
                        </span>
                      )}
                      <h3 style={s.roomName}>{r.room?.name || "Habitación"}</h3>
                    </div>
                    <div style={s.priceCol}>
                      <p style={s.priceLabel}>Total</p>
                      <p style={s.priceAmt}>${r.totalPrice?.toLocaleString("es-AR")}</p>
                    </div>
                  </div>

                  <div style={s.datesRow}>
                    <div style={s.dateItem}>
                      <span className="material-icons" style={s.dateIcon}>flight_land</span>
                      <div>
                        <p style={s.dateLabel}>Check-in</p>
                        <p style={s.dateVal}>{formatDate(r.checkIn)}</p>
                      </div>
                    </div>
                    <div style={s.dateSep} />
                    <div style={s.dateItem}>
                      <span className="material-icons" style={s.dateIcon}>flight_takeoff</span>
                      <div>
                        <p style={s.dateLabel}>Check-out</p>
                        <p style={s.dateVal}>{formatDate(r.checkOut)}</p>
                      </div>
                    </div>
                    <div style={s.nightsPill}>
                      <span className="material-icons" style={{ fontSize: "0.9rem" }}>bedtime</span>
                      {r.nights} {r.nights === 1 ? "noche" : "noches"}
                    </div>
                  </div>

                  {/* Acciones */}
                  {st === "future" && (
                    <div style={s.actions}>
                      <button
                        style={s.btnCancel}
                        onClick={() => handleCancel(r._id)}
                        disabled={isCancelling}
                      >
                        {isCancelling ? (
                          <><span className="spinner-border spinner-border-sm me-1" /> Cancelando...</>
                        ) : (
                          <><span className="material-icons" style={{ fontSize: "1rem" }}>cancel</span> Cancelar reserva</>
                        )}
                      </button>
                    </div>
                  )}

                  {st === "active" && (
                    <div style={{ ...s.actions }}>
                      <div style={s.activePill}>
                        <span className="material-icons" style={{ fontSize: "1rem" }}>celebration</span>
                        ¡Disfrutá tu estadía! Quedan {getDaysUntil(r.checkOut)} días
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}

const s = {
  page: { background: "#f2f0ed", minHeight: "100vh", paddingBottom: "4rem" },
  container: { maxWidth: "900px", margin: "0 auto", padding: "2.5rem 1.5rem" },
  center: {
    minHeight: "60vh", display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center", gap: "0.5rem",
  },

  header: {
    display: "flex", justifyContent: "space-between", alignItems: "flex-start",
    marginBottom: "2rem", flexWrap: "wrap", gap: "1rem",
  },
  title: { fontWeight: 800, fontSize: "2rem", color: "#1a1a1a", margin: 0 },
  subtitle: { color: "#888", marginTop: "0.3rem", marginBottom: 0, fontSize: "0.95rem" },

  btnExplore: {
    display: "flex", alignItems: "center", gap: "0.4rem",
    background: "#1a1a1a", color: "#fff", border: "none",
    borderRadius: "10px", padding: "0.65rem 1.2rem",
    fontWeight: 600, fontSize: "0.88rem", cursor: "pointer",
  },
  btnRed: {
    background: "#B4280D", color: "#fff", border: "none",
    borderRadius: "10px", padding: "0.7rem 1.5rem",
    fontWeight: 600, cursor: "pointer", fontSize: "0.9rem",
  },

  /* Stats/filtros */
  statsRow: {
    display: "flex", gap: "0.6rem", marginBottom: "1.75rem",
    overflowX: "auto", paddingBottom: "0.25rem",
  },
  statBtn: {
    display: "flex", alignItems: "center", gap: "0.4rem",
    background: "#fff", border: "1.5px solid #e0d9d4",
    borderRadius: "10px", padding: "0.55rem 1rem",
    cursor: "pointer", flexShrink: 0, transition: "border-color 0.15s",
  },
  statBtnActive: { borderColor: "#B4280D" },
  statLabel: { fontSize: "0.82rem", fontWeight: 600, color: "#444" },
  statCount: {
    fontSize: "0.75rem", fontWeight: 700, background: "#f0ebe7",
    color: "#888", borderRadius: "20px", padding: "0.1rem 0.5rem",
  },
  statCountActive: { background: "#fff0ee", color: "#B4280D" },

  /* Empty */
  emptyBox: {
    background: "#fff", borderRadius: "16px", padding: "3.5rem 2rem",
    textAlign: "center", boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
  },
  emptyTitle: { fontWeight: 700, fontSize: "1.1rem", color: "#1a1a1a", margin: "1rem 0 0.4rem" },
  emptySub: { color: "#aaa", fontSize: "0.9rem", marginBottom: "1.25rem" },

  /* Cards */
  cardsList: { display: "flex", flexDirection: "column", gap: "1rem" },
  card: {
    background: "#fff", borderRadius: "16px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
    display: "flex", overflow: "hidden",
  },
  cardDim: { opacity: 0.65 },
  cardImgWrap: { width: "160px", flexShrink: 0 },
  cardImg: { width: "100%", height: "100%", objectFit: "cover", display: "block" },
  cardImgFallback: {
    width: "100%", height: "100%", background: "#f5f0ed",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  cardBody: { flex: 1, padding: "1.25rem 1.5rem" },

  cardTopRow: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" },
  badge: {
    display: "inline-block", padding: "0.25rem 0.7rem",
    borderRadius: "20px", fontSize: "0.72rem", fontWeight: 700,
    textTransform: "uppercase", letterSpacing: "0.04em",
  },
  roomName: { fontWeight: 700, fontSize: "1.1rem", color: "#1a1a1a", margin: "0.4rem 0 0" },
  priceCol: { textAlign: "right", flexShrink: 0 },
  priceLabel: { fontSize: "0.72rem", color: "#aaa", margin: 0, textTransform: "uppercase" },
  priceAmt: { fontSize: "1.2rem", fontWeight: 800, color: "#B4280D", margin: 0 },

  datesRow: {
    display: "flex", alignItems: "center", gap: "1rem",
    background: "#faf9f8", borderRadius: "10px", padding: "0.75rem 1rem",
    flexWrap: "wrap",
  },
  dateItem: { display: "flex", alignItems: "center", gap: "0.5rem" },
  dateIcon: { fontSize: "1.1rem", color: "#B4280D" },
  dateLabel: { fontSize: "0.7rem", color: "#aaa", margin: 0, textTransform: "uppercase", fontWeight: 600 },
  dateVal: { fontSize: "0.88rem", color: "#1a1a1a", fontWeight: 600, margin: 0 },
  dateSep: { width: "1px", height: "32px", background: "#e0d9d4", flexShrink: 0 },
  nightsPill: {
    display: "flex", alignItems: "center", gap: "0.3rem",
    background: "#fff0ee", color: "#B4280D",
    padding: "0.3rem 0.75rem", borderRadius: "20px",
    fontSize: "0.78rem", fontWeight: 700, marginLeft: "auto",
  },

  actions: { marginTop: "1rem", display: "flex", gap: "0.6rem" },
  btnCancel: {
    display: "flex", alignItems: "center", gap: "0.4rem",
    background: "transparent", color: "#B4280D",
    border: "1.5px solid #B4280D", borderRadius: "10px",
    padding: "0.5rem 1rem", fontSize: "0.85rem",
    fontWeight: 600, cursor: "pointer",
  },
  activePill: {
    display: "flex", alignItems: "center", gap: "0.4rem",
    background: "#e8f5e9", color: "#2e7d32",
    padding: "0.5rem 1rem", borderRadius: "10px",
    fontSize: "0.85rem", fontWeight: 600,
  },
};