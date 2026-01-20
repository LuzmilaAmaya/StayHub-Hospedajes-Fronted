import { useEffect, useState } from "react";
import { getReservations } from "../services/reservation.service";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Badge,
  Spinner,
  Alert,
  InputGroup,
} from "react-bootstrap";

export default function ReservationsPage() {
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
      filtered = filtered.filter((r) => r.status === statusFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (r) =>
          r.guest?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          r.room?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          r.room?.number?.includes(searchTerm)
      );
    }

    setFilteredReservations(filtered);
  }, [statusFilter, searchTerm, reservations]);

  const getStatusConfig = (status) => {
    const configs = {
      confirmed: {
        label: "Confirmada",
        variant: "primary",
      },
      pending: {
        label: "Pendiente",
        variant: "warning",
      },
      "checked-in": {
        label: "En Estadía",
        variant: "success",
      },
      cancelled: {
        label: "Cancelada",
        variant: "danger",
      },
    };
    return configs[status] || configs.pending;
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
    confirmed: reservations.filter((r) => r.status === "confirmed").length,
    pending: reservations.filter((r) => r.status === "pending").length,
    checkedIn: reservations.filter((r) => r.status === "checked-in").length,
  };

  if (loading) {
    return (
      <Container className="py-5">
        <div className="text-center py-5">
          <Spinner
            animation="border"
            variant="primary"
            style={{ width: "3rem", height: "3rem" }}
          />
          <h4 className="mt-3 text-muted">Cargando reservas...</h4>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <h1 className="mb-4">Reservas</h1>
        <Alert variant="danger" className="text-center py-5">
          <Alert.Heading>
            <i className="bi bi-exclamation-circle me-2"></i>
            Error al cargar reservas
          </Alert.Heading>
          <p className="mb-3">{error}</p>
          <Button variant="danger" onClick={() => window.location.reload()}>
            <i className="bi bi-arrow-clockwise me-2"></i>
            Reintentar
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      {/* Header */}
      <div className="mb-4">
        <h1 className="display-5 fw-bold mb-2">Reservas</h1>
        <p className="text-muted">
          Gestiona y monitorea todas las reservas del hotel
        </p>
      </div>

      {/* Stats Cards */}
      <Row className="g-3 mb-4">
        <Col xs={12} sm={6} lg={3}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-muted small mb-1">Total</p>
                  <h3 className="mb-0 fw-bold">{stats.total}</h3>
                </div>
                <div className="bg-light rounded-circle p-3">
                  <i className="bi bi-calendar3 fs-4 text-secondary"></i>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} lg={3}>
          <Card className="border-0 shadow-sm h-100 border-start border-primary border-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-primary small mb-1 fw-semibold">
                    Confirmadas
                  </p>
                  <h3 className="mb-0 fw-bold text-primary">
                    {stats.confirmed}
                  </h3>
                </div>
                <div className="bg-primary bg-opacity-10 rounded-circle p-3">
                  <i className="bi bi-clock-history fs-4 text-primary"></i>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} lg={3}>
          <Card className="border-0 shadow-sm h-100 border-start border-warning border-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-warning small mb-1 fw-semibold">
                    Pendientes
                  </p>
                  <h3 className="mb-0 fw-bold text-warning">{stats.pending}</h3>
                </div>
                <div className="bg-warning bg-opacity-10 rounded-circle p-3">
                  <i className="bi bi-hourglass-split fs-4 text-warning"></i>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} lg={3}>
          <Card className="border-0 shadow-sm h-100 border-start border-success border-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-success small mb-1 fw-semibold">
                    En Estadía
                  </p>
                  <h3 className="mb-0 fw-bold text-success">
                    {stats.checkedIn}
                  </h3>
                </div>
                <div className="bg-success bg-opacity-10 rounded-circle p-3">
                  <i className="bi bi-door-open fs-4 text-success"></i>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Filters */}
      <Card className="border-0 shadow-sm mb-4">
        <Card.Body>
          <Row className="g-3">
            <Col xs={12} md={6}>
              <InputGroup>
                <InputGroup.Text>
                  <i className="bi bi-search"></i>
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Buscar por cliente, habitación o número..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>

            <Col xs={12} md={6}>
              <div className="d-flex gap-2 flex-wrap">
                {["all", "confirmed", "pending", "checked-in", "cancelled"].map(
                  (status) => (
                    <Button
                      key={status}
                      variant={
                        statusFilter === status
                          ? "primary"
                          : "outline-secondary"
                      }
                      size="sm"
                      onClick={() => setStatusFilter(status)}
                      className="flex-grow-1 flex-md-grow-0"
                    >
                      {status === "all"
                        ? "Todas"
                        : getStatusConfig(status).label}
                    </Button>
                  )
                )}
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Reservations List */}
      {filteredReservations.length === 0 ? (
        <Card className="border-0 shadow-sm">
          <Card.Body className="text-center py-5">
            <i className="bi bi-calendar-x display-1 text-muted mb-3"></i>
            <h4 className="mb-2">
              {reservations.length === 0
                ? "No hay reservas registradas"
                : "No se encontraron resultados"}
            </h4>
            <p className="text-muted">
              {reservations.length === 0
                ? "Aún no hay reservas en el sistema. Las nuevas reservas aparecerán aquí."
                : "No se encontraron reservas con los filtros seleccionados. Intenta con otros criterios de búsqueda."}
            </p>
          </Card.Body>
        </Card>
      ) : (
        <Row className="g-4">
          {filteredReservations.map((r) => {
            const statusConfig = getStatusConfig(r.status);
            return (
              <Col key={r._id} xs={12} lg={6}>
                <Card className="border-0 shadow-sm h-100 hover-shadow">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div>
                        <h5 className="mb-1 fw-bold">{r.room?.name}</h5>
                        <p className="text-muted small mb-0">
                          <i className="bi bi-hash"></i> Habitación{" "}
                          {r.room?.number}
                        </p>
                      </div>
                      <Badge bg={statusConfig.variant} className="px-3 py-2">
                        {statusConfig.label}
                      </Badge>
                    </div>

                    <div className="mb-3">
                      <div className="d-flex align-items-center mb-2">
                        <i className="bi bi-person-circle text-muted me-2"></i>
                        <div>
                          <p className="mb-0 fw-semibold">{r.guest?.name}</p>
                          <p className="mb-0 small text-muted">
                            {r.guest?.email}
                          </p>
                        </div>
                      </div>

                      <div className="d-flex align-items-center text-muted">
                        <i className="bi bi-calendar-range me-2"></i>
                        <small className="d-flex align-items-center gap-2">
                          <span className="fw-semibold">
                            {formatDate(r.checkIn)}
                          </span>
                          <i className="bi bi-arrow-right"></i>
                          <span className="fw-semibold">
                            {formatDate(r.checkOut)}
                          </span>
                          <span>
                            ({r.nights} {r.nights === 1 ? "noche" : "noches"})
                          </span>
                        </small>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center pt-3 border-top">
                      <div>
                        <p className="text-muted small mb-0">Total</p>
                        <h4 className="mb-0 fw-bold">
                          ${r.totalPrice?.toLocaleString("es-AR")}
                        </h4>
                      </div>
                      <Button variant="outline-secondary" size="sm">
                        <i className="bi bi-eye me-1"></i>
                        Ver detalles
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}

      <style>{`
        .hover-shadow {
          transition: box-shadow 0.3s ease;
        }
        .hover-shadow:hover {
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
        }
      `}</style>
    </Container>
  );
}
