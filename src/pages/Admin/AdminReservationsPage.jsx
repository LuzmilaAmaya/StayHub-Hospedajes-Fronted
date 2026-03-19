import { useEffect, useState } from "react";
import { getReservations } from "../../services/reservation.service";

export default function AdminReservationsPage() {
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getReservations()
      .then((res) => {
        const data = res.data || [];
        setReservations(data);
        setFilteredReservations(data);
      })
      .catch((err) => {
        console.error("Error al cargar reservas:", err);
        setError(err.message || "Error al cargar las reservas");
        setReservations([]);
        setFilteredReservations([]);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let filtered = reservations;

    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (r) => getReservationStatus(r) === statusFilter,
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (r) =>
          r.guest?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          r.guest?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          r.room?.name?.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    setFilteredReservations(filtered);
  }, [statusFilter, searchTerm, reservations]);

  const getReservationStatus = (reservation) => {
  if (reservation.status === "pending") return "pending";
  if (reservation.status === "cancelled") return "cancelled";

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const checkIn = new Date(reservation.checkIn);
  const checkOut = new Date(reservation.checkOut);
  checkIn.setHours(0, 0, 0, 0);
  checkOut.setHours(0, 0, 0, 0);

  if (today < checkIn) return "future";
  if (today >= checkIn && today <= checkOut) return "in-progress";
  if (today > checkOut) return "completed";

  return "future";
};

  const getStatusConfig = (status) => {
    const configs = {
      "in-progress": {
        label: "En Curso",
        variant: "success",
        icon: "bi-clock-fill",
      },
      future: {
        label: "Futura",
        variant: "primary",
        icon: "bi-calendar-event",
      },
      completed: {
        label: "Completada",
        variant: "secondary",
        icon: "bi-check-circle-fill",
      },
      cancelled: {
        label: "Cancelada",
        variant: "danger",
        icon: "bi-x-circle-fill",
      },
      pending: {
  label: "Pendiente de pago",
  variant: "warning",
  icon: "bi-hourglass-split",
},
    };
    return configs[status] || configs.future;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const stats = {
    total: reservations.length,
    inProgress: reservations.filter(
      (r) => getReservationStatus(r) === "in-progress",
    ).length,
    future: reservations.filter((r) => getReservationStatus(r) === "future")
      .length,
    completed: reservations.filter(
      (r) => getReservationStatus(r) === "completed",
    ).length,
    cancelled: reservations.filter(
      (r) => getReservationStatus(r) === "cancelled",
    ).length,
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
          <h4 className="mt-3 text-muted">Cargando reservas...</h4>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <h1 className="mb-4">Panel de Administración - Reservas</h1>
        <div className="alert alert-danger text-center py-5">
          <h4 className="alert-heading">
            <i className="bi bi-exclamation-circle me-2"></i>
            Error al cargar reservas
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

  return (
    <div className="container py-4">
      <div className="mb-4">
        <h1 className="display-5 fw-bold mb-2">
          <i className="bi bi-shield-check me-2 text-primary"></i>
          Panel de Administración
        </h1>
        <p className="text-muted">Gestiona todas las reservas del sistema</p>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-6 col-md-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body text-center">
              <i className="bi bi-calendar3 fs-1 text-secondary mb-2"></i>
              <h3 className="mb-0 fw-bold">{stats.total}</h3>
              <small className="text-muted">Total</small>
            </div>
          </div>
        </div>

        <div className="col-6 col-md-3">
          <div className="card border-0 shadow-sm h-100 border-start border-success border-4">
            <div className="card-body text-center">
              <i className="bi bi-clock-fill fs-1 text-success mb-2"></i>
              <h3 className="mb-0 fw-bold text-success">{stats.inProgress}</h3>
              <small className="text-muted">En Curso</small>
            </div>
          </div>
        </div>

        <div className="col-6 col-md-3">
          <div className="card border-0 shadow-sm h-100 border-start border-primary border-4">
            <div className="card-body text-center">
              <i className="bi bi-calendar-event fs-1 text-primary mb-2"></i>
              <h3 className="mb-0 fw-bold text-primary">{stats.future}</h3>
              <small className="text-muted">Futuras</small>
            </div>
          </div>
        </div>

        <div className="col-6 col-md-3">
          <div className="card border-0 shadow-sm h-100 border-start border-secondary border-4">
            <div className="card-body text-center">
              <i className="bi bi-check-circle-fill fs-1 text-secondary mb-2"></i>
              <h3 className="mb-0 fw-bold text-secondary">{stats.completed}</h3>
              <small className="text-muted">Completadas</small>
            </div>
          </div>
        </div>
      </div>
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-12 col-md-6">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar por cliente, email o habitación..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="d-flex gap-2 flex-wrap">
                {["all", "pending", "in-progress", "future", "completed", "cancelled"].map(
                  (status) => (
                    <button
                      key={status}
                      className={`btn btn-sm ${
                        statusFilter === status
                          ? "btn-primary"
                          : "btn-outline-secondary"
                      } flex-grow-1 flex-md-grow-0`}
                      onClick={() => setStatusFilter(status)}
                    >
                      {status === "all"
                        ? "Todas"
                        : getStatusConfig(status).label}
                    </button>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {filteredReservations.length === 0 ? (
        <div className="card border-0 shadow-sm">
          <div className="card-body text-center py-5">
            <i className="bi bi-calendar-x display-1 text-muted mb-3"></i>
            <h4 className="mb-2">
              {reservations.length === 0
                ? "No hay reservas registradas"
                : "No se encontraron resultados"}
            </h4>
            <p className="text-muted">
              {reservations.length === 0
                ? "Las nuevas reservas aparecerán aquí."
                : "Intenta con otros filtros de búsqueda."}
            </p>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {filteredReservations.map((r) => {
            const status = getReservationStatus(r);
            const statusConfig = getStatusConfig(status);
            return (
              <div key={r._id} className="col-12 col-lg-6">
                <div className="card border-0 shadow-sm h-100 hover-shadow">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div className="flex-grow-1">
                        <h5 className="mb-1 fw-bold">
                          {r.room?.name || "Habitación"}
                        </h5>
                        <p className="text-muted small mb-0">
                          <i className="bi bi-building me-1"></i>
                          Habitación del hotel
                        </p>
                      </div>
                      <span
                        className={`badge bg-${statusConfig.variant} px-3 py-2`}
                      >
                        <i className={`${statusConfig.icon} me-1`}></i>
                        {statusConfig.label}
                      </span>
                    </div>

                    <div className="mb-3">
                      <div className="d-flex align-items-start mb-2 p-2 bg-light rounded">
                        <i className="bi bi-person-circle text-muted me-2 fs-5"></i>
                        <div>
                          <p className="mb-0 fw-semibold">{r.guest?.name}</p>
                          <p className="mb-0 small text-muted">
                            {r.guest?.email}
                          </p>
                        </div>
                      </div>

                      <div className="d-flex align-items-center text-muted">
                        <i className="bi bi-calendar-range me-2"></i>
                        <small className="d-flex align-items-center gap-2 flex-wrap">
                          <span className="fw-semibold">
                            {formatDate(r.checkIn)}
                          </span>
                          <i className="bi bi-arrow-right"></i>
                          <span className="fw-semibold">
                            {formatDate(r.checkOut)}
                          </span>
                          <span className="badge bg-secondary">
                            {r.nights} {r.nights === 1 ? "noche" : "noches"}
                          </span>
                        </small>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center pt-3 border-top">
                      <div>
                        <p className="text-muted small mb-0">Total pagado</p>
                        <h4 className="mb-0 fw-bold text-success">
                          ${r.totalPrice?.toLocaleString("es-AR")}
                        </h4>
                      </div>
                      <div className="d-flex gap-2">
                        <button className="btn btn-outline-primary btn-sm">
                          <i className="bi bi-eye me-1"></i>
                          Ver
                        </button>
                        <button className="btn btn-outline-secondary btn-sm">
                          <i className="bi bi-pencil me-1"></i>
                          Editar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <style>{`
        .hover-shadow {
          transition: box-shadow 0.3s ease, transform 0.2s ease;
        }
        .hover-shadow:hover {
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
}
