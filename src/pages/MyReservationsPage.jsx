import { useEffect, useState } from "react";
import { getReservations } from "../services/reservation.service";

export default function MyReservationsPage() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simulación del email del usuario logueado
  // TODO: Reemplazar con el email real del usuario autenticado
  const userEmail = "carlos.rodriguez@email.com";

  useEffect(() => {
    setLoading(true);
    setError(null);
    getReservations()
      .then((res) => {
        const data = res.data || [];
        // Filtrar solo las reservas del usuario actual
        const userReservations = data.filter(
          (r) => r.guest?.email?.toLowerCase() === userEmail.toLowerCase(),
        );
        setReservations(userReservations);
      })
      .catch((err) => {
        console.error("Error al cargar reservas:", err);
        setError(err.message || "Error al cargar tus reservas");
        setReservations([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const getReservationStatus = (reservation) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const checkIn = new Date(reservation.checkIn);
    const checkOut = new Date(reservation.checkOut);
    checkIn.setHours(0, 0, 0, 0);
    checkOut.setHours(0, 0, 0, 0);

    if (reservation.status === "cancelled") return "cancelled";
    if (today < checkIn) return "future";
    if (today >= checkIn && today <= checkOut) return "in-progress";
    if (today > checkOut) return "completed";

    return "future";
  };

  const groupReservationsByStatus = () => {
    const grouped = {
      "in-progress": [],
      future: [],
      completed: [],
      cancelled: [],
    };

    reservations.forEach((r) => {
      const status = getReservationStatus(r);
      grouped[status].push(r);
    });

    return grouped;
  };

  const getStatusConfig = (status) => {
    const configs = {
      "in-progress": {
        label: "En Curso",
        variant: "success",
        icon: "bi-clock-fill",
        description: "Tu estadía actual",
      },
      future: {
        label: "Próximas",
        variant: "primary",
        icon: "bi-calendar-event",
        description: "Reservas confirmadas",
      },
      completed: {
        label: "Completadas",
        variant: "secondary",
        icon: "bi-check-circle-fill",
        description: "Estadías anteriores",
      },
      cancelled: {
        label: "Canceladas",
        variant: "danger",
        icon: "bi-x-circle-fill",
        description: "Reservas canceladas",
      },
    };
    return configs[status];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const getDaysUntil = (dateString) => {
    const today = new Date();
    const target = new Date(dateString);
    const diffTime = target - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center py-5">
          <div
            className="spinner-border text-primary"
            style={{ width: "3rem", height: "3rem" }}
            role="status"
          >
            <span className="visually-hidden">Cargando...</span>
          </div>
          <h4 className="mt-3 text-muted">Cargando tus reservas...</h4>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <h1 className="mb-4">Mis Reservas</h1>
        <div className="alert alert-danger text-center py-5">
          <h4 className="alert-heading">
            <i className="bi bi-exclamation-circle me-2"></i>
            Error al cargar tus reservas
          </h4>
          <p className="mb-3">{error}</p>
          <button
            className="btn btn-danger"
            onClick={() => window.location.reload()}
          >
            <i className="bi bi-arrow-clockwise me-2"></i>
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  const groupedReservations = groupReservationsByStatus();

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="mb-4">
        <h1 className="display-5 fw-bold mb-2">
          <i className="bi bi-calendar-check me-2 text-primary"></i>
          Mis Reservas
        </h1>
        <p className="text-muted">
          Gestiona tus reservas y revisa tu historial
        </p>
      </div>

      {reservations.length === 0 ? (
        <div className="card border-0 shadow-sm">
          <div className="card-body text-center py-5">
            <i className="bi bi-calendar-x display-1 text-muted mb-3"></i>
            <h4 className="mb-2">No tienes reservas</h4>
            <p className="text-muted mb-4">
              Aún no has realizado ninguna reserva. ¡Explora nuestros hoteles y
              encuentra tu próximo destino!
            </p>
            <a href="/hoteles" className="btn btn-primary">
              <i className="bi bi-search me-2"></i>
              Explorar Hoteles
            </a>
          </div>
        </div>
      ) : (
        <>
          {/* En Curso */}
          {groupedReservations["in-progress"].length > 0 && (
            <div className="mb-5">
              <div className="d-flex align-items-center mb-3">
                <i className="bi bi-clock-fill fs-4 text-success me-2"></i>
                <h3 className="mb-0">En Curso</h3>
                <span className="badge bg-success ms-2">
                  {groupedReservations["in-progress"].length}
                </span>
              </div>
              <div className="row g-4">
                {groupedReservations["in-progress"].map((r) => (
                  <div key={r._id} className="col-12">
                    <div className="card border-0 shadow-sm border-start border-success border-4">
                      <div className="card-body">
                        <div className="row align-items-center">
                          <div className="col-md-8">
                            <div className="d-flex align-items-center mb-2">
                              <span className="badge bg-success me-2">
                                <i className="bi bi-clock-fill me-1"></i>
                                Estadía Actual
                              </span>
                              <span className="badge bg-light text-dark">
                                {r.nights} {r.nights === 1 ? "noche" : "noches"}
                              </span>
                            </div>
                            <h4 className="mb-2 fw-bold">{r.room?.name}</h4>
                            <p className="text-muted mb-2">
                              <i className="bi bi-calendar-range me-2"></i>
                              <strong>Check-in:</strong> {formatDate(r.checkIn)}
                              <span className="mx-2">→</span>
                              <strong>Check-out:</strong>{" "}
                              {formatDate(r.checkOut)}
                            </p>
                            <p className="text-muted mb-0">
                              <i className="bi bi-info-circle me-2"></i>
                              ¡Disfruta tu estadía! Quedan{" "}
                              {getDaysUntil(r.checkOut)} días
                            </p>
                          </div>
                          <div className="col-md-4 text-md-end mt-3 mt-md-0">
                            <p className="text-muted small mb-1">Total</p>
                            <h3 className="text-success fw-bold mb-3">
                              ${r.totalPrice?.toLocaleString("es-AR")}
                            </h3>
                            <button className="btn btn-outline-success">
                              <i className="bi bi-eye me-1"></i>
                              Ver Detalles
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Futuras */}
          {groupedReservations.future.length > 0 && (
            <div className="mb-5">
              <div className="d-flex align-items-center mb-3">
                <i className="bi bi-calendar-event fs-4 text-primary me-2"></i>
                <h3 className="mb-0">Próximas Reservas</h3>
                <span className="badge bg-primary ms-2">
                  {groupedReservations.future.length}
                </span>
              </div>
              <div className="row g-4">
                {groupedReservations.future.map((r) => {
                  const daysUntil = getDaysUntil(r.checkIn);
                  return (
                    <div key={r._id} className="col-12 col-lg-6">
                      <div className="card border-0 shadow-sm h-100">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-start mb-3">
                            <div>
                              <span className="badge bg-primary mb-2">
                                {daysUntil > 0
                                  ? `En ${daysUntil} días`
                                  : "Muy pronto"}
                              </span>
                              <h5 className="mb-1 fw-bold">{r.room?.name}</h5>
                            </div>
                          </div>
                          <p className="text-muted small mb-2">
                            <i className="bi bi-calendar-check me-1"></i>
                            {formatDate(r.checkIn)} - {formatDate(r.checkOut)}
                          </p>
                          <p className="text-muted small mb-3">
                            <i className="bi bi-moon-stars me-1"></i>
                            {r.nights} {r.nights === 1 ? "noche" : "noches"}
                          </p>
                          <div className="d-flex justify-content-between align-items-center pt-3 border-top">
                            <div>
                              <p className="text-muted small mb-0">Total</p>
                              <h5 className="mb-0 fw-bold">
                                ${r.totalPrice?.toLocaleString("es-AR")}
                              </h5>
                            </div>
                            <div className="d-flex gap-2">
                              <button className="btn btn-outline-primary btn-sm">
                                <i className="bi bi-eye"></i>
                              </button>
                              <button className="btn btn-outline-danger btn-sm">
                                <i className="bi bi-x-lg"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Completadas */}
          {groupedReservations.completed.length > 0 && (
            <div className="mb-5">
              <div className="d-flex align-items-center mb-3">
                <i className="bi bi-check-circle-fill fs-4 text-secondary me-2"></i>
                <h3 className="mb-0">Estadías Completadas</h3>
                <span className="badge bg-secondary ms-2">
                  {groupedReservations.completed.length}
                </span>
              </div>
              <div className="row g-3">
                {groupedReservations.completed.map((r) => (
                  <div key={r._id} className="col-12 col-md-6 col-lg-4">
                    <div className="card border-0 shadow-sm h-100">
                      <div className="card-body">
                        <span className="badge bg-secondary mb-2">
                          Completada
                        </span>
                        <h6 className="mb-2 fw-bold">{r.room?.name}</h6>
                        <p className="text-muted small mb-2">
                          <i className="bi bi-calendar-x me-1"></i>
                          {formatDate(r.checkIn)}
                        </p>
                        <p className="text-muted small mb-0">
                          {r.nights} {r.nights === 1 ? "noche" : "noches"} • $
                          {r.totalPrice?.toLocaleString("es-AR")}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Canceladas */}
          {groupedReservations.cancelled.length > 0 && (
            <div className="mb-5">
              <div className="d-flex align-items-center mb-3">
                <i className="bi bi-x-circle-fill fs-4 text-danger me-2"></i>
                <h3 className="mb-0">Reservas Canceladas</h3>
                <span className="badge bg-danger ms-2">
                  {groupedReservations.cancelled.length}
                </span>
              </div>
              <div className="row g-3">
                {groupedReservations.cancelled.map((r) => (
                  <div key={r._id} className="col-12 col-md-6 col-lg-4">
                    <div className="card border-0 shadow-sm h-100 opacity-75">
                      <div className="card-body">
                        <span className="badge bg-danger mb-2">Cancelada</span>
                        <h6 className="mb-2 fw-bold text-muted">
                          {r.room?.name}
                        </h6>
                        <p className="text-muted small mb-0">
                          <i className="bi bi-calendar-x me-1"></i>
                          {formatDate(r.checkIn)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
